"use client"

import DragSortableCards, { TaskCard } from "@/app/components/card/DragSortableCards"
import TaskTableView from "@/app/components/common/TaskTableView"
import { useAppContext } from "@/app/context/AppContext"
import { TASK_SECTIONS, TEAM_TASKS } from "@/fixtures/TeamData"
import { Fence, TaskCheckItem } from "@/types/components/DragSortableCards"
import { CONFIG, headerActions } from "@/utils/Constants"
import React, { useEffect, useState, useMemo } from "react"

import { DndContext, closestCenter, DragEndEvent, DragStartEvent, DragOverlay } from "@dnd-kit/core"

import { arrayMove } from "@dnd-kit/sortable"

const Page = () => {
    const [fences, setFences] = useState<Fence[]>(TEAM_TASKS)
    const [activeItem, setActiveItem] = useState<TaskCheckItem | null>(null)

    const { layout, setLayout } = useAppContext()

    const updateFenceItems = (fenceId: string, items: TaskCheckItem[]) => {
        setFences((prev) =>
            prev.map((f) => (f.id === fenceId ? { ...f, taskCheckList: items } : f)),
        )
    }

    const itemFenceMap = useMemo(() => {
        const map: Record<string, string> = {}
        fences.forEach((fence) => {
            fence.taskCheckList.forEach((item) => {
                map[item.id] = fence.id
            })
        })
        return map
    }, [fences])

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        const sourceFenceId = itemFenceMap[active.id as string]

        const sourceFence = fences.find((f) => f.id === sourceFenceId)
        const item = sourceFence?.taskCheckList.find((i) => i.id === active.id)

        setActiveItem(item ?? null)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        setActiveItem(null)

        if (!over || active.id === over.id) return

        const sourceFenceId = itemFenceMap[active.id as string]
        const targetFenceId = itemFenceMap[over.id as string] ?? (over.id as string)

        if (!sourceFenceId || !targetFenceId) return

        setFences((prev) => {
            const next = prev.map((f) => ({
                ...f,
                taskCheckList: [...f.taskCheckList],
            }))

            const sourceFence = next.find((f) => f.id === sourceFenceId)!
            const targetFence = next.find((f) => f.id === targetFenceId)!

            if (sourceFenceId === targetFenceId) {
                const oldIndex = sourceFence.taskCheckList.findIndex((i) => i.id === active.id)
                const newIndex = sourceFence.taskCheckList.findIndex((i) => i.id === over.id)

                if (oldIndex === -1 || newIndex === -1) return prev

                sourceFence.taskCheckList = arrayMove(sourceFence.taskCheckList, oldIndex, newIndex)
            } else {
                const itemIndex = sourceFence.taskCheckList.findIndex((i) => i.id === active.id)

                if (itemIndex === -1) return prev

                const [movedItem] = sourceFence.taskCheckList.splice(itemIndex, 1)

                const overIndex = targetFence.taskCheckList.findIndex((i) => i.id === over.id)

                if (overIndex === -1) {
                    targetFence.taskCheckList.push(movedItem)
                } else {
                    targetFence.taskCheckList.splice(overIndex, 0, movedItem)
                }
            }

            return next
        })
    }

    useEffect(() => {
        setLayout && setLayout(CONFIG.LAYOUT.COLUMNS)
    }, [])

    return (
        <div className="content d-flex flex-column flex-column-fluid pb-0">
            <div className="post d-flex flex-column-fluid">
                <div className="container-fluid p-0">
                    <div className="g-5 gx-xxl-8">
                        <div className="tab-content text-start">
                            <div className="text-left">
                                <div className="board-container kanban-v2">
                                    <div className="board">
                                        <div className="tab-people">
                                            <DndContext
                                                collisionDetection={closestCenter}
                                                onDragStart={handleDragStart}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <div className="kanban-container">
                                                    {layout === CONFIG.LAYOUT.COLUMNS &&
                                                        fences.map((fence, index) => (
                                                            <DragSortableCards
                                                                key={index}
                                                                id={fence.id}
                                                                userImage={fence.userImage}
                                                                title={fence.userName as string}
                                                                items={fence.taskCheckList}
                                                                onChange={(items) =>
                                                                    updateFenceItems(
                                                                        fence.id,
                                                                        items as TaskCheckItem[],
                                                                    )
                                                                }
                                                                actions={headerActions.filter(
                                                                    (action) =>
                                                                        action.id !== "replay",
                                                                )}
                                                            />
                                                        ))}
                                                </div>

                                                <DragOverlay>
                                                    {activeItem ? (
                                                        <TaskCard item={activeItem} isDragging />
                                                    ) : null}
                                                </DragOverlay>
                                            </DndContext>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* TABLE VIEW */}
                            <div className="px-30px px-25">
                                <div className="card card-xl-stretch mb-5 mb-xl-8 table-v1">
                                    {layout === CONFIG.LAYOUT.TABLE && (
                                        <div className="team-task-table card-body py-3">
                                            <TaskTableView
                                                sections={TASK_SECTIONS}
                                                tableWClassName="gy-1"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
