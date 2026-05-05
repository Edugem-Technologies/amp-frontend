import React from "react"
import { IconMap } from "../icons/IconMap"
import Image from "next/image"
import CardOptionsDropdown from "./CardOptionsDropdown"
import TaskOverviewFilterForm from "./TaskOverviewFilterForm"
import PaymentMenuDropdown from "./PaymentMenuDropdown"
import { CardDropdownOptionItf, TaskNTodoDataItf } from "@/types/common/DashboardCardsTypes"

interface Props {
    data: TaskNTodoDataItf
    showBadges?: boolean
    isIcon?: boolean
    cardOptions?: CardDropdownOptionItf[]
    optionsVariant?: "filter" | "menu"
}

export const tasksOverviewIconMap = {
    "1": "book",
    "2": "pen",
    "3": "chat",
    "4": "devOps",
    "5": "testing",
} as const

type TaskIconId = keyof typeof tasksOverviewIconMap
type IconKey = keyof typeof IconMap

const TaskNTodo: React.FC<Props> = ({ data, showBadges, isIcon, cardOptions, optionsVariant }) => {
    const list = data.tasks || data.todos || []

    return (
        <div className="task-card">
            <div className="task-card__header">
                <div>
                    <h3 className="card-title">{data.header.title}</h3>
                    {data.header.description && (
                        <p className="card-muted-text">{data.header.description}</p>
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

                {optionsVariant === "menu" && (
                    <PaymentMenuDropdown options={cardOptions ?? []} btnClass="btn-color-primary" />
                )}
            </div>

            <div className="task-card__list">
                {list.map((item) => {
                    const iconName = tasksOverviewIconMap[item.id as TaskIconId]

                    const IconComponent = iconName ? IconMap[iconName as IconKey] : null

                    return (
                        <div key={item.id} className="task-card__item">
                            {/* LEFT */}
                            <div className="task-card__left">
                                {showBadges && item.completion === undefined && (
                                    <div className="form-check-input-wrapper">
                                        <div
                                            className="sucess-color-code"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <input type="checkbox" />{" "}
                                    </div>
                                )}
                                {isIcon && !item.brandIcon && (
                                    <div
                                        className="task-card__icon"
                                        style={{ background: item.color }}
                                    >
                                        {IconComponent}
                                    </div>
                                )}
                                {isIcon && item.brandIcon && (
                                    <div
                                        className="task-card__icon"
                                        style={{ background: item.color }}
                                    >
                                        <Image
                                            src={item.brandIcon}
                                            alt="brand-icon"
                                            height={24}
                                            width={24}
                                        />
                                    </div>
                                )}

                                <div className="task-card__content">
                                    <h4>{item.title}</h4>
                                    <span>{item.role || item.due}</span>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="task-card__right">
                                {item.completion !== undefined && (
                                    <>
                                        <span className="percent">{item.completion}%</span>

                                        <div className="progress">
                                            <div
                                                className="progress__fill"
                                                style={{
                                                    width: `${item.completion}%`,
                                                }}
                                            />
                                        </div>
                                    </>
                                )}

                                {showBadges && item.completion === undefined && (
                                    <span className="badge">New</span>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TaskNTodo
