/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useMemo, useState } from "react"

import {
    closestCorners,
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useDroppable,
    useSensor,
    useSensors,
} from "@dnd-kit/core"

import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"
import { INITIAL_BOARDS } from "@/fixtures/TalendarData"
import HoveredIcons from "./HoveredIcons"

type Task = {
    id: string
    label: string
    count: number
    bgColor?: string
    status?: string
    isStriked?: boolean
}

type ColumnType = {
    id: string
    title: string
    colPosition?: string
    items: Task[]
}

type BoardType = {
    id: string
    dateLabel: string
    title: string
    columns: ColumnType[]
    routineData: any
}

const TaskCard = ({ item, dragging = false }: { item: Task; dragging?: boolean }) => {
    return (
        <div className={`${dragging ? "dragging" : ""}`}>
            <span className="duration">{item.count}</span>

            <span className="name">
                <span>{item.label}</span>
            </span>

            <HoveredIcons />
        </div>
    )
}

const SortableTask = ({ item }: { item: Task }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: item.id,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            data-duration={item.count}
            className="task hover-icons hi-v2 c1 ui-sortable-handle"
        >
            <TaskCard item={item} />
        </div>
    )
}

const DroppableColumn = ({
    column,
    children,
    className = "",
}: {
    column: ColumnType
    children: React.ReactNode
    className?: string
}) => {
    const { setNodeRef, isOver } = useDroppable({
        id: column.id,
    })

    return (
        <div ref={setNodeRef} className={`${className} ${isOver ? "column-over" : ""}`}>
            {children}

            {column.items.length === 0 && <div className="empty-column">Drop Here</div>}
        </div>
    )
}

const TalendarDraggable = () => {
    const [boards, setBoards] = useState<BoardType[]>(INITIAL_BOARDS)

    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const [openedRoutineBoards, setOpenedRoutineBoards] = useState<string[]>([])

    // COLLAPSE STATE
    const [collapsedBoards, setCollapsedBoards] = useState<string[]>([])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
    )

    const allItems = useMemo(() => {
        return boards.flatMap((board) => board.columns.flatMap((col) => col.items))
    }, [boards])

    const findTaskLocation = (taskId: string) => {
        for (const board of boards) {
            for (const column of board.columns) {
                const itemIndex = column.items.findIndex((item) => item.id === taskId)

                if (itemIndex !== -1) {
                    return {
                        boardId: board.id,
                        columnId: column.id,
                        itemIndex,
                    }
                }
            }
        }

        return null
    }

    const handleDragStart = (event: DragStartEvent) => {
        const task = allItems.find((item) => item.id === String(event.active.id))

        if (task) {
            setActiveTask(task)
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        setActiveTask(null)

        if (!over) return

        const activeId = String(active.id)
        const overId = String(over.id)

        if (activeId === overId) return

        const activeLocation = findTaskLocation(activeId)

        if (!activeLocation) return

        setBoards((prevBoards) => {
            const cloned = structuredClone(prevBoards)

            let sourceColumn: any = null

            let targetColumn: any = null

            cloned.forEach((board) => {
                board.columns.forEach((column) => {
                    if (column.id === activeLocation.columnId) {
                        sourceColumn = column
                    }

                    if (column.id === overId) {
                        targetColumn = column
                    }

                    const hasTask = column.items.some((item) => item.id === overId)

                    if (hasTask) {
                        targetColumn = column
                    }
                })
            })

            if (!sourceColumn || !targetColumn) {
                return prevBoards
            }

            const sourceIndex = sourceColumn.items.findIndex((item: any) => item.id === activeId)

            if (sourceIndex === -1) {
                return prevBoards
            }

            const [movedItem] = sourceColumn.items.splice(sourceIndex, 1)

            const targetIndex = targetColumn.items.findIndex((item: any) => item.id === overId)

            if (targetIndex === -1) {
                targetColumn.items.push(movedItem)
            } else {
                targetColumn.items.splice(targetIndex, 0, movedItem)
            }

            return cloned
        })
    }

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

    const headerActions = [
        {
            id: "replay",
            icon: "replay",
            className: "routine",
        },
        {
            id: "expand",
            icon: "collapse_content",
            className: "collapse",
        },
        {
            id: "add",
            icon: "add",
            className: "add",
        },
    ]

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                {boards.map((board) => {
                    const isRoutineOpen = openedRoutineBoards.includes(board.id)

                    const isCollapsed = collapsedBoards.includes(board.id)

                    return (
                        <div
                            key={board.id}
                            className={`list ${isRoutineOpen ? "show-routine-list" : ""} ${
                                isCollapsed ? "collapsed" : ""
                            }`}
                        >
                            <div className="t-bar">
                                <div className="date">
                                    {board.dateLabel}

                                    <small className="name">{board.title}</small>
                                </div>

                                <div className="actions">
                                    {headerActions.map((action) => {
                                        // COLLAPSED => ONLY EXPAND BUTTON
                                        if (isCollapsed && action.id !== "expand") {
                                            return null
                                        }

                                        return (
                                            <button
                                                key={action.id}
                                                className={`btn btn-icon btn-sm ${
                                                    action.id === "expand"
                                                        ? isCollapsed
                                                            ? "expand"
                                                            : "collapse"
                                                        : action.className
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
                                                <span className="material-symbols-outlined">
                                                    {action.id === "expand"
                                                        ? isCollapsed
                                                            ? "expand_content"
                                                            : "collapse_content"
                                                        : action.icon}
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div
                                className="t-bod"
                                style={{
                                    display: isCollapsed ? "none" : "block",
                                }}
                            >
                                {/* ROUTINE LIST */}
                                {isRoutineOpen && (
                                    <DroppableColumn
                                        column={{
                                            id: `routine-${board.id}`,
                                            title: "Routine",
                                            items: board.routineData.map((r: any) => ({
                                                id: r.id,
                                                label: r.label,
                                                count: r.duration,
                                            })),
                                        }}
                                        className="r-tasks sortable ui-sortable"
                                    >
                                        <SortableContext
                                            items={board.routineData.map(
                                                (routine: any) => routine.id,
                                            )}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            {board.routineData.map((routine: any) => (
                                                <SortableTask
                                                    key={routine.id}
                                                    item={{
                                                        id: routine.id,
                                                        label: routine.label,
                                                        count: routine.duration,
                                                    }}
                                                />
                                            ))}
                                        </SortableContext>
                                    </DroppableColumn>
                                )}

                                <div className="dl-row">
                                    {board.columns.map((column) => (
                                        <DroppableColumn
                                            key={column.id}
                                            column={column}
                                            className={
                                                column.colPosition === "left"
                                                    ? "d-cal sortable ui-sortable"
                                                    : "l-tasks sortable ui-sortable"
                                            }
                                        >
                                            <SortableContext
                                                items={column.items.map((item) => item.id)}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                {column.items.map((item) => (
                                                    <SortableTask key={item.id} item={item} />
                                                ))}
                                            </SortableContext>
                                        </DroppableColumn>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                })}

                <DragOverlay>
                    {activeTask ? (
                        <div
                            data-duration={activeTask.count}
                            className="task hover-icons hi-v2 c1 ui-sortable-handle"
                            style={{
                                width: "100%",
                                cursor: "grabbing",
                                boxSizing: "border-box",
                            }}
                        >
                            <TaskCard item={activeTask} dragging />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    )
}

export default TalendarDraggable
