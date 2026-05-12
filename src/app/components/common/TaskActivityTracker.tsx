import React from "react"
import CardOptionsDropdown from "./CardOptionsDropdown"
import TaskOverviewFilterForm from "./TaskOverviewFilterForm"
import { CardDropdownOptionItf } from "@/types/common/DashboardCardsTypes"

type TaskItem = {
    id: string
    time: string
    title: string
    color: string
}

type Header = {
    title: string
    description?: string
}

type TaskNTodoData = {
    header: Header
    tasks?: TaskItem[]
}

interface Props {
    data: TaskNTodoData
    cardOptions: CardDropdownOptionItf[]
    optionsVariant: "menu" | "filter"
    optionBtnType?: string
}

const TaskActivityTracker: React.FC<Props> = ({
    data,
    optionsVariant,
    cardOptions,
    optionBtnType,
}) => {
    return (
        <div className="card card-xl-stretch mb-xl-8">
            {/* HEADER */}
            <div className="card-header align-items-center border-0 mt-4">
                <h3 className="card-title align-items-start flex-column">
                    <span className="fw-bolder mb-2 text-dark">{data.header.title}</span>
                    {data.header.description && (
                        <span className="text-muted fw-bold fs-7">{data.header.description}</span>
                    )}
                </h3>

                {optionsVariant === "filter" && (
                    <CardOptionsDropdown width={300} btnType={optionBtnType as string}>
                        <TaskOverviewFilterForm
                            options={cardOptions}
                            onApply={(values) => {
                                console.log("FILTER APPLY", values)
                            }}
                        />
                    </CardOptionsDropdown>
                )}
            </div>

            {/* LIST */}
            <div className="card-body pt-5">
                <div className="timeline-label">
                    {data.tasks?.map((task) => (
                        <div className="timeline-item" key={task.id}>
                            {/* Time */}
                            <div className="timeline-label fw-bolder text-gray-800 fs-6">
                                {task.time}
                            </div>

                            {/* Badge */}
                            <div
                                className="timeline-badge"
                                style={{
                                    backgroundColor: task.color,
                                    width: "12px",
                                    height: "12px",
                                    borderRadius: "50%",
                                    marginTop: "10px",
                                }}
                            ></div>

                            {/* Content */}
                            <div
                                className="fw-normal timeline-content text-muted ps-3"
                                dangerouslySetInnerHTML={{ __html: task.title }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TaskActivityTracker
