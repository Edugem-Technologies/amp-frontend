/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"
import ApexLineChart from "@/app/components/apex-charts/ApexLineChart"
import { IconMap } from "../icons/IconMap"

type StatItem = {
    title: string
    subtitle?: string
    brandIcon?: string
    amount: number
    deals?: number
    trend?: string
    btnClass?: string
    iconBgClass?: string
    icon?: any
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
    withIcon?: boolean
}

const StatsOverviewWithChart = ({
    chartData,
    chartColor = "#FFC107",
    chartHeight = 100,
    stats,
    withIcon,
}: Props) => {
    console.log("stats", stats)

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
                    {Array.from({ length: Math.ceil((stats?.length || 0) / 2) }).map(
                        (_, rowIndex) => {
                            const row = stats?.slice(rowIndex * 2, rowIndex * 2 + 2) || []
                            const isLastRow = rowIndex === Math.ceil((stats?.length || 0) / 2) - 1

                            return (
                                <div
                                    key={rowIndex}
                                    className={`row g-0 ${!isLastRow ? "" : "mt-8"}`}
                                >
                                    {row?.map((col, colIndex) => (
                                        <div
                                            key={colIndex}
                                            className={`col ${colIndex === 0 ? "mr-8" : ""}`}
                                        >
                                            {!withIcon ? (
                                                <>
                                                    <div className="fs-7 text-muted fw-bold">
                                                        {col.title}
                                                    </div>

                                                    <div className="fs-4 fw-bolder d-flex align-items-center">
                                                        ${col.amount}
                                                        {col.trend && (
                                                            <span
                                                                className={`ms-2 fs-7 fw-bold ${
                                                                    col.trend === "up"
                                                                        ? "text-success"
                                                                        : "text-danger"
                                                                }`}
                                                            >
                                                                {col.trend === "up" ? "↑" : "↓"}
                                                            </span>
                                                        )}
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="d-flex align-items-center me-2">
                                                    <div className="symbol symbol-50px me-3">
                                                        <div
                                                            className={`symbol-label ${col.btnClass}`}
                                                        >
                                                            <span
                                                                className={`svg-icon svg-icon-1 ${col?.iconBgClass}`}
                                                            >
                                                                {col.icon &&
                                                                    IconMap[
                                                                        col.icon as keyof typeof IconMap
                                                                    ]}{" "}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="fs-4 fw-bolder d-flex align-items-center">
                                                            ${col.amount}
                                                            {col.trend && (
                                                                <span
                                                                    className={`ms-2 fs-7 fw-bold ${
                                                                        col.trend === "up"
                                                                            ? "text-success"
                                                                            : "text-danger"
                                                                    }`}
                                                                >
                                                                    {col.trend === "up" ? "↑" : "↓"}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="fs-7 text-muted fw-bold">
                                                            {col.title}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )
                        },
                    )}
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
