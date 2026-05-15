// TaskAttachments.tsx
"use client"

import { Accordion } from "react-bootstrap"

export interface AttachmentItem {
    id: number
    image: string
}

interface TaskAttachmentsProps {
    attachments: AttachmentItem[]
}

const TaskAttachments = ({ attachments }: TaskAttachmentsProps) => {
    return (
        <Accordion className="v1 my-6">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <span className="position-relative">
                        Attachments
                        <span className="count">
                            <span>{attachments.length}</span>
                        </span>
                    </span>
                </Accordion.Header>

                <Accordion.Body>
                    {/* Attachments */}
                    <div className="overflow-auto mb-5 pb-5">
                        <div className="d-flex align-items-center">
                            {attachments.map((item) => (
                                <div className="overlay me-10" key={item.id}>
                                    {/* Image */}
                                    <div className="overlay-wrapper">
                                        <img
                                            alt="attachment"
                                            className="rounded w-200px"
                                            src={item.image}
                                        />
                                    </div>

                                    {/* Overlay Actions */}
                                    <div className="overlay-layer bg-dark bg-opacity-10 rounded">
                                        <button
                                            type="button"
                                            className="btn btn-icon btn-light-primary btn-hover-primary btn-sm min-w-auto me-1 delete"
                                        >
                                            <span className="material-symbols-outlined fs-2">
                                                visibility
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-icon btn-light-primary btn-hover-primary btn-sm min-w-auto delete"
                                        >
                                            <span className="material-symbols-outlined fs-2">
                                                close
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upload Box */}
                    <div
                        className="min-w-150px card flex-center bg-light-primary border-primary border border-dashed p-8"
                        style={{ height: "153.84px" }}
                    >
                        <a href="#" className="text-hover-primary fs-5 fw-bolder mb-2">
                            Attach File
                        </a>

                        <div className="fs-7 fw-bold text-gray-400">Drag and drop files here</div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default TaskAttachments
