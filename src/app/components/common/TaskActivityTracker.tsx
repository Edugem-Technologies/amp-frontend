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
}

const TaskActivityTracker: React.FC<Props> = ({ data, optionsVariant, cardOptions }) => {
    return (
        <div className="task-activity-tracker-card">
            {/* HEADER */}
            <div className="task-activity-tracker-card__header">
                <div>
                    <h3 className="card-title">{data.header.title}</h3>
                    {data.header.description && (
                        <p className="card-muted-text">{data.header.description}</p>
                    )}
                </div>

                {optionsVariant === "filter" && (
                    <CardOptionsDropdown width={300} btnClass="btn-color-primary">
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
            <div className="task-activity-tracker-card__list">
                {data.tasks?.map((task, index) => (
                    <div key={task.id} className="activity-row">
                        {/* TIME */}
                        <div className="activity-time">{task.time}</div>

                        {/* TIMELINE */}
                        <div className="activity-timeline">
                            <span className="activity-dot" style={{ borderColor: task.color }} />
                            {index !== data.tasks!.length - 1 && <span className="activity-line" />}
                        </div>

                        {/* CONTENT */}
                        <div
                            className="activity-content"
                            dangerouslySetInnerHTML={{ __html: task.title }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TaskActivityTracker
