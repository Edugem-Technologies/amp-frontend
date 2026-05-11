"use client"
import React from "react"
import { IconMap } from "../icons/IconMap"
import CardOptionsDropdown from "./CardOptionsDropdown"
import TaskOverviewFilterForm from "./TaskOverviewFilterForm"
import { CardDropdownOptionItf } from "@/types/common/DashboardCardsTypes"
import Link from "next/link"

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
    const { header, balanceAmount, stats } = data

    return (
        <div className={`card card-xl-stretch mb-xl-8 layout-${bottomStatsLayout}`}>
            <div className="card-body p-0">
                <div className="px-9 pt-7 card-rounded h-275px w-100 bg-primary">
                    <div className="d-flex flex-stack">
                        <h3 className="m-0 text-white fw-bolder fs-3">{header}</h3>
                        <div className="ms-1">
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
                    </div>
                    <div className="d-flex text-center flex-column text-white pt-8">
                        <span className="fw-bold fs-7">You Balance</span>
                        <span className="fw-bolder fs-2x pt-1">
                            ${balanceAmount.toLocaleString()}
                        </span>
                    </div>
                </div>
                <div
                    className="bg-body shadow-sm card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1"
                    style={{ marginTop: "-100px" }}
                >
                    {stats.map((item, index) => (
                        <div className="d-flex align-items-center mb-6" key={index}>
                            <div className="symbol symbol-45px w-40px me-5">
                                <span className="symbol-label bg-lighten">
                                    <span className="svg-icon svg-icon-1">
                                        {IconMap[STAT_ICON_BY_TITLE[item.title]]}
                                    </span>
                                </span>
                            </div>
                            <div className="d-flex align-items-center flex-wrap w-100">
                                <div className="mb-1 pe-3 flex-grow-1">
                                    <Link
                                        href="#"
                                        className="fs-5 text-gray-800 text-hover-primary fw-bolder"
                                    >
                                        {item.title}
                                    </Link>
                                    <div className="text-gray-400 fw-bold fs-7">{item.desc}</div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="fw-bolder fs-5 text-gray-800 pe-1">
                                        {formatMoney(item.revenue)}
                                    </div>
                                    <span className="svg-icon svg-icon-5 svg-icon-success ms-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <rect
                                                opacity="0.5"
                                                x="13"
                                                y="6"
                                                width="13"
                                                height="2"
                                                rx="1"
                                                transform="rotate(90 13 6)"
                                                fill="black"
                                            ></rect>
                                            <path
                                                d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z"
                                                fill="black"
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ColorGridCard
