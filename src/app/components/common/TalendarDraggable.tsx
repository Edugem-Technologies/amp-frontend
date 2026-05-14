/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useMemo, useState } from "react"

import {
    closestCorners,
    pointerWithin,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useDroppable,
    useSensor,
    useSensors,
    CollisionDetection,
} from "@dnd-kit/core"

import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"
import { INITIAL_BOARDS } from "@/fixtures/TalendarData"
import HoveredIcons from "./HoveredIcons"
import { headerActions } from "@/utils/Constants"

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

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Returns a deep clone of boards using structuredClone */
const clone = <T,>(v: T): T => structuredClone(v)

/**
 * Locate a task by id across ALL boards, ALL columns + routines.
 * Returns { boardIdx, containerId, itemIndex }
 * containerId = column.id  OR  `routine-${board.id}`
 */
function findItem(
    boards: BoardType[],
    taskId: string,
): { boardIdx: number; containerId: string; itemIndex: number } | null {
    for (let bi = 0; bi < boards.length; bi++) {
        const board = boards[bi]
        // check routine
        const ri = board.routineData.findIndex((r: any) => r.id === taskId)
        if (ri !== -1) {
            return { boardIdx: bi, containerId: `routine-${board.id}`, itemIndex: ri }
        }
        // check columns
        for (const col of board.columns) {
            const ci = col.items.findIndex((item) => item.id === taskId)
            if (ci !== -1) {
                return { boardIdx: bi, containerId: col.id, itemIndex: ci }
            }
        }
    }
    return null
}

function getContainer(
    boards: BoardType[],
    containerId: string,
): { items: any[]; isRoutine: boolean } | null {
    // routine container
    if (containerId.startsWith("routine-")) {
        const boardId = containerId.slice("routine-".length)
        const board = boards.find((b) => b.id === boardId)
        if (!board) return null
        return { items: board.routineData, isRoutine: true }
    }
    // column container
    for (const board of boards) {
        const col = board.columns.find((c) => c.id === containerId)
        if (col) return { items: col.items, isRoutine: false }
    }
    return null
}

/**
 * Convert a raw routineData entry → Task shape (for drag overlay / column rendering).
 */
function routineToTask(r: any): Task {
    return { id: r.id, label: r.label, count: r.duration }
}

/**
 * Convert a Task → routineData entry shape.
 */
// function taskToRoutine(t: Task): any {
//     return { id: t.id, label: t.label, duration: t.count }
// }

// ─── sub-components ───────────────────────────────────────────────────────────

const TaskCard = ({ item, dragging = false }: { item: Task; dragging?: boolean }) => {
    return (
        <div className={dragging ? "dragging" : ""}>
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
    const { setNodeRef, isOver } = useDroppable({ id: column.id })

    const isEmpty = column.items.length === 0

    return (
        <div
            ref={setNodeRef}
            className={`${className} ${isOver ? "column-over" : ""}`}
            style={isEmpty ? { minHeight: "80px" } : undefined}
        >
            {children}
            {isEmpty && (
                <div
                    className="empty-column"
                    style={{
                        minHeight: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    Drop Here
                </div>
            )}
        </div>
    )
}

// ─── collision detection ──────────────────────────────────────────────────────
// pointerWithin first (exact hit on any droppable the pointer is inside),
// then closestCorners as fallback. This ensures the routine container is
// detected as soon as the pointer enters it, regardless of drag direction.
const customCollision: CollisionDetection = (args) => {
    const pointerHits = pointerWithin(args)
    if (pointerHits.length > 0) return pointerHits
    return closestCorners(args)
}

// ─── main component ───────────────────────────────────────────────────────────

const TalendarDraggable = () => {
    const [boards, setBoards] = useState<BoardType[]>(INITIAL_BOARDS)
    const [activeTask, setActiveTask] = useState<Task | null>(null)
    const [openedRoutineBoards, setOpenedRoutineBoards] = useState<string[]>([])
    const [collapsedBoards, setCollapsedBoards] = useState<string[]>([])

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 3 } }))

    // Flat list of all tasks (routine + columns) for overlay lookup
    const allTasks = useMemo<Task[]>(() => {
        return boards.flatMap((board) => [
            ...board.routineData.map(routineToTask),
            ...board.columns.flatMap((col) => col.items),
        ])
    }, [boards])

    // ── drag start ────────────────────────────────────────────────────────────
    const handleDragStart = (event: DragStartEvent) => {
        const task = allTasks.find((t) => t.id === String(event.active.id))
        if (task) setActiveTask(task)
    }

    // ── drag over (live reorder while hovering) ───────────────────────────────
    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        if (!over) return

        const activeId = String(active.id)
        const overId = String(over.id)
        if (activeId === overId) return

        setBoards((prev) => {
            const next = clone(prev)

            const srcInfo = findItem(next, activeId)
            if (!srcInfo) return prev

            // Determine target container id:
            // Either overId is a container id (column or routine-*) OR it's a task id
            let targetContainerId: string | null = null

            // Check if overId is a container
            if (overId.startsWith("routine-")) {
                targetContainerId = overId
            } else {
                // Is it a column id?
                let isCol = false
                for (const b of next) {
                    if (b.columns.some((c) => c.id === overId)) {
                        isCol = true
                        targetContainerId = overId
                        break
                    }
                }
                if (!isCol) {
                    // It's a task id — find which container it belongs to
                    const overInfo = findItem(next, overId)
                    if (overInfo) targetContainerId = overInfo.containerId
                }
            }

            if (!targetContainerId) return prev
            if (srcInfo.containerId === targetContainerId) return prev // same container, handled in dragEnd

            // Pull item out of source
            const srcContainer = getContainer(next, srcInfo.containerId)
            if (!srcContainer) return prev
            const [movedRaw] = srcContainer.items.splice(srcInfo.itemIndex, 1)

            // Adapt shape if crossing routine ↔ column boundary
            const srcIsRoutine = srcInfo.containerId.startsWith("routine-")
            const tgtIsRoutine = targetContainerId.startsWith("routine-")

            let movedItem: any = movedRaw
            if (srcIsRoutine && !tgtIsRoutine) {
                // routine entry → Task
                movedItem = { id: movedRaw.id, label: movedRaw.label, count: movedRaw.duration }
            } else if (!srcIsRoutine && tgtIsRoutine) {
                // Task → routine entry
                movedItem = { id: movedRaw.id, label: movedRaw.label, duration: movedRaw.count }
            }

            // Insert into target container
            const tgtContainer = getContainer(next, targetContainerId)
            if (!tgtContainer) return prev

            // Try to place before the over item if over is a task in the target container
            const overTaskIdx = tgtContainer.items.findIndex((i: any) => i.id === overId)
            if (overTaskIdx !== -1) {
                tgtContainer.items.splice(overTaskIdx, 0, movedItem)
            } else {
                tgtContainer.items.push(movedItem)
            }

            return next
        })
    }

    // ── drag end (finalise position within same container) ────────────────────
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        setActiveTask(null)
        if (!over) return

        const activeId = String(active.id)
        const overId = String(over.id)
        if (activeId === overId) return

        setBoards((prev) => {
            const next = clone(prev)

            const srcInfo = findItem(next, activeId)
            if (!srcInfo) return prev

            // Confirm they're in the same container (cross-container already handled in dragOver)
            const overInfo = findItem(next, overId)
            if (!overInfo) return prev
            if (srcInfo.containerId !== overInfo.containerId) return prev

            // Reorder within same container
            const container = getContainer(next, srcInfo.containerId)
            if (!container) return prev

            const fromIdx = container.items.findIndex((i: any) => i.id === activeId)
            const toIdx = container.items.findIndex((i: any) => i.id === overId)
            if (fromIdx === -1 || toIdx === -1) return prev

            const [moved] = container.items.splice(fromIdx, 1)
            container.items.splice(toIdx, 0, moved)

            return next
        })
    }

    // ── UI helpers ────────────────────────────────────────────────────────────
    const toggleRoutine = (boardId: string) => {
        setOpenedRoutineBoards((prev) =>
            prev.includes(boardId) ? prev.filter((id) => id !== boardId) : [...prev, boardId],
        )
    }

    const toggleCollapse = (boardId: string) => {
        setCollapsedBoards((prev) =>
            prev.includes(boardId) ? prev.filter((id) => id !== boardId) : [...prev, boardId],
        )
    }

    const actionOrder = ["replay", "expand", "add"]

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={customCollision}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                {boards.map((board) => {
                    const isRoutineOpen = openedRoutineBoards.includes(board.id)
                    const isCollapsed = collapsedBoards.includes(board.id)

                    // Build a ColumnType-shaped wrapper for the routine droppable
                    const routineColumn: ColumnType = {
                        id: `routine-${board.id}`,
                        title: "Routine",
                        items: board.routineData.map(routineToTask),
                    }

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
                                    {headerActions
                                        .filter((action) => actionOrder.includes(action.id))
                                        .sort(
                                            (a, b) =>
                                                actionOrder.indexOf(a.id) -
                                                actionOrder.indexOf(b.id),
                                        )
                                        .map((action) => {
                                            if (isCollapsed && action.id !== "expand") return null

                                            return (
                                                <button
                                                    key={action.id}
                                                    className={`btn btn-icon btn-sm ${
                                                        action.id === "expand"
                                                            ? isCollapsed
                                                                ? "expand"
                                                                : "collapse"
                                                            : ""
                                                    }`}
                                                    onClick={() => {
                                                        if (action.id === "replay")
                                                            toggleRoutine(board.id)
                                                        if (action.id === "expand")
                                                            toggleCollapse(board.id)
                                                    }}
                                                >
                                                    {action.type === "line-awesome" ? (
                                                        <i className={action.icon}></i>
                                                    ) : (
                                                        <span className="material-symbols-outlined">
                                                            {action.id === "expand"
                                                                ? isCollapsed
                                                                    ? "expand_content"
                                                                    : "collapse_content"
                                                                : action.icon}
                                                        </span>
                                                    )}
                                                </button>
                                            )
                                        })}
                                </div>
                            </div>

                            <div
                                className="t-bod"
                                style={{ display: isCollapsed ? "none" : "block" }}
                            >
                                {/* ROUTINE LIST */}
                                <div
                                    className={`routine-wrapper ${
                                        isRoutineOpen ? "open" : "close"
                                    }`}
                                >
                                    <DroppableColumn
                                        column={routineColumn}
                                        className="r-tasks sortable ui-sortable"
                                    >
                                        <SortableContext
                                            items={board.routineData.map((r: any) => r.id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            {board.routineData.map((routine: any) => (
                                                <SortableTask
                                                    key={routine.id}
                                                    item={routineToTask(routine)}
                                                />
                                            ))}
                                        </SortableContext>
                                    </DroppableColumn>
                                </div>

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
                            style={{ width: "100%", cursor: "grabbing", boxSizing: "border-box" }}
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
