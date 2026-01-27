"use client"

import dynamic from "next/dynamic"

const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
})

type Point = {
    label: string
    value: number
}

type MiniLineChartProps = {
    data: Point[]
    height?: number
    color?: string
}

const ApexLineChart = ({ data, height = 160, color = "#FFC107" }: MiniLineChartProps) => {
    const series = [
        {
            name: "Value",
            data: data.map((p) => p.value),
        },
    ]

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "area",
            sparkline: { enabled: true },
            toolbar: { show: false },
            parentHeightOffset: 0,
        },

        colors: [color],

        stroke: {
            curve: "smooth",
            width: 2,
        },

        fill: {
            type: "solid",
            opacity: 0.25,
        },

        grid: {
            padding: {
                top: 0,
                bottom: -6,
                left: 0,
                right: 0,
            },
        },

        xaxis: {
            categories: data.map((p) => p.label),
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },

        yaxis: {
            show: false,
        },

        dataLabels: {
            enabled: false,
        },

        tooltip: {
            enabled: true,
        },
    }

    return <Chart options={options} series={series} type="area" height={height} />
}

export default ApexLineChart
