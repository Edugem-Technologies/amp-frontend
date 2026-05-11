"use client"

import React from "react"
import ApexLineChart from "@/app/components/apex-charts/ApexLineChart"
import Link from "next/link"

type StatItem = {
    title: string
    subtitle?: string
    brandIcon?: string
    amount: number
    deals?: number
    trend?: string
    icon?: string
    btnClass?: string
    iconBgClass?: string
}

type Props = {
    header?: {
        title: string
        subtitle: string
    }
    stats?: StatItem[]
    currency?: string
    chartData: {
        label: string
        value: number
    }[]
    chartColor?: string
    chartHeight?: number
    showReverse?: boolean
}

const TrendsOverviewWithChart = ({
    chartData,
    chartColor = "#FFC107",
    chartHeight = 100,
    stats,
}: Props) => {
    console.log("statsstats", stats)
    return (
        <div className="card card-xl-stretch mb-xl-8">
            <div className="card-header border-0 py-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder fs-3 mb-1">Trends Overview</span>
                    <span className="text-muted fw-bold fs-7">Latest trends</span>
                </h3>
                <div className="card-toolbar"></div>
            </div>

            <div className="card-body d-flex flex-column">
                <div
                    className="mixed-widget-3-chart card-rounded-bottom"
                    data-kt-chart-color="widget-color"
                >
                    <ApexLineChart data={chartData} height={chartHeight} color={chartColor} />
                </div>

                <div className="mt-5">
                    {stats?.map((item, index) => (
                        <div
                            key={index}
                            className={`d-flex flex-stack ${
                                index !== stats.length - 1 ? "mb-5" : ""
                            }`}
                        >
                            <div className="d-flex align-items-center me-2">
                                <div className="symbol symbol-50px me-3">
                                    <div className="symbol-label bg-light">
                                        <img
                                            src={item.brandIcon}
                                            alt={item.title}
                                            className="h-50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Link
                                        href="#"
                                        className="fs-6 text-gray-800 text-hover-primary fw-bolder"
                                    >
                                        {item.title}
                                    </Link>

                                    <div className="fs-7 text-muted fw-bold mt-1">
                                        {item.subtitle}
                                    </div>
                                </div>
                            </div>

                            <div className="badge badge-light fw-bold py-4 px-3">{item.amount}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TrendsOverviewWithChart
