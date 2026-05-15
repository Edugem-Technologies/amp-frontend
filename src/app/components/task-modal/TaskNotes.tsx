// TaskNotes.tsx
"use client"

import { Accordion, Form, Button } from "react-bootstrap"

export interface NoteItem {
    id: number
    name: string
    time: string
    message: string
    avatar?: string
    initials?: string
}

interface TaskNotesProps {
    notes: NoteItem[]
}

const TaskNotes = ({ notes }: TaskNotesProps) => {
    return (
        <Accordion className="v1 my-6">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <span className="position-relative">
                        Notes
                        <span className="count">
                            <span>{notes.length}</span>
                        </span>
                    </span>
                </Accordion.Header>

                <Accordion.Body>
                    <div>
                        {notes.map((note) => (
                            <div className="d-flex mb-5" key={note.id}>
                                {/* Avatar */}
                                <div className="symbol symbol-45px me-5">
                                    {note.avatar ? (
                                        <img src={note.avatar} alt="" />
                                    ) : (
                                        <div className="symbol-label fs-4 fw-bold bg-electric text-inverse-primary">
                                            {note.initials}
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="d-flex flex-column flex-row-fluid">
                                    <div className="d-flex align-items-center flex-wrap mb-1">
                                        <a
                                            href="#"
                                            className="text-gray-800 text-hover-primary fw-bolder me-2"
                                        >
                                            {note.name}
                                        </a>

                                        <span className="text-gray-400 fw-bold fs-7">
                                            {note.time}
                                        </span>
                                    </div>

                                    <span className="text-gray-800 fw-normal pt-1">
                                        {note.message}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Add Note */}
                        <div className="card-footer p-0 pt-4">
                            <Form.Control
                                as="textarea"
                                className="form-control form-control-solid mb-2"
                                placeholder="Add Note.."
                                rows={4}
                            />

                            <div className="d-flex flex-stack">
                                <div className="d-flex align-items-center me-2">&nbsp;</div>

                                <Button className="btn btn-sm btn-purple" type="button">
                                    Add Note
                                </Button>
                            </div>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default TaskNotes
