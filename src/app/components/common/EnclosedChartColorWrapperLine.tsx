"use client"
import React from "react"
import ApexProgressLineWrapper from "../apex-charts/ApexProgressLineWrapper"
import { CardDropdownOptionItf, EnclosedChartWrapperIntf } from "@/types/common/DashboardCardsTypes"
import Link from "next/link"
import dynamic from "next/dynamic"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

type Props = {
    item: EnclosedChartWrapperIntf
    lineChart?: boolean
    cardOptions?: CardDropdownOptionItf[]
    optionsVariant?: "filter" | "menu"
    trendValues?: boolean
    barChart?: boolean
}

const EnclosedChartColorWrapperLine = ({ item, trendValues, barChart }: Props) => {
    const series = [
        {
            name: "Inflation",
            data:
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                item.data?.map((d: any) => ({
                    x: d.label,
                    y: d.inflation,
                })) ?? [],
        },
    ]

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "bar",
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                columnWidth: "16%",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: false,
        },
        grid: {
            show: false,
        },
        xaxis: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            categories: item.data?.map((d: any) => d.label) ?? [],
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
        legend: {
            show: false,
        },
        tooltip: {
            enabled: true,
        },
        fill: {
            opacity: 1,
        },
        colors: [item.lineColor || "#ffffff"],
    }

    return (
        <div
            className="card card-xl-stretch mb-xl-8"
            style={{ backgroundColor: item.chartFillColor }}
        >
            <div className="card-body d-flex flex-column">
                <div className="d-flex flex-column flex-grow-1">
                    <Link href="#" className="text-dark text-hover-primary fw-bolder fs-3">
                        {item.title}
                    </Link>

                    <div className="mixed-widget-13-chart">
                        {!barChart && (
                            <ApexProgressLineWrapper
                                disablePadding={true}
                                chartData={item.data ?? []}
                                lineColor={item.lineColor}
                                lineWidth={item.lineWidth ?? 3}
                                lineShadow={
                                    !trendValues
                                        ? {
                                              enabled: true,
                                              blur: 2,
                                              opacity: 0.8,
                                              offsetX: 0,
                                              offsetY: 7,
                                          }
                                        : undefined
                                }
                                chartConfigoptions={{
                                    grid: {
                                        padding: {
                                            bottom: !trendValues ? 100 : 0,
                                        },
                                    },
                                }}
                                showOnlyLine
                                cardBg={item.chartFillColor}
                                height={90}
                            />
                        )}

                        {barChart && (
                            <Chart type="bar" height={160} series={series} options={options} />
                        )}
                    </div>
                </div>

                <div className="pt-5">
                    <span className="text-dark fw-bolder fs-2x lh-0">{item.currency}</span>

                    <span className="text-dark fw-bolder fs-3x me-2 lh-0">{item.amount}</span>

                    <span className="text-dark fw-bolder fs-6 lh-0">
                        {" "}
                        {item.trend === "up" ? "+" : "-"}
                        {item.growth}% {item.growthLabel}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default EnclosedChartColorWrapperLine
