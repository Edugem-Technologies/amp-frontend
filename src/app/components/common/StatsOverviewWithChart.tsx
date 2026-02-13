"use client"

import React from "react"
import ApexLineChart from "@/app/components/apex-charts/ApexLineChart"
import { IconMap } from "../icons/IconMap"
import Image from "next/image"

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
    header: {
        title: string
        subtitle: string
    }
    stats: StatItem[]
    currency?: string
    chartData: {
        label: string
        value: number
    }[]
    chartColor?: string
    chartHeight?: number
    showReverse?: boolean
}

const StatsOverviewWithChart = ({
    header,
    stats,
    currency = "",
    chartData,
    chartColor = "#FFC107",
    chartHeight = 100,
    showReverse,
}: Props) => {
    return (
        <div className="pipeline-stats-wrapper  common-cards">
            <div className="pipeline-stats__without-chart">
                <div className="pipeline-stats__header card-header-wrapper">
                    <div>
                        <h3 className="card-title">{header.title}</h3>
                        <span className="card-muted-text">{header.subtitle}</span>
                    </div>
                </div>

                {showReverse && (
                    <div className="pipeline-stats__chart">
                        <ApexLineChart data={chartData} height={chartHeight} color={chartColor} />
                    </div>
                )}
                {!showReverse && (
                    <div className="pipeline-stats__grid row justify-content-between">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card col-5 mb-3 d-flex">
                                <div className="d-flex gap-3 align-items-center">
                                    {stat.icon && (
                                        <div className={`icon-container ${stat.iconBgClass}`}>
                                            <span
                                                className={`svg-icon svg-icon-2x ${
                                                    stat.btnClass || ""
                                                }`}
                                            >
                                                {IconMap[stat.icon as keyof typeof IconMap]}
                                            </span>
                                        </div>
                                    )}

                                    <div>
                                        <p>{stat.title}</p>
                                        <div className="d-flex align-items-center gap-1">
                                            <h4>
                                                {currency}
                                                {stat.amount.toLocaleString()}
                                            </h4>

                                            {stat.trend && (
                                                <span
                                                    className={`arrow ${
                                                        stat.trend === "up" ? "up" : "down"
                                                    }`}
                                                >
                                                    {stat.trend === "up"
                                                        ? IconMap.arrowUp
                                                        : IconMap.arrowDown}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {typeof stat.deals === "number" && <span>{stat.deals} Deals</span>}
                            </div>
                        ))}
                    </div>
                )}
                {showReverse && (
                    <div className="bottom-stats-grid">
                        {stats.map((stat) => (
                            <div key={stat.title} className="bottom-stat-item">
                                <div className="bottom-stat-left">
                                    {stat.brandIcon && (
                                        <div className="task-card__icon">
                                            <Image
                                                src={stat.brandIcon}
                                                alt="brand-icon"
                                                height={24}
                                                width={24}
                                            />
                                        </div>
                                    )}

                                    <div className="bottom-stat-text">
                                        <h3>{stat.title}</h3>
                                        {stat.subtitle && <p className="mt-1">{stat.subtitle}</p>}
                                    </div>
                                </div>

                                <div
                                    className={`bottom-stat-trend ${
                                        stat.trend === "up" ? "up" : "down"
                                    }`}
                                >
                                    <p className="mb-0">
                                        {stat.trend === "up" ? "+" : "-"}
                                        {stat.amount}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {!showReverse && (
                <div className="pipeline-stats__chart">
                    <ApexLineChart data={chartData} height={chartHeight} color={chartColor} />
                </div>
            )}
        </div>
    )
}

export default StatsOverviewWithChart
