// TaskLinks.tsx
"use client"

import { Accordion, Form, Button } from "react-bootstrap"

export interface LinkItem {
    id: number
    name: string
    time: string
    title: string
    url: string
}

interface TaskLinksProps {
    links: LinkItem[]
}

const TaskLinks = ({ links }: TaskLinksProps) => {
    return (
        <Accordion className="v1 my-6">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <span className="position-relative">
                        Links
                        <span className="count">
                            <span>{links.length}</span>
                        </span>
                    </span>
                </Accordion.Header>

                <Accordion.Body>
                    <div>
                        {links.map((link) => (
                            <div className="d-flex mb-5" key={link.id}>
                                <div className="d-flex flex-column flex-row-fluid">
                                    {/* Info */}
                                    <div className="d-flex align-items-center flex-wrap mb-1">
                                        <span className="text-gray-800 fw-bolder me-1">
                                            {link.name}
                                        </span>

                                        <span className="text-gray-400 fw-bold fs-7">
                                            ({link.time})
                                        </span>
                                    </div>

                                    {/* Link */}
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-purple fw-bolder me-1"
                                    >
                                        {link.title}
                                    </a>
                                </div>
                            </div>
                        ))}

                        {/* Add Link */}
                        <div className="card-footer p-0 pt-4">
                            <div className="mb-4">
                                <Form.Control
                                    type="text"
                                    className="form-control form-control-solid"
                                    placeholder="Add Link Name.."
                                />
                            </div>

                            <div className="mb-4">
                                <Form.Control
                                    type="text"
                                    className="form-control form-control-solid"
                                    placeholder="Add Link URL.."
                                />
                            </div>

                            <div className="d-flex flex-stack">
                                <div className="d-flex align-items-center me-2">&nbsp;</div>

                                <Button className="btn btn-sm btn-purple" type="button">
                                    Add Link
                                </Button>
                            </div>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default TaskLinks
