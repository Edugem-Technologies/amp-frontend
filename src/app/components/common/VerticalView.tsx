import { getStatusColor } from "@/fixtures/GlobalData"
import Accordion from "react-bootstrap/Accordion"
import BaseStaticSelect from "../input/BaseStaticSelect"
import { Fence, Status } from "@/types/components/DragSortableCards"
import { useState } from "react"

type Props = {
    data: Fence[]
}

const VerticalView = ({ data }: Props) => {
    const [activeKey, setActiveKey] = useState<string | null>(null)
    return (
        <Accordion
            className="accordion v2"
            activeKey={activeKey}
            onSelect={(key) => {
                setActiveKey((prev) => (prev === key ? null : (key as string)))
            }}
        >
            {data.map((fence, index) => (
                <Accordion.Item eventKey={String(index)} key={fence.id}>
                    {/* <Accordion.Header>{fence.label}</Accordion.Header> */}
                    <Accordion.Header>
                        <span className="btn btn-icon btn-sm">
                            <span className="material-symbols-rounded">
                                {activeKey === String(index) ? "expand_less" : "expand_more"}
                            </span>
                        </span>
                        {fence.label}
                    </Accordion.Header>

                    <Accordion.Body>
                        <div className="roadmaps list sortable ui-sortable">
                            {fence?.tasks?.map((task, index) => (
                                <div
                                    className="item ui-sortable-handle"
                                    key={index}
                                    style={{ backgroundColor: getStatusColor(task.currentStatus) }}
                                >
                                    <div className="link"></div>
                                    <div className="col-auto icon me-1 c-progress">
                                        <svg viewBox="0 0 36 36" className="circular-progress">
                                            <path
                                                className="circle"
                                                strokeDasharray={`${task.prgressLevel}, 100`}
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />

                                            <text x="18" y="22" className="percentage">
                                                {task.prgressLevel}
                                            </text>
                                        </svg>
                                    </div>
                                    <div className="col flex-grow-1">
                                        <div className="fw-bolder t-title">{task.title}</div>
                                        <div className="fw-bold t-timings">{task.subtitle}</div>
                                    </div>
                                    <div className="col-auto c-last">
                                        <div className="t-fences">
                                            <BaseStaticSelect
                                                options={task.statusList.map((s: Status) => ({
                                                    label: s.label,
                                                    value: s.id,
                                                    data: s,
                                                }))}
                                                selectedOptionValue={{
                                                    label:
                                                        task.statusList.find(
                                                            (s) => s.id === task.currentStatus,
                                                        )?.label || "",
                                                    value: task.currentStatus,
                                                }}
                                                isMulti={false}
                                                onSelected={() => {}}
                                                className="status-dropdown"
                                                isCheckBoxDropdowns={false}
                                                isClearable={false}
                                            />
                                        </div>
                                        <div className="p-symbols">
                                            <div className="symbol-group symbol-hover d-inline-flex flex-nowrap pe-1">
                                                {task.users.map((user, i) => (
                                                    <div
                                                        className="symbol symbol-circle symbol-40px"
                                                        key={i}
                                                    >
                                                        <img
                                                            key={i}
                                                            src={user}
                                                            className="avatar"
                                                            alt=""
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="actions">
                                            {task.actions.map((action, index) => {
                                                return (
                                                    <a
                                                        className="btn btn-icon btn-sm delete"
                                                        key={index}
                                                    >
                                                        <span
                                                            className="material-symbols-rounded"
                                                            style={{ fontWeight: "500" }}
                                                        >
                                                            {action.icon}
                                                        </span>
                                                    </a>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}

export default VerticalView
