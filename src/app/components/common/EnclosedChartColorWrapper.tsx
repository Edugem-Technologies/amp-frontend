import React from "react"
import ApexProgressLineWrapper from "../apex-charts/ApexProgressLineWrapper"
import EnclosedStatCard from "./EnclosedStatCard"
import CardOptionsDropdown from "./CardOptionsDropdown"
import TaskOverviewFilterForm from "./TaskOverviewFilterForm"
import ApexBarChartWrapper from "../apex-charts/ApexBarChartWrapper"
import { CardDropdownOptionItf, EnclosedChartWrapperIntf } from "@/types/common/DashboardCardsTypes"

type Props = {
    item: EnclosedChartWrapperIntf
    lineChart?: boolean
    cardOptions?: CardDropdownOptionItf[]
    optionsVariant?: "filter" | "menu"
}

const EnclosedChartColorWrapper = ({ item, lineChart, cardOptions, optionsVariant }: Props) => {
    return (
        <div className="wrapper-card">
            <div className="wrapper-card__top" style={{ backgroundColor: item.chartFillColor }}>
                <div className="card-headers">
                    <h3 className="card-title">{item.title}</h3>
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
                {lineChart ? (
                    <ApexProgressLineWrapper
                        chartData={item.data ?? []}
                        lineColor={item.lineColor}
                        lineWidth={3}
                        lineShadow={{
                            enabled: true,
                            blur: 2,
                            opacity: 0.8,
                            offsetX: 0,
                            offsetY: 7,
                        }}
                        chartConfigoptions={{
                            grid: {
                                padding: {
                                    bottom: 100,
                                },
                            },
                        }}
                        showOnlyLine
                        cardBg={item.chartFillColor}
                        height={210}
                    />
                ) : (
                    <ApexBarChartWrapper
                        config={{
                            header: "",
                            description: "",
                            data: item?.chart?.data,
                        }}
                        chartConfig={{
                            grid: { show: false },
                            xaxis: false,
                            yaxis: false,
                            height: 218,
                        }}
                    />
                )}
            </div>

            <div className="wrapper-card__bottom">
                {lineChart ? (
                    <div className="card-wrapper">
                        {item?.cards?.map((card) => (
                            <EnclosedStatCard
                                key={card.title}
                                title={card.title}
                                value={card.value as string}
                                icon={card.icon}
                                bgColor={card.bgColor}
                                textColor={card.textColor}
                                svgBtnClass={card.svgBtnClass}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bar-card-wrapper row justify-content-between">
                        {item?.summary?.map((stat) => (
                            <div key={stat.label} className="bar-stat-card col-5">
                                <p className="bar-stat-label">{stat.label}</p>
                                <h4 className="bar-stat-value">{stat.value}</h4>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default EnclosedChartColorWrapper
