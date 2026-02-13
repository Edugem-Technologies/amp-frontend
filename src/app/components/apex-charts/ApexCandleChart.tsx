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
        <div className="apex-candle-container">
            {/* HEADER */}
            <div className="d-flex card-header-wrapper">
                <div>
                    <h3 className="card-title">{header}</h3>
                    {description && <p className="card-muted-text">{description}</p>}
                </div>

                <div className="selector-tab-wrapper">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${activeTab === tab ? "active-btn" : ""}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* CHART */}
            <Chart height={330} options={options} series={series} />
        </div>
    )
}
