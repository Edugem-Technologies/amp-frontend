"use client"
import DragSortableCards, { TaskCard } from "@/app/components/card/DragSortableCards"
import StatsOverviewWithChart from "@/app/components/common/StatsOverviewWithChart"
import { PIPELINE_DASHBOARD_DATA, PIPELINES_CHECKLIST } from "@/fixtures/PipelineData"
import { Fence, TaskCheckItem } from "@/types/components/DragSortableCards"
import React, { useState, useMemo } from "react"
import { DndContext, closestCenter, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { headerActions } from "@/utils/Constants"

const Page = () => {
    const [fences, setFences] = useState<Fence[]>(PIPELINES_CHECKLIST)
    const [activeItem, setActiveItem] = useState<TaskCheckItem | null>(null)

    const { header, stats, chart, upcomingPlans } = PIPELINE_DASHBOARD_DATA

    const chartData = chart.points.map((p) => ({
        label: p.weekLabel,
        value: p.value,
    }))

    // Build a flat lookup: itemId → fenceId
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
        // over.id could be an item id OR a fence/container id — handle both
        const targetFenceId = itemFenceMap[over.id as string] ?? (over.id as string)

        if (!sourceFenceId || !targetFenceId) return

        setFences((prev) => {
            const next = prev.map((f) => ({ ...f, taskCheckList: [...f.taskCheckList] }))

            const sourceFence = next.find((f) => f.id === sourceFenceId)!
            const targetFence = next.find((f) => f.id === targetFenceId)!

            if (sourceFenceId === targetFenceId) {
                // Same column — reorder
                const oldIndex = sourceFence.taskCheckList.findIndex((i) => i.id === active.id)
                const newIndex = sourceFence.taskCheckList.findIndex((i) => i.id === over.id)
                if (oldIndex === -1 || newIndex === -1) return prev
                sourceFence.taskCheckList = arrayMove(sourceFence.taskCheckList, oldIndex, newIndex)
            } else {
                // Cross column — move item
                const itemIndex = sourceFence.taskCheckList.findIndex((i) => i.id === active.id)
                if (itemIndex === -1) return prev
                const [movedItem] = sourceFence.taskCheckList.splice(itemIndex, 1)

                // Insert above the target item if it exists, otherwise append
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

    return (
        <div className="container-fluid pages notes notes-wrapper pipeline p-0 h-100">
            <div className="g-5 gx-xxl-8 h-100">
                <div className="row g-0 m-0 h-100">
                    <div className="col-12 col-sm-3 s-widgets">
                        <div>
                            <StatsOverviewWithChart
                                header={header}
                                stats={stats}
                                currency={chart.currency}
                                chartData={chartData}
                            />
                        </div>
                        <div>
                            <div className="columns3 row v-pipeline">
                                <div className="col">
                                    <div className="list">
                                        <div className="t-bar">{upcomingPlans.header.title}</div>
                                        <div className="t-bod">
                                            <div className="tasks">
                                                {upcomingPlans.items.map((item, index) => (
                                                    <div key={index} className="task hover-icons">
                                                        <div className="t-txt">
                                                            <div className="title ellipsis-1">
                                                                {item.title}
                                                            </div>
                                                            <div className="desc">
                                                                {item.subtitle}
                                                            </div>
                                                        </div>
                                                        <div className="task-actions">
                                                            <div className="p-symbols">
                                                                <div className="symbol-group symbol-hover d-inline-flex flex-nowrap pe-1">
                                                                    <div className="symbol symbol-circle symbol-40px">
                                                                        {item.users.map(
                                                                            (user, index) =>
                                                                                user.avatarUrl ? (
                                                                                    <img
                                                                                        key={index}
                                                                                        src={
                                                                                            user.avatarUrl
                                                                                        }
                                                                                        alt=""
                                                                                    />
                                                                                ) : (
                                                                                    <span
                                                                                        key={index}
                                                                                        className="avatar-fallback"
                                                                                    >
                                                                                        {
                                                                                            user.initials
                                                                                        }
                                                                                    </span>
                                                                                ),
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="num c-var">
                                                                {item.badgeCount}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-9 board-container kanban-v2">
                        <div className="board">
                            <div className="tab-people tab-pipeline">
                                {/* Single DndContext wrapping ALL columns */}
                                <DndContext
                                    collisionDetection={closestCenter}
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                >
                                    <div className="horizontal-view main-dashboard-container container-wrapper kanban-container">
                                        {fences.map((fence, index) => (
                                            <DragSortableCards
                                                key={index}
                                                id={fence.id}
                                                title={fence.label as string}
                                                items={fence.taskCheckList}
                                                actions={headerActions.filter(
                                                    (action) => action.id !== "replay",
                                                )}
                                                onChange={() => {}}
                                            />
                                        ))}
                                    </div>

                                    {/* Drag overlay renders the ghost item while dragging */}
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
            </div>
        </div>
    )
}

export default Page
