"use client"

import React from "react"
import ApexLineChart from "@/app/components/apex-charts/ApexLineChart"

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

const periods = [
    [
        {
            label: "90%",
            amount: "$47,876",
            payments: "7 Deals",
        },
        {
            label: "Live Next 7 Days",
            amount: "$12,912",
            payments: "2 Deals",
        },
    ],
    [
        {
            label: "Won (Last 7 Days)",
            amount: "$18,450",
            payments: "3 Deals",
        },
        {
            label: "Won (Total)",
            amount: "$158,000",
            payments: "15 Deals",
        },
    ],
]

const StatsOverviewWithChart = ({
    chartData,
    chartColor = "#FFC107",
    chartHeight = 100,
}: Props) => {
    return (
        <div className="card card-xl-stretch mb-xl-8">
            <div className="card-header border-0 py-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder fs-3 mb-1">Sales Overview</span>
                    <span className="text-muted fw-bold fs-7">Recent sales statistics</span>
                </h3>
                <div className="card-toolbar"></div>
            </div>

            <div className="card-body p-0 d-flex flex-column">
                <div className="card-p pt-5 bg-body flex-grow-1">
                    {periods.map((row, rowIndex) => {
                        const isLastRow = rowIndex === periods.length - 1

                        return (
                            <div key={rowIndex} className={`row g-0 ${!isLastRow ? "" : "mt-8"}`}>
                                {row.map((col, colIndex) => (
                                    <div
                                        key={colIndex}
                                        className={`col ${colIndex === 0 ? "mr-8" : ""}`}
                                    >
                                        <div className="fs-7 text-muted fw-bold">{col.label}</div>

                                        <div className="fs-4 fw-bolder">{col.amount}</div>

                                        {/* <div className="fs-5">
                                            {col.payments}
                                        </div> */}
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>
                <div
                    className="mixed-widget-3-chart card-rounded-bottom"
                    data-kt-chart-color="widget-color"
                >
                    <div className="pipeline-stats__chart">
                        <ApexLineChart data={chartData} height={chartHeight} color={chartColor} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatsOverviewWithChart
