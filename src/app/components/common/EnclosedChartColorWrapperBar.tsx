import React from "react"
import ApexBarChartWrapper from "../apex-charts/ApexBarChartWrapper"
import { EnclosedChartWrapperIntf } from "@/types/common/DashboardCardsTypes"

type Props = {
    item: EnclosedChartWrapperIntf
}

const EnclosedChartColorWrapperBar = ({ item }: Props) => {
    return (
        <div className="wrapper-card">
            <div className="wrapper-card__top" style={{ backgroundColor: item.chartFillColor }}>
                <ApexBarChartWrapper
                    config={{
                        header: "Sales Progress",
                        description: "",
                        data: item?.chart?.data,
                        backgroundColor: item.chartFillColor,
                        textColorClass: "text-white",
                    }}
                    chartConfig={{
                        grid: { show: false },
                        xaxis: false,
                        yaxis: false,
                        height: 218,
                    }}
                />
            </div>

            <div className="card-rounded bg-body mt-n10 position-relative card-px py-15">
                <div className="row g-0 mb-7">
                    {item?.summary?.slice(0, 2).map((stat, index) => (
                        <div key={index} className="col mx-5">
                            <div className="fs-6 text-gray-400">{stat.label}</div>
                            <div className="fs-2 fw-bolder text-gray-800">{stat.value}</div>
                        </div>
                    ))}
                </div>

                <div className="row g-0 mb-7">
                    {item?.summary?.slice(2, 4).map((stat, index) => (
                        <div key={index} className="col mx-5">
                            <div className="fs-6 text-gray-400">{stat.label}</div>
                            <div className="fs-2 fw-bolder text-gray-800">{stat.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EnclosedChartColorWrapperBar
