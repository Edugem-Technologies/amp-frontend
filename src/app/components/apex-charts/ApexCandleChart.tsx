"use client"

import dynamic from "next/dynamic"
import { useState } from "react"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

type DataPoint = {
    label: string
    netProfit?: number
    revenue?: number
    expences?: number
}

type Props = {
    config: {
        header: string
        description?: string
        data: Record<string, DataPoint[]>
    }
    chartFillColor: string
}

export default function ApexCandleChart({ config }: Props) {
    const { header, description, data } = config

    const tabs = Object.keys(data)
    const [activeTab, setActiveTab] = useState(tabs[0])

    const resolvedData = data[activeTab] || []

    const categories = resolvedData.map((d) => d.label)

    const barSeries = [
        {
            type: "bar",
            data: resolvedData.map((d) => d.netProfit ?? 0),
        },
        {
            type: "bar",
            data: resolvedData.map((d) => d.revenue ?? 0),
        },
    ]

    const areaSeries = [
        {
            type: "area",
            data: resolvedData.map((d) => d.expences ?? 0),
        },
    ]

    const series = [...barSeries, ...areaSeries]

    const options: ApexCharts.ApexOptions = {
        chart: {
            stacked: true,
            toolbar: { show: false },
        },

        colors: ["#1F1F1F", "#17DE86", "rgba(23,222,134,0.2)"],

        plotOptions: {
            bar: {
                columnWidth: "28%",
                borderRadius: 6,
                borderRadiusApplication: "end",
            },
        },

        stroke: {
            curve: "smooth",
            width: [0, 0, 2],
        },

        fill: {
            type: ["solid", "solid", "gradient"],
            gradient: {
                opacityFrom: 0.35,
                opacityTo: 0,
            },
        },

        dataLabels: { enabled: false },

        xaxis: {
            categories,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: "#A1A5B7", fontSize: "12px" },
            },
        },

        yaxis: {
            labels: {
                style: { colors: "#A1A5B7", fontSize: "12px" },
            },
        },

        grid: {
            borderColor: "#EEF0F5",
            strokeDashArray: 4,
        },

        legend: { show: false },
        tooltip: { shared: true },
    }

    return (
        <div className="card card-xl-stretch mb-xl-8">
            {/* HEADER */}
            <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder fs-3 mb-1">{header}</span>
                    <span className="text-muted fw-bold fs-7">{description}</span>
                </h3>
                <div className="selector-tab-wrapper card-toolbar">
                    {tabs.map((tab, index) => (
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

            {/* CHART */}
            <div className="apex-bar-chart-wrapper">
                <Chart height={330} options={options} series={series} />
            </div>
        </div>
    )
}
