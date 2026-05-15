// TaskModal.tsx
"use client"

import { Modal, Row, Col, Accordion, Form, Button } from "react-bootstrap"
import TaskHistory from "./TaskHistory"
import TaskNotes, { NoteItem } from "./TaskNotes"
import TaskLinks, { LinkItem } from "./TaskLinks"
import TaskAttachments, { AttachmentItem } from "./TaskAttachements"
import TaskVoiceNotes, { VoiceNoteItem } from "./TaskVoiceNotes"
import AreaSelect from "./AreaSelect"
import PrioritySelect from "./PrioritySelect"
import { useState } from "react"
import { Option } from "@/types/components/ReactSelect"
import ProgressSelect from "./ProgressSelect"
import TeamAccordion from "./TeamAccordion"
import Tags from "./Tags"
import TimeRequired from "./TimeRequired"
import Switchers from "./Switchers"
import MirroredSections from "./MirroredSections"

interface UpdateItem {
    id: number
    name: string
    time: string
    message: string
    avatar?: string
    initials?: string
}

interface ChecklistItem {
    id: number
    text: string
    checked: boolean
}



interface HistoryItem {
    id: number
    time: string
    badgeCss: string
    name: string
    history: HistoryItem[]

}
interface TaskModalData {
    description: string
    updates: UpdateItem[]
    checklist: ChecklistItem[]
    notes: NoteItem[]
    links: LinkItem[]
    attachments: AttachmentItem[]
    dueDate: string
    createdDate: string
    voiceNotes: VoiceNoteItem[]

}

interface TaskModalProps {
    show: boolean
    handleClose: () => void
    taskData: TaskModalData
}

const TaskModal = ({ show, handleClose, taskData }: TaskModalProps) => {
    const actionButtons = [
        "Request Update",
        "Mirror",
        "Complete",
        "Favorite",
        "Duplicate",
        "Delete",
    ]
    const [priority, setPriority] = useState<Option | null>(null)

    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const handleToggleTag = (tag: string) => {
        setSelectedTags((prev) => {
            if (prev.includes(tag)) {
                return prev.filter((t) => t !== tag)
            }
            return [...prev, tag]
        })
    }
    const [selectedDuration, setSelectedDuration] = useState<number | null>(null)
    const handleSelectDuration = (value: number) => {
        setSelectedDuration((prev) => (prev === value ? null : value))
    }
    const [switchState, setSwitchState] = useState(
        taskData.switchers.reduce((acc, item) => {
            acc[item.id] = item.enabled
            return acc
        }, {} as Record<string, boolean>)
    )
    const handleToggleSwitch = (id: string) => {
        setSwitchState((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }
    return (
        <Modal show={show} onHide={handleClose} centered size="xl" className="task-card v2">
            <Modal.Body className="p-0">
                <div className="modal-body">
                    <Row className="h-100 g-0">
                        {/* LEFT SIDE */}
                        <Col md={5} className="border-end c1">
                            <div>
                                <div className="text-gray-800 fw-bolder">
                                    <div className="text-purple mb-1">Description</div>
                                    <div className="d-flex flex-column fv-row">
                                        <textarea rows={4} style={{height: 'fit-content'}} className="form-control mt-2" placeholder=""
                                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vero blanditiis earum natus veritatis deleniti voluptate nihil doloremque totam saepe?</textarea>
                                    </div>
                                </div>

                                {/* Updates */}
                                <Accordion
                                    className="v1 my-6"
                                    defaultActiveKey=""
                                >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <span className="position-relative">
                                                Updates
                                                <span className="count">
                                                    <span>
                                                        {
                                                            taskData.updates
                                                                .length
                                                        }
                                                    </span>
                                                </span>
                                            </span>
                                        </Accordion.Header>

                                        <Accordion.Body>
                                            <div>
                                                {taskData.updates.map(
                                                    (update) => (
                                                        <div
                                                            className="d-flex mb-5"
                                                            key={update.id}
                                                        >
                                                            <div className="symbol symbol-45px me-5">
                                                                {update.avatar ? (
                                                                    <img
                                                                        src={
                                                                            update.avatar
                                                                        }
                                                                        alt=""
                                                                    />
                                                                ) : (
                                                                    <div className="symbol-label fs-4 fw-bold bg-electric text-inverse-primary">
                                                                        {
                                                                            update.initials
                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="d-flex flex-column flex-row-fluid">
                                                                <div className="d-flex align-items-center flex-wrap mb-1">
                                                                    <a
                                                                        href="#"
                                                                        className="text-gray-800 text-hover-primary fw-bolder me-2"
                                                                    >
                                                                        {
                                                                            update.name
                                                                        }
                                                                    </a>

                                                                    <span className="text-gray-400 fw-bold fs-7">
                                                                        {
                                                                            update.time
                                                                        }
                                                                    </span>
                                                                </div>

                                                                <span className="text-gray-800 fw-normal pt-1">
                                                                    {
                                                                        update.message
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )
                                                )}

                                                <div className="card-footer p-0 pt-4">
                                                    <Form.Control
                                                        as="textarea"
                                                        className="form-control form-control-solid mb-2"
                                                        placeholder="Add Update.."
                                                        rows={4}
                                                    />

                                                    <div className="d-flex flex-stack">
                                                        <div className="d-flex align-items-center me-2">
                                                            &nbsp;
                                                        </div>

                                                        <Button
                                                            className="btn btn-sm btn-purple"
                                                            type="button"
                                                        >
                                                            Add Update
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                                {/* Checklist */}
                                <Accordion className="v1 my-6">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            Check List
                                        </Accordion.Header>

                                        <Accordion.Body>
                                            <div>
                                                {taskData.checklist.map(
                                                    (item) => (
                                                        <label
                                                            className="form-check form-check-sm form-check-custom form-check-solid mb-3 align-items-start"
                                                            key={item.id}
                                                        >
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                defaultChecked={
                                                                    item.checked
                                                                }
                                                            />

                                                            <span className="form-check-label">
                                                                {item.text}
                                                            </span>
                                                        </label>
                                                    )
                                                )}

                                                <div className="text-end">
                                                    <Button
                                                        type="button"
                                                        className="btn btn-sm btn-mw btn-outline btn-outline-dark"
                                                    >
                                                        <span>
                                                            Add Checklist
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                                <TaskHistory history={taskData.history} />

                                {/* Notes */}
                                <TaskNotes notes={taskData.notes} />
                                {/* Links */}
                                <TaskLinks links={taskData.links} />

                                {/* Attachments */}
                                <TaskAttachments attachments={taskData.attachments} />

                                <TaskVoiceNotes voiceNotes={taskData.voiceNotes} />
                            </div>
                        </Col>

                        {/* CENTER */}
                        <Col md={4} className="c2 p-4">
                            <AreaSelect />
                            {/* <div className="fw-bold mb-3">Priority</div> */}

                            {/* <Form.Select className="mb-4">
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </Form.Select> */}


                            <div className="separator my-3"></div>

                            <PrioritySelect
                                options={taskData.priorityOptions}
                                value={priority}
                                onChange={setPriority}
                                placeholder="Priority"
                                className="w-100"
                            />
                            <div className="separator my-3"></div>

                            <ProgressSelect
                                options={taskData.progressOptions}
                            />

                            <div className="separator my-3"></div>

                            <TeamAccordion team={taskData.team} />

                            <div className="separator my-3"></div>
                            <Tags
                                tags={taskData.tags}
                                selectedTags={selectedTags}
                                onToggle={handleToggleTag}
                            />

                            <TimeRequired
                                durations={taskData.timeRequired}
                                selected={selectedDuration}
                                onSelect={handleSelectDuration}
                            />
                        </Col>

                        {/* RIGHT SIDE */}
                        <Col md={3} className="border-start c3 p-4">
                            <div>
                                <div>
                                    {actionButtons.map((label, index) => (
                                        <Button
                                            key={index}
                                            type="button"
                                            className="btn btn-outline-dark w-100 mb-3"
                                        >
                                            {label}
                                        </Button>
                                    ))}
                                </div>

                                <Switchers
                                    items={taskData.switchers}
                                    state={switchState}
                                    onToggle={handleToggleSwitch}
                                />
                                <div className="separator my-3"></div>
                                <MirroredSections items={taskData.mirroredSections} />
                                <div>
                                    <div className="mt-2">
                                        <div className="fw-bold mb-1">
                                            Due Date
                                        </div>

                                        <div>
                                            <Form.Control
                                                type="date"
                                                className="form-control form-control-solid p-1 ps-2"
                                                defaultValue={
                                                    taskData.dueDate
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="fw-bold mb-1">
                                            Created Date
                                        </div>

                                        <div>
                                            <Form.Control
                                                type="date"
                                                className="form-control form-control-solid p-1 ps-2"
                                                defaultValue={
                                                    taskData.createdDate
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="separator my-3"></div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default TaskModal