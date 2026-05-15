// TaskHistory.tsx
"use client"

import { Accordion } from "react-bootstrap"

export interface HistoryItem {
    id: number
    time: string
    badgeCss: string
    name: string
}

interface TaskHistoryProps {
    history: HistoryItem[]
}

const TaskHistory = ({ history }: TaskHistoryProps) => {
    return (
        <Accordion className="v1 my-6">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <span className="position-relative">
                        History
                        <span className="count">
                            <span>{history.length}</span>
                        </span>
                    </span>
                </Accordion.Header>

                <Accordion.Body>
                    <div className="timeline-label">
                        {history.map((item) => (
                            <div
                                className="timeline-item"
                                key={item.id}
                            >
                                {/* Time */}
                                <div className="timeline-label text-gray-800">
                                    {item.time}
                                </div>

                                {/* Badge */}
                                <div className="timeline-badge">
                                    <i
                                        className={`fa fa-genderless text-${item.badgeCss} fs-1`}
                                    ></i>
                                </div>

                                {/* Content */}
                                <div className="timeline-content d-flex">
                                    <span className="text-gray-800 ps-3">
                                        {item.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default TaskHistory