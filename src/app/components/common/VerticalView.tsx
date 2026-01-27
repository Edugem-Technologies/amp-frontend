import { getStatusColor } from "@/fixtures/GlobalData"
import Accordion from "react-bootstrap/Accordion"
import BaseStaticSelect from "../input/BaseStaticSelect"
import { Fence, Status } from "@/types/components/DragSortableCards"

type Props = {
    data: Fence[]
}

const VerticalView = ({ data }: Props) => {
    return (
        <Accordion className="vertical-view" defaultActiveKey="0">
            {data.map((fence, index) => (
                <Accordion.Item eventKey={String(index)} key={fence.id}>
                    <Accordion.Header>{fence.label}</Accordion.Header>

                    <Accordion.Body>
                        <div className="task-list">
                            {fence?.tasks?.map((task) => (
                                <div
                                    className="task-row"
                                    key={task.id}
                                    style={{ backgroundColor: getStatusColor(task.currentStatus) }}
                                >
                                    <div className="d-flex align-items-center justify-content-between">
                                        {/* LEFT */}
                                        <div className="d-flex align-items-start gap-3">
                                            <div className="progress-circle">
                                                <svg viewBox="0 0 36 36">
                                                    <path
                                                        className="circle-bg"
                                                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    />
                                                    <path
                                                        className="circle-progress"
                                                        strokeDasharray={`${
                                                            task.progressValue === 100
                                                                ? 99.9
                                                                : task.progressValue
                                                        }, 100`}
                                                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    />
                                                </svg>

                                                <div className="progress-value">
                                                    {task.progressValue}
                                                </div>
                                            </div>

                                            <div className="task-content">
                                                <div className="task-title">{task.title}</div>
                                                <div className="task-subtitle">{task.subtitle}</div>
                                            </div>
                                        </div>

                                        {/* RIGHT */}
                                        <div className="d-flex align-items-center gap-3">
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
                                            />

                                            <div className="d-flex justify-content-end align-items-center avatar-group">
                                                {task.users.map((user, i) => (
                                                    <img
                                                        key={i}
                                                        src={user}
                                                        className="avatar"
                                                        alt=""
                                                    />
                                                ))}
                                            </div>

                                            <div className="d-flex align-items-center gap-2 task-actions mx-3">
                                                {task.actions.map((action) => {
                                                    return (
                                                        <div
                                                            key={action.id}
                                                            className="icon-container"
                                                        >
                                                            <img
                                                                src={action.icon}
                                                                alt=""
                                                                style={{ width: 20, height: 20 }}
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
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
