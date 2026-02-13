"use client"

import { ApexOptions } from "apexcharts"
import dynamic from "next/dynamic"
import { useMemo } from "react"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

type Props = {
    value: number
    color: string
    strokeWidth?: number
    size?: number
}

const ApexRadialProgress = ({ value, color, strokeWidth = 12, size = 190 }: Props) => {
    const series = [value]

    const options = useMemo<ApexOptions>(
        () => ({
            chart: {
                type: "radialBar",
                sparkline: { enabled: true },
            },
            colors: [color],
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: "70%",
                    },
                    track: {
                        background: "#E9ECEF",
                        strokeWidth: "100%",
                    },
                    dataLabels: {
                        name: { show: false },
                        value: {
                            fontSize: "28px",
                            fontWeight: 600,
                            offsetY: 5,
                            formatter: (val: number) => `${Math.round(val)}%`,
                        },
                    },
                },
            },
            stroke: {
                lineCap: "round",
                width: strokeWidth,
            },
        }),
        [color, strokeWidth],
    )

    return <Chart options={options} series={series} type="radialBar" height={size} />
}

export default ApexRadialProgress
