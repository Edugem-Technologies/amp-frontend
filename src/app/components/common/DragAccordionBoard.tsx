"use client"

import React, { useState } from "react"
import Accordion from "react-bootstrap/Accordion"

import {
    DndContext,
    closestCenter,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
    useDroppable,
} from "@dnd-kit/core"

import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"

export type User = {
    id: string
    avatarUrl: string
    name?: string
}

export type Task = {
    id: string
    title: string
    subtitle: string
    users?: User[]
}

export type Column = {
    id: string
    title: string
    tasks: Task[]
}

export type Section = {
    id: string
    title: string
    columns: Column[]
}

export type Props = {
    data: Section[]
}

function TaskCard({ task }: { task: Task }) {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: task.id,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        cursor: "grab",
    }

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className="task-check-item"
        >
            {/* <div className="fw-semibold">{task.title}</div>
            <div className="text-muted small">{task.subtitle}</div> */}

            <div className="hovered-icons">
                <a href="" className="btn btn-icon btn-sm delete" title="Delete">
                    <span className="material-symbols-outlined">delete</span>
                </a>

                <a href="" className="btn btn-icon btn-sm favorite" title="Favourite">
                    <span className="material-symbols-outlined">star</span>
                </a>

                <a href="" className="btn btn-icon btn-sm request" title="Request">
                    <span className="material-symbols-outlined">bolt</span>
                </a>

                <a href="" className="btn btn-icon btn-sm complete" title="Complete">
                    <span className="material-symbols-outlined">check</span>
                </a>
            </div>
            <div className="task-content">
                <h5 className="mb-0">{task.title}</h5>
                <p className="mb-0">{task.subtitle}</p>
            </div>

            <div className="task-meta">
                <div className="task-avatars">
                    {task?.users?.map((user, index) => (
                        <img key={index} src={user.avatarUrl} alt={user.name} />
                    ))}
                </div>
                {task?.users?.length && <span className="task-badge">{task?.users?.length}</span>}{" "}
            </div>
        </div>
    )
}

function ColumnComponent({ column }: { column: Column }) {
    const { setNodeRef } = useDroppable({
        id: column.id,
    })

    return (
        <div className="task-list-container">
            <SortableContext
                items={column.tasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
            >
                <div
                    ref={setNodeRef}
                    style={{ minHeight: 50 }}
                    className="d-flex flex-column gap-2"
                >
                    {column.tasks.map((task, index) => (
                        <TaskCard key={index} task={task} />
                    ))}
                </div>
            </SortableContext>
        </div>
    )
}

export default function DragAccordionBoard({ data }: Props) {
    const [sections, setSections] = useState(data)
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    function findTask(taskId: string) {
        for (const section of sections)
            for (const column of section.columns)
                for (const task of column.tasks) if (task.id === taskId) return task

        return null
    }

    function handleDragStart(event: DragStartEvent) {
        const task = findTask(event.active.id as string)
        if (task) setActiveTask(task)
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        setActiveTask(null)

        if (!over) return

        const activeId = active.id as string
        const overId = over.id as string

        let fromSectionIndex = -1
        let toSectionIndex = -1
        let fromColIndex = -1
        let toColIndex = -1
        let fromTaskIndex = -1
        let toTaskIndex = -1

        sections.forEach((section, sIndex) => {
            section.columns.forEach((col, cIndex) => {
                const taskIndex = col.tasks.findIndex((t) => t.id === activeId)
                if (taskIndex !== -1) {
                    fromSectionIndex = sIndex
                    fromColIndex = cIndex
                    fromTaskIndex = taskIndex
                }

                const overIndex = col.tasks.findIndex((t) => t.id === overId)
                if (overIndex !== -1) {
                    toSectionIndex = sIndex
                    toColIndex = cIndex
                    toTaskIndex = overIndex
                }

                if (col.id === overId) {
                    toSectionIndex = sIndex
                    toColIndex = cIndex
                    toTaskIndex = col.tasks.length
                }
            })
        })

        if (fromSectionIndex === -1 || toSectionIndex === -1) return

        const newSections = [...sections]

        const fromTasks = newSections[fromSectionIndex].columns[fromColIndex].tasks

        const toTasks = newSections[toSectionIndex].columns[toColIndex].tasks

        const [movedTask] = fromTasks.splice(fromTaskIndex, 1)

        toTasks.splice(toTaskIndex, 0, movedTask)

        setSections(newSections)
    }

    return (
        <div className="table-v1">
            <table className="table table-row-gray-300 main align-middle mb-0">
                <thead>
                    <tr className="partition type-2">
                        {sections[0].columns.map((item, index) => (
                            <th key={index}>
                                <div>
                                    {item.title}
                                    <button
                                        className="btn btn-icon btn-sm btn-bg-light add-new-task"
                                        data-bs-toggle="tooltip"
                                        title="Add New Task"
                                    >
                                        <span className="material-symbols-outlined">add</span>
                                    </button>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
            </table>
            <div className="scrollable-table">
                <table className="table table-row-gray-300 main align-middle mb-0">
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <Accordion defaultActiveKey="0" alwaysOpen>
                            {sections.map((section, index) => (
                                <Accordion.Item eventKey={String(index)} key={section.id}>
                                    <Accordion.Header>{section.title}</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="d-flex gap-2">
                                            {section.columns.map((column) => (
                                                <ColumnComponent key={column.id} column={column} />
                                            ))}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>

                        {activeTask && (
                            <div className="task-list-container">
                                <DragOverlay>
                                    <div className="task-check-item">
                                        <div className="task-content">
                                            <h5 className="mb-0">{activeTask.title}</h5>
                                            <p className="mb-0">{activeTask.subtitle}</p>
                                        </div>

                                        <div className="task-meta">
                                            <div className="task-avatars">
                                                {activeTask?.users?.map((user, index) => (
                                                    <img
                                                        key={index}
                                                        src={user.avatarUrl}
                                                        alt={user.name}
                                                    />
                                                ))}
                                            </div>

                                            {activeTask?.users?.length &&
                                                activeTask?.users?.length > 0 && (
                                                    <span className="task-badge">
                                                        {activeTask?.users?.length}
                                                    </span>
                                                )}
                                        </div>
                                    </div>
                                </DragOverlay>
                            </div>
                        )}
                    </DndContext>
                </table>
            </div>
        </div>
    )
}
