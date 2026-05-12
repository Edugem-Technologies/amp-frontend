"use client"

import dynamic from "next/dynamic"
import { useState, useMemo } from "react"
import CardOptionsDropdown from "../common/CardOptionsDropdown"
import TaskOverviewFilterForm from "../common/TaskOverviewFilterForm"
import { CardDropdownOptionItf } from "@/types/common/DashboardCardsTypes"
import PaymentMenuDropdown from "../common/PaymentMenuDropdown"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

type SimpleDataPoint = {
    label: string
    [key: string]: number | string
}

type ChartConfig = {
    height?: number
    xaxis?: boolean
    yaxis?: boolean
    grid?: {
        show?: boolean
    }
}

type ChartDataItem = {
    label: string
    netProfit: number
    revenue: number
}

type ChartConfigData = ChartDataItem[] | Record<string, ChartDataItem[]>

interface ApexBarChartConfig {
    header: string
    description?: string
    data: ChartConfigData

    // add these optional properties
    barColor?: string
    mutedBarColor?: string
    currency?: string
    delta?: number | string
    textColorClass?: string
    backgroundColor?: string
}

type Props = {
    config: ApexBarChartConfig
    chartConfig?: ChartConfig
    optionsVariant?: "filter" | "menu"
    cardOptions?: CardDropdownOptionItf[]
    isRecentStatType?: boolean
    optionBtnType?: string
    isMarginBottom?: boolean
}

export default function ApexBarChartWrapper({
    config,
    chartConfig,
    optionsVariant,
    cardOptions,
    isRecentStatType,
    optionBtnType,
    isMarginBottom,
}: Props) {
    const { header, description, data, backgroundColor } = config

    const isTabbedData = !Array.isArray(data)

    const firstKey = isTabbedData ? Object.keys(data)[0] : null
    const [activeTab, setActiveTab] = useState<string | null>(firstKey)

    const resolvedData: SimpleDataPoint[] = useMemo(() => {
        if (Array.isArray(data)) return data
        if (activeTab && Array.isArray(data[activeTab])) return data[activeTab]
        return []
    }, [data, activeTab])

    const categories = resolvedData.map((item) => item.label)

    const metricKeys =
        resolvedData.length > 0 ? Object.keys(resolvedData[0]).filter((key) => key !== "label") : []

    const series = metricKeys.map((key) => ({
        name: key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
        data: resolvedData.map((item) => item[key] as number),
    }))

    const options = {
        chart: {
            toolbar: { show: false },
        },
        colors: [config.barColor ?? "#1F1F1F", config.mutedBarColor ?? "#E5E7EB"],

        plotOptions: {
            bar: {
                columnWidth: "32%",
                borderRadius: 6,
                borderRadiusApplication: "end" as const,
            },
        },

        xaxis: {
            categories,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                show: chartConfig?.xaxis ?? true,
                style: {
                    colors: "#A1A5B7",
                    fontSize: "12px",
                },
            },
        },

        yaxis: {
            show: chartConfig?.yaxis ?? true,
            labels: {
                style: {
                    colors: "#A1A5B7",
                    fontSize: "12px",
                },
            },
        },

        grid: {
            show: (chartConfig?.grid?.show as boolean) ?? true,
            borderColor: "#EEF0F5",
            strokeDashArray: 4,
            xaxis: { lines: { show: false } },
        },

        dataLabels: { enabled: false },
        legend: { show: false },
        tooltip: { theme: "light" },
    }

    return (
        <div
            className={`card card-xl-stretch ${!isMarginBottom ? "" : "mb-xl-8"}`}
            style={{ backgroundColor: backgroundColor ?? "" }}
        >
            {/* HEADER */}
            {isRecentStatType && (
                <>
                    <div className="card-header border-0 pt-5">
                        <>
                            <h3 className="card-title align-items-start flex-column">
                                <span
                                    className={`card-label fw-bolder fs-3 mb-1 ${
                                        config.textColorClass ? config.textColorClass : ""
                                    } `}
                                >
                                    {header}
                                </span>
                                {description && (
                                    <span className="text-muted fw-bold fs-7">{description}</span>
                                )}
                            </h3>
                        </>
                        <div className="delta">
                            <span className={`${config.textColorClass}`}>
                                {config.currency}
                                {config.delta}
                            </span>
                        </div>

                        {isTabbedData && (
                            <div className="selector-tab-wrapper  card-toolbar">
                                <div className="flex gap-2">
                                    {Object.keys(data).map((tab, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveTab(tab)}
                                            className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${
                                                activeTab === tab ? "active-btn" : ""
                                            }`}
                                        >
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {optionsVariant === "filter" && (
                            <CardOptionsDropdown width={300} btnType={optionBtnType as string}>
                                <TaskOverviewFilterForm
                                    options={cardOptions ?? []}
                                    onApply={(values) => {
                                        console.log("FILTER APPLY", values)
                                    }}
                                />
                            </CardOptionsDropdown>
                        )}
                    </div>
                    <div className="bar-chart apex-bar-chart-wrapper">
                        <Chart
                            type="bar"
                            height={chartConfig?.height ?? 330}
                            series={series}
                            options={options}
                        />
                    </div>
                </>
            )}

            {!isRecentStatType && (
                <div className="card-body p-0 d-flex justify-content-between flex-column overflow-hidden">
                    <div className="d-flex flex-stack flex-wrap flex-grow-1 px-9 pt-9 pb-3">
                        <>
                            <div className="me-2">
                                <span
                                    className={`fw-bolder text-gray-800 d-block fs-3 ${`${config.textColorClass}`}`}
                                >
                                    {header}
                                </span>
                                <span className="text-gray-400 fw-bold">{description}</span>
                            </div>
                            <div className="fw-bolder fs-3 text-primary">
                                {config.currency}
                                {config.delta}
                            </div>
                        </>
                        {optionsVariant === "filter" && (
                            <CardOptionsDropdown width={300}>
                                <TaskOverviewFilterForm
                                    options={cardOptions ?? []}
                                    onApply={(values) => {
                                        console.log("FILTER APPLY", values)
                                    }}
                                />
                            </CardOptionsDropdown>
                        )}

                        {optionsVariant === "menu" && (
                            <PaymentMenuDropdown options={cardOptions ?? []} btnType="" />
                        )}
                    </div>

                    <div className="bar-chart">
                        <Chart
                            type="bar"
                            height={chartConfig?.height ?? 330}
                            series={series}
                            options={options}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
