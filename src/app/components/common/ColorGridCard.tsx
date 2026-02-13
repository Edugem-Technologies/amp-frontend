"use client"
import React from "react"
import { IconMap } from "../icons/IconMap"
import CardOptionsDropdown from "./CardOptionsDropdown"
import TaskOverviewFilterForm from "./TaskOverviewFilterForm"
import { CardDropdownOptionItf } from "@/types/common/DashboardCardsTypes"

type StatItem = {
    title: string
    desc: string
    revenue: number
    isProfit: boolean
}

type SalesSummaryCard = {
    id: string
    header: string
    balanceAmount: number
    bgColor: string
    stats: StatItem[]
}

type Props = {
    data: SalesSummaryCard
    bottomStatsLayout?: "inside" | "middle" | "half"
    cardOptions?: CardDropdownOptionItf[]
    optionsVariant?: "filter" | "menu"
}

const formatMoney = (num: number) => {
    if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(1)}b`
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}m`
    return `$${num.toLocaleString()}`
}

const STAT_ICON_BY_TITLE: Record<string, keyof typeof IconMap> = {
    Sales: "globe",
    Revenue: "tabSelector",
    Growth: "growth",
    Dispute: "file",
}
const ColorGridCard: React.FC<Props> = ({
    data,
    bottomStatsLayout = "half",
    cardOptions,
    optionsVariant,
}) => {
    const { header, balanceAmount, bgColor, stats } = data

    return (
        <div className={`color-grid-card layout-${bottomStatsLayout}`}>
            <div className="color-grid-card__top" style={{ backgroundColor: bgColor }}>
                <div className="card-headers">
                    <h3 className="card-title">{header}</h3>
                    {optionsVariant === "filter" && (
                        <CardOptionsDropdown
                            width={300}
                            btnClass="btn btn-sm btn-icon btn-color-white btn-active-white"
                        >
                            <TaskOverviewFilterForm
                                options={cardOptions ?? []}
                                onApply={(values) => {
                                    console.log("FILTER APPLY", values)
                                }}
                            />
                        </CardOptionsDropdown>
                    )}
                </div>

                <div className="balance">
                    <span className="label">You Balance</span>
                    <h2>${balanceAmount.toLocaleString()}</h2>
                </div>
            </div>
            <div className="color-grid-card__bottom">
                <div className="color-grid-card__stats">
                    {stats.map((item) => (
                        <div className="stat-row" key={item.title}>
                            <div className="left">
                                <div className="icon-placeholder">
                                    {IconMap[STAT_ICON_BY_TITLE[item.title]]}
                                </div>
                                <div className="text">
                                    <p className="title">{item.title}</p>
                                    <p className="desc">{item.desc}</p>
                                </div>
                            </div>

                            <div className="right">
                                <span className="amount">{formatMoney(item.revenue)}</span>
                                <span className={`arrow ${item.isProfit ? "up" : "down"}`}>
                                    {item.isProfit ? IconMap.arrowUp : IconMap.arrowDown}
                                </span>{" "}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ColorGridCard
