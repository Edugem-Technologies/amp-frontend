"use client"

import dynamic from "next/dynamic"
import { useState, useMemo } from "react"
import CardOptionsDropdown from "../common/CardOptionsDropdown"
import TaskOverviewFilterForm from "../common/TaskOverviewFilterForm"
import { CardDropdownOptionItf } from "@/types/common/DashboardCardsTypes"

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

type Props = {
    config: {
        header: string
        description?: string
        data:
            | {
                  label: string
                  netProfit: number
                  revenue: number
              }[]
            | Record<
                  string,
                  {
                      label: string
                      netProfit: number
                      revenue: number
                  }[]
              >
    }
    chartConfig?: ChartConfig
    optionsVariant?: "filter" | "menu"
    cardOptions?: CardDropdownOptionItf[]
}

export default function ApexBarChartWrapper({
    config,
    chartConfig,
    optionsVariant,
    cardOptions,
}: Props) {
    const { header, description, data } = config

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
        colors: ["#1F1F1F", "#E5E7EB"],

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
        <div className="apex-bar-container">
            {/* HEADER */}
            <div className="d-flex card-header-wrapper">
                <div className="header">
                    <h3 className="card-title">{header}</h3>
                    {description && <p className="card-muted-text">{description}</p>}
                </div>

                <div className="selector-tab-wrapper ">
                    {isTabbedData && (
                        <div className="flex gap-2">
                            {Object.keys(data).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 py-1 rounded-md text-sm ${
                                        activeTab === tab ? "active-btn" : ""
                                    }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {optionsVariant === "filter" && (
                    <CardOptionsDropdown width={300} btnClass="btn-color-primary">
                        <TaskOverviewFilterForm
                            options={cardOptions ?? []}
                            onApply={(values) => {
                                console.log("FILTER APPLY", values)
                            }}
                        />
                    </CardOptionsDropdown>
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
    )
}
