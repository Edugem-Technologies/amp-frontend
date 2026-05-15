// TaskVoiceNotes.tsx
"use client"

import { Accordion } from "react-bootstrap"

export interface VoiceNoteItem {
    id: number
    title: string
    duration: string
    audio: string
}

interface TaskVoiceNotesProps {
    voiceNotes: VoiceNoteItem[]
}

const TaskVoiceNotes = ({
    voiceNotes,
}: TaskVoiceNotesProps) => {
    return (
        <Accordion className="v1 my-6">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <span className="position-relative">
                        Voice Note
                        <span className="count">
                            <span>{voiceNotes.length}</span>
                        </span>
                    </span>
                </Accordion.Header>

                <Accordion.Body>
                    {voiceNotes.map((note) => (
                        <div
                            key={note.id}
                            className="card card-bordered p-4 mb-4"
                        >
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div>
                                    <div className="fw-bolder fs-6">
                                        {note.title}
                                    </div>

                                    <div className="text-gray-400 fs-7">
                                        {note.duration}
                                    </div>
                                </div>
                            </div>

                            <audio
                                controls
                                className="w-100"
                            >
                                <source
                                    src={note.audio}
                                    type="audio/mpeg"
                                />
                                Your browser does not support the audio
                                element.
                            </audio>
                        </div>
                    ))}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default TaskVoiceNotes