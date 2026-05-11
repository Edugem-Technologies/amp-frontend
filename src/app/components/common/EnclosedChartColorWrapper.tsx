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
    trendValues?: boolean
    disablePadding?: boolean
}

const EnclosedChartColorWrapper = ({
    item,
    lineChart,
    cardOptions,
    optionsVariant,
    trendValues,
    disablePadding,
}: Props) => {
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
                        disablePadding={disablePadding}
                        chartData={item.data ?? []}
                        lineColor={item.lineColor}
                        lineWidth={item.lineWidth ?? 3}
                        lineShadow={
                            !trendValues
                                ? {
                                      enabled: true,
                                      blur: 2,
                                      opacity: 0.8,
                                      offsetX: 0,
                                      offsetY: 7,
                                  }
                                : undefined
                        }
                        chartConfigoptions={{
                            grid: {
                                padding: {
                                    bottom: !trendValues ? 100 : 0,
                                },
                            },
                        }}
                        showOnlyLine
                        cardBg={item.chartFillColor}
                        height={trendValues ? 95 : 180}
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

            {trendValues && (
                <div className="trend-summary" style={{ background: item.chartFillColor }}>
                    <div className="trend-summary__amount">
                        {item.currency}
                        {item.amount}
                    </div>

                    <div
                        className={`trend-summary__growth ${
                            item.trend === "up"
                                ? "trend-summary__growth--up"
                                : "trend-summary__growth--down"
                        }`}
                    >
                        {item.trend === "up" ? "+" : "-"}
                        {item.growth}% {item.growthLabel}
                    </div>
                </div>
            )}

            {!trendValues ? (
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
            ) : (
                <></>
            )}
        </div>
    )
}

export default EnclosedChartColorWrapper
