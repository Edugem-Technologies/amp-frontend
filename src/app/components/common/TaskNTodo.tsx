import React from "react"
import { IconMap } from "../icons/IconMap"
import Image from "next/image"
import CardOptionsDropdown from "./CardOptionsDropdown"
import TaskOverviewFilterForm from "./TaskOverviewFilterForm"
import PaymentMenuDropdown from "./PaymentMenuDropdown"
import { CardDropdownOptionItf, TaskNTodoDataItf } from "@/types/common/DashboardCardsTypes"
import Link from "next/link"

interface Props {
    data: TaskNTodoDataItf
    showBadges?: boolean
    isIcon?: boolean
    cardOptions?: CardDropdownOptionItf[]
    optionsVariant?: "filter" | "menu"
    version?: string
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

const TaskNTodo: React.FC<Props> = ({ data, isIcon, cardOptions, optionsVariant, version }) => {
    const list = data.tasks || data.todos || []

    return (
        <div className="card card-xl-stretch mb-xl-8">
            <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder text-dark">{data.header.title}</span>
                    <span className="text-muted mt-1 fw-bold fs-7">{data.header.description}</span>
                </h3>

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

            {version && version === "v1" && (
                <div className="card-body pt-5">
                    {list.map((item, index) => {
                        const iconName = tasksOverviewIconMap[item.id as TaskIconId]

                        const IconComponent = iconName ? IconMap[iconName as IconKey] : null
                        return (
                            <div key={index} className="d-flex align-items-center mb-7">
                                {isIcon && !item.brandIcon && (
                                    <div className="symbol symbol-50px me-5">
                                        <span className="symbol-label bg-light-success">
                                            <span className="svg-icon svg-icon-2x svg-icon-success">
                                                {IconComponent}
                                            </span>
                                        </span>
                                    </div>
                                )}
                                <div className="d-flex flex-column">
                                    <Link
                                        href="#"
                                        className="text-dark text-hover-primary fs-6 fw-bolder"
                                    >
                                        {item.title}
                                    </Link>
                                    <span className="text-muted fw-bold">
                                        {item.role || item.due}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            {version && version === "v2" && (
                <div className="card-body pt-2">
                    {list.map((item, index) => {
                        return (
                            <div key={index} className="d-flex align-items-center mb-8">
                                <span className="bullet bullet-vertical h-40px bg-success"></span>
                                <div className="form-check form-check-custom form-check-solid mx-5">
                                    <input type="checkbox" className="form-check-input" />
                                </div>
                                <div className="flex-grow-1">
                                    <Link
                                        href="#"
                                        className="text-gray-800 text-hover-primary fw-bolder fs-6"
                                    >
                                        {item.title}
                                    </Link>
                                    <span className="text-muted fw-bold d-block">
                                        Due in {item.role || item.due}
                                    </span>
                                </div>
                                <span className="badge badge-light-success fs-8 fw-bolder">
                                    New
                                </span>
                            </div>
                        )
                    })}
                </div>
            )}

            {version && version === "v3" && (
                <div className="card-body py-3">
                    <div className="table-responsive">
                        <table className="table align-middle gs-0 gy-5">
                            <thead>
                                <tr>
                                    <th className="p-0 w-50px"></th>
                                    <th className="p-0 min-w-200px"></th>
                                    <th className="p-0 min-w-100px"></th>
                                    <th className="p-0 min-w-40px"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <th>
                                                    <div className="symbol symbol-50px me-2">
                                                        <span className="symbol-label bg-light-primary">
                                                            <Image
                                                                src={item.brandIcon as string}
                                                                alt="brand-icon"
                                                                height={24}
                                                                width={24}
                                                            />
                                                        </span>
                                                    </div>
                                                </th>
                                                <td>
                                                    <Link
                                                        href="#"
                                                        className="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                    <span className="text-muted fw-bold d-block fs-7">
                                                        {item.role}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex flex-column w-100 me-2">
                                                        <div className="d-flex flex-stack mb-2">
                                                            <span className="text-muted me-2 fs-7 fw-bold">
                                                                {item.completion}%
                                                            </span>
                                                        </div>
                                                        <div className="progress h-6px w-100">
                                                            <div
                                                                className="progress-bar bg-primary"
                                                                style={{
                                                                    width: `${item.completion}%`,
                                                                }}
                                                            >
                                                                {" "}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-end">
                                                    <Link
                                                        href="#"
                                                        className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                                                    >
                                                        <span className="svg-icon svg-icon-2">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                            >
                                                                <rect
                                                                    opacity="0.5"
                                                                    x="18"
                                                                    y="13"
                                                                    width="13"
                                                                    height="2"
                                                                    rx="1"
                                                                    transform="rotate(-180 18 13)"
                                                                    fill="black"
                                                                ></rect>
                                                                <path
                                                                    d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                                                                    fill="black"
                                                                ></path>
                                                            </svg>
                                                        </span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TaskNTodo
