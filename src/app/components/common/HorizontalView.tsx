"use client"

import React, { useMemo, useState } from "react"
import DragSortableCards, { TaskCard } from "../card/DragSortableCards"
import { Fence, TaskCheckItem } from "@/types/components/DragSortableCards"

import { DndContext, closestCenter, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"

import { arrayMove } from "@dnd-kit/sortable"
import { HeaderActionsTypes } from "@/types/components/HeaderActions"
import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core"

const HorizontalView = ({
    data,
    headerActions,
}: {
    data: Fence[]
    headerActions?: HeaderActionsTypes[]
}) => {
    const [fences, setFences] = useState<Fence[]>(data)

    const [activeItem, setActiveItem] = useState<TaskCheckItem | null>(null)
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    )
    // itemId -> fenceId
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

        // over.id can be item id OR fence id
        const targetFenceId = itemFenceMap[over.id as string] ?? (over.id as string)

        if (!sourceFenceId || !targetFenceId) return

        setFences((prev) => {
            const next = prev.map((f) => ({
                ...f,
                taskCheckList: [...f.taskCheckList],
            }))

            const sourceFence = next.find((f) => f.id === sourceFenceId)!

            const targetFence = next.find((f) => f.id === targetFenceId)!

            // SAME COLUMN
            if (sourceFenceId === targetFenceId) {
                const oldIndex = sourceFence.taskCheckList.findIndex((i) => i.id === active.id)

                const newIndex = sourceFence.taskCheckList.findIndex((i) => i.id === over.id)

                if (oldIndex === -1 || newIndex === -1) return prev

                sourceFence.taskCheckList = arrayMove(sourceFence.taskCheckList, oldIndex, newIndex)
            } else {
                // MOVE BETWEEN COLUMNS
                const itemIndex = sourceFence.taskCheckList.findIndex((i) => i.id === active.id)

                if (itemIndex === -1) return prev

                const [movedItem] = sourceFence.taskCheckList.splice(itemIndex, 1)

                const overIndex = targetFence.taskCheckList.findIndex((i) => i.id === over.id)

                // empty column
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
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            {fences.map((fence) => (
                <DragSortableCards
                    key={fence.id}
                    id={fence.id}
                    title={fence.label as string}
                    items={fence.taskCheckList}
                    actions={headerActions}
                    onChange={() => {}}
                />
            ))}

            <DragOverlay>
                {activeItem ? <TaskCard item={activeItem} isDragging /> : null}
            </DragOverlay>
        </DndContext>
    )
}

export default HorizontalView
