"use client"
import React, { useState, useMemo } from "react"
import dynamic from "next/dynamic"
import { ProgressChartItf } from "@/types/common/DashboardCardsTypes"
import Link from "next/link"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export interface ChartPoint {
    month: string
    [key: string]: string | number
}

type ChartDataType = ChartPoint[] | Record<string, ChartPoint[]>

type Props = {
    about?: { title: string; subTitle?: string; delta?: string | number }
    chartData: ChartDataType
    icon?: React.ReactNode
    height?: number
    chartType?: "area" | "line"
    chartFillColor?: string | string[]
    lineColor?: string
    lineWidth?: number
    lineShadow?: {
        enabled?: boolean
        blur?: number
        opacity?: number
        offsetX?: number
        offsetY?: number
    }
    chartConfigoptions?: Record<
        string,
        Record<string, number | string | boolean | Record<string, number>>
    >
    showOnlyLine?: boolean
    cardBg?: string
    item?: ProgressChartItf
    disablePadding?: boolean
    iconBgClass?: string
    infoReverse?: boolean
    iconClass?: string
    cardClassName?: string
}

const ApexProgressLineWrapper: React.FC<Props> = ({
    about,
    chartData,
    icon,
    height = 150,
    chartType,
    chartFillColor,
    chartConfigoptions,
    showOnlyLine,
    cardBg,
    lineColor,
    lineWidth,
    lineShadow,
    disablePadding,
    iconBgClass,
    infoReverse,
    iconClass,
    cardClassName,
}) => {
    const isTabbed = typeof chartData === "object" && !Array.isArray(chartData)
    const [activeTab, setActiveTab] = useState(isTabbed ? Object.keys(chartData)[0] : null)

    const activeData = useMemo(() => {
        if (isTabbed) {
            return chartData[activeTab as string] || []
        }
        return chartData || []
    }, [chartData, activeTab, isTabbed])

    // if (!activeData.length) {
    //   return null
    // }

    const numericKeys = Object.keys(activeData[0]).filter(
        (key) => key !== "month" && typeof activeData[0][key] === "number",
    )

    const series = numericKeys.map((key) => ({
        name: key,
        data: activeData.map((d) => d[key] as number),
    }))

    // if (!series.length) {
    //   return null
    // }

    const showAxis = Boolean(chartConfigoptions?.xaxis?.show)

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: chartType,
            sparkline: { enabled: !showAxis },
            toolbar: { show: false },
            parentHeightOffset: 0,
            dropShadow: {
                enabled: lineShadow?.enabled ?? true,
                top: lineShadow?.offsetY ?? 0,
                left: lineShadow?.offsetX ?? 0,
                blur: lineShadow?.blur ?? 0,
                opacity: lineShadow?.opacity ?? 0.45,
            },
        },
        colors: Array.isArray(chartFillColor)
            ? chartFillColor
            : chartFillColor
              ? [chartFillColor]
              : undefined,
        stroke: {
            curve: "smooth",
            width: lineWidth ?? 2,
            colors: lineColor ? [lineColor] : undefined,
        },
        fill: {
            type: "solid",
            opacity: showOnlyLine ? 1 : 0.25,
        },
        grid: chartConfigoptions?.grid ?? {
            padding: { top: 0, bottom: -6, left: 0, right: 0 },
        },
        xaxis: {
            categories: activeData.map((d) => d.month),
            axisBorder: { show: showAxis },
            axisTicks: { show: showAxis },
            labels: {
                show: showAxis,
                style: { colors: "#A1A5B7", fontSize: "12px" },
            },
        },
        yaxis: {
            labels: {
                show: showAxis,
                style: { colors: "#A1A5B7", fontSize: "12px" },
            },
        },
        dataLabels: { enabled: false },
        tooltip: { enabled: true },
        legend: { show: false },
    }

    return (
        <div className={`card card-xl-stretch mb-xl-8 ${cardClassName}`}>
            {!isTabbed && !showOnlyLine && (
                <div className="card-body d-flex flex-column p-0">
                    <div className="d-flex flex-stack flex-grow-1 card-p">
                        <>
                            {!infoReverse ? (
                                <>
                                    <div className="d-flex flex-column me-2">
                                        <Link
                                            href="#"
                                            className="text-dark text-hover-primary fw-bolder fs-3"
                                        >
                                            {about?.title}
                                        </Link>

                                        <span className="text-muted fw-bold mt-1">
                                            {about?.subTitle}
                                        </span>
                                    </div>

                                    {iconBgClass ? (
                                        <span className="symbol symbol-50px">
                                            <span
                                                className={`symbol-label fs-5 fw-bolder ${iconBgClass}`}
                                            >
                                                {about?.delta}
                                            </span>
                                        </span>
                                    ) : (
                                        <div className="fw-bolder fs-3 text-primary">
                                            ${about?.delta}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <span className="symbol symbol-50px me-2x">
                                        <span className={`symbol-label ${iconBgClass}`}>
                                            <span className={`svg-icon svg-icon-2x ${iconClass}`}>
                                                {icon}
                                            </span>
                                        </span>
                                    </span>

                                    <div className="d-flex flex-column ms-2">
                                        <Link
                                            href="#"
                                            className="text-dark text-hover-primary fw-bolder fs-3 text-end"
                                        >
                                            {about?.title}
                                        </Link>

                                        <span className="text-muted fw-bold mt-1">
                                            {about?.subTitle}
                                        </span>
                                    </div>
                                </>
                            )}
                        </>
                    </div>
                </div>
            )}

            {isTabbed && !showOnlyLine && (
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bolder fs-3 mb-1"> {about?.title}</span>
                        <span className="text-muted fw-bold fs-7">{about?.subTitle}</span>
                    </h3>
                    <div className="card-toolbar">
                        <div className="selector-tab-wrapper">
                            <div className="tab-wrapper"></div>
                            {Object.keys(chartData).map((key, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(key)}
                                    className={`${activeTab === key ? "active-btn" : ""}`}
                                >
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`chart-wrapper ${disablePadding ? "" : "apex-bar-chart-wrapper"}`}
                style={{ backgroundColor: cardBg ? cardBg : "" }}
            >
                <Chart options={options} series={series} type={chartType} height={height} />
            </div>
        </div>
    )
}

export default ApexProgressLineWrapper
