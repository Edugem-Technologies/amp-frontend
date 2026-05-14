/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useMemo, useState } from "react"

import {
    DndContext,
    PointerSensor,
    closestCenter,
    DragOverlay,
    useDroppable,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
} from "@dnd-kit/core"

import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"
import { headerActionsv2 } from "@/utils/Constants"
import HoveredIcons from "./HoveredIcons"

type RoutineItem = {
    id: string
    label: string
    duration?: number
    count?: number
}

type TaskItem = {
    id: string
    label: string
    count?: number
    bgColor?: string
    duration?: number
}

type ColumnType = {
    id: string
    title: string
    colPosition: string
    items: TaskItem[]
}

type BoardType = {
    id: string
    dateLabel: string
    title: string
    routineData: RoutineItem[]
    columns: ColumnType[]
}

export const INITIAL_BOARDS: BoardType[] = [
    {
        id: "board-1",
        dateLabel: "Sat 27 Jul",
        title: "Splink: Sales Strategy",

        routineData: [
            { id: "rt-1", label: "Wake Up", duration: 30 },
            { id: "rt-2", label: "Gym", duration: 45 },
            { id: "rt-3", label: "Breakfast", duration: 30 },
        ],

        columns: [
            {
                id: "col-1",
                title: "Deep Work",
                colPosition: "left",

                items: [
                    {
                        id: "1",
                        label: "Sales Dashboard Review",
                        count: 120,
                    },
                    {
                        id: "2",
                        label: "Investor Pitch Slides",
                        count: 180,
                    },
                    {
                        id: "3",
                        label: "Growth Metrics Analysis",
                        count: 240,
                    },
                ],
            },

            {
                id: "col-2",
                title: "Quick Tasks",
                colPosition: "right",

                items: [
                    {
                        id: "7",
                        label: "Slack Replies",
                        count: 15,
                    },
                    {
                        id: "8",
                        label: "Website Copy Update",
                        count: 30,
                    },
                ],
            },
        ],
    },

    {
        id: "board-2",
        dateLabel: "Sun 28 Jul",
        title: "XYZ: Global Payments",

        routineData: [
            { id: "rt-9", label: "Meditation", duration: 20 },
            { id: "rt-10", label: "Coffee", duration: 20 },
        ],

        columns: [
            {
                id: "col-3",
                title: "Priority Tasks",
                colPosition: "left",

                items: [
                    {
                        id: "13",
                        label: "Recurring Payments Review",
                        count: 120,
                    },
                    {
                        id: "14",
                        label: "Stripe Integration Audit",
                        count: 90,
                    },
                ],
            },

            {
                id: "col-4",
                title: "Secondary Tasks",
                colPosition: "right",

                items: [
                    {
                        id: "18",
                        label: "Internal Team Sync",
                        count: 30,
                    },
                ],
            },
        ],
    },
]

const clone = <T,>(data: T): T => structuredClone(data)

// ─────────────────────────────────────────────
// SORTABLE TASK
// ─────────────────────────────────────────────

function SortableTask({ task }: { task: TaskItem | RoutineItem }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: task.id,
    })

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        cursor: "grab",
    }

    // const isRoutine = "duration" in task

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="task hover-icons hi-v2 c1 ui-sortable-handle"
            data-duration={task.duration || task.count}
        >
            <div>
                <span className="duration">
                    {/* {task.label} */}
                    {task.count || task.duration}
                </span>
                <span className="name">
                    <span>{task.label}</span>
                </span>
                <div className="icons">
                    <HoveredIcons />
                </div>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────
// DROPPABLE CONTAINER
// ─────────────────────────────────────────────

function DroppableContainer({ id, items }: { id: string; title: string; items: any[] }) {
    const { setNodeRef, isOver } = useDroppable({
        id,
    })

    return (
        <div ref={setNodeRef} className={`drop-zone ${isOver ? "over" : ""}`}>
            <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
            >
                {items.map((task) => (
                    <SortableTask key={task.id} task={task} />
                ))}
            </SortableContext>

            {/* // {items.length === 0 && (
            //     <div className="empty-drop">
            //         Drop Here
            //     </div>
            // )} */}
        </div>
    )
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

export default function App() {
    const [boards, setBoards] = useState(INITIAL_BOARDS)

    const [activeId, setActiveId] = useState<string | null>(null)

    const [openedRoutineBoards, setOpenedRoutineBoards] = useState<string[]>([])
    const [collapsedBoards, setCollapsedBoards] = useState<string[]>([])

    const toggleRoutine = (boardId: string) => {
        setOpenedRoutineBoards((prev) => {
            if (prev.includes(boardId)) {
                return prev.filter((id) => id !== boardId)
            }

            return [...prev, boardId]
        })
    }

    // COLLAPSE TOGGLE
    const toggleCollapse = (boardId: string) => {
        setCollapsedBoards((prev) => {
            if (prev.includes(boardId)) {
                return prev.filter((id) => id !== boardId)
            }

            return [...prev, boardId]
        })
    }
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
    )

    // ─────────────────────────────────────────────

    const allItems = useMemo(() => {
        return boards.flatMap((board) => [
            ...board.routineData,
            ...board.columns.flatMap((col) => col.items),
        ])
    }, [boards])

    const activeItem = allItems.find((item) => item.id === activeId)

    // ─────────────────────────────────────────────

    const findContainer = (id: string): string | null => {
        for (const board of boards) {
            if (`routine-${board.id}` === id) {
                return `routine-${board.id}`
            }

            if (board.routineData.some((item) => item.id === id)) {
                return `routine-${board.id}`
            }

            for (const column of board.columns) {
                if (column.id === id) {
                    return column.id
                }

                if (column.items.some((item) => item.id === id)) {
                    return column.id
                }
            }
        }

        return null
    }

    // ─────────────────────────────────────────────

    const getItems = (data: BoardType[], containerId: string) => {
        for (const board of data) {
            if (`routine-${board.id}` === containerId) {
                return board.routineData
            }

            for (const column of board.columns) {
                if (column.id === containerId) {
                    return column.items
                }
            }
        }

        return []
    }

    // ─────────────────────────────────────────────

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(String(event.active.id))
    }

    // ─────────────────────────────────────────────

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event

        if (!over) return

        const activeId = String(active.id)
        const overId = String(over.id)

        const activeContainer = findContainer(activeId)

        const overContainer = findContainer(overId)

        if (!activeContainer || !overContainer) {
            return
        }

        // SAME CONTAINER
        if (activeContainer === overContainer) {
            return
        }

        setBoards((prev) => {
            const next = clone(prev)

            const activeItems = getItems(next, activeContainer)

            const overItems = getItems(next, overContainer)

            const activeIndex = activeItems.findIndex((item) => item.id === activeId)

            const overIndex = overItems.findIndex((item) => item.id === overId)

            const [movedItem] = activeItems.splice(activeIndex, 1)

            // DROP EXACT POSITION
            const insertIndex = overIndex >= 0 ? overIndex : overItems.length

            overItems.splice(insertIndex, 0, movedItem)

            return next
        })
    }

    // ─────────────────────────────────────────────

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        setActiveId(null)

        if (!over) return

        const activeId = String(active.id)
        const overId = String(over.id)

        const activeContainer = findContainer(activeId)

        const overContainer = findContainer(overId)

        if (!activeContainer || !overContainer) {
            return
        }

        // SAME CONTAINER SORT
        if (activeContainer === overContainer) {
            setBoards((prev) => {
                const next = clone(prev)

                const items = getItems(next, activeContainer)

                const oldIndex = items.findIndex((item) => item.id === activeId)

                const newIndex = items.findIndex((item) => item.id === overId)

                if (oldIndex !== -1 && newIndex !== -1) {
                    const reordered = arrayMove(items, oldIndex, newIndex)

                    for (const board of next) {
                        if (`routine-${board.id}` === activeContainer) {
                            board.routineData = reordered as RoutineItem[]
                        }

                        for (const column of board.columns) {
                            if (column.id === activeContainer) {
                                column.items = reordered as TaskItem[]
                            }
                        }
                    }
                }

                return next
            })
        }
    }

    const order = ["replay", "expand", "add"]

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            {boards.map((board) => {
                const isRoutineOpen = openedRoutineBoards.includes(board.id)

                const isCollapsed = collapsedBoards.includes(board.id)

                return (
                    <div
                        key={board.id}
                        className={`
        list
        ${isRoutineOpen ? "show-routine-list" : ""}
        ${isCollapsed ? "collapsed" : ""}
    `}
                    >
                        <div className="t-bar">
                            <div className="date">
                                {board.dateLabel}
                                <small className="name">{board.title}</small>
                            </div>
                            <div className="actions">
                                {order.map((id) => {
                                    const action = headerActionsv2.find((a) => a.id === id)

                                    if (!action || action.id === "settings") {
                                        return null
                                    }

                                    // collapse state me sirf expand button dikhao
                                    if (isCollapsed && action.id !== "expand") {
                                        return null
                                    }

                                    return (
                                        <button
                                            key={action.id}
                                            type="button"
                                            className={`btn btn-icon btn-sm ${action.className} ${
                                                action.id === "expand" && isCollapsed
                                                    ? "expand"
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                if (action.id === "replay") {
                                                    toggleRoutine(board.id)
                                                }

                                                if (action.id === "expand") {
                                                    toggleCollapse(board.id)
                                                }
                                            }}
                                        >
                                            {action.type === "material" ? (
                                                <span className="material-symbols-outlined">
                                                    {action.id === "expand"
                                                        ? isCollapsed
                                                            ? "expand_content"
                                                            : "collapse_content"
                                                        : action.icon}
                                                </span>
                                            ) : (
                                                <span className="material-icons">add</span>
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="t-bod">
                            {/* ROUTINE */}

                            <div className={`routine-wrapper ${isRoutineOpen ? "open" : "close"}`}>
                                <div className={`r-tasks sortable ui-sortable`}>
                                    <DroppableContainer
                                        id={`routine-${board.id}`}
                                        title="Routine"
                                        items={board.routineData}
                                    />
                                </div>
                            </div>

                            {/* COLUMNS */}

                            <div className="dl-row">
                                {board.columns.map((column, index) => (
                                    <div
                                        key={column.id}
                                        className={`column-wrapper ${
                                            index === 0
                                                ? "d-cal sortable ui-sortable "
                                                : "l-tasks sortable ui-sortable "
                                        }`}
                                    >
                                        <DroppableContainer
                                            id={column.id}
                                            title={column.title}
                                            items={column.items}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            })}

            <DragOverlay>
                {activeItem ? (
                    <div className="drag-overlay">
                        <div
                            className="task hover-icons hi-v2 c1 ui-sortable-handle"
                            data-duration={
                                "duration" in activeItem ? activeItem.duration : activeItem.count
                            }
                        >
                            <div>
                                <span className="duration">
                                    {"duration" in activeItem
                                        ? activeItem.duration
                                        : activeItem.count}
                                </span>

                                <span className="name">
                                    <span>{activeItem.label}</span>
                                </span>

                                <div className="icons">
                                    <HoveredIcons />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}
