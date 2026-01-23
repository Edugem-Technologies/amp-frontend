import React, { useState } from "react"
import { Fence } from "@/fixtures/GlobalData"
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core"
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const SortableTask = ({ item }: { item: { id: string; label: string } }) => {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
        id: item.id,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="task-check-item item-label"
        >
            {item.label}
        </div>
    )
}

const HorizontalView = ({ data }: { data: Fence[] }) => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({})
    const [fences, setFences] = useState<Fence[]>(data)

    const toggleExpand = (id: string) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleDragEnd = (fenceId: string, event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        setFences((prev) =>
            prev.map((fence) => {
                if (fence.id !== fenceId) return fence

                const oldIndex = fence.taskCheckList.findIndex((item) => item.id === active.id)

                const newIndex = fence.taskCheckList.findIndex((item) => item.id === over.id)

                return {
                    ...fence,
                    taskCheckList: arrayMove(fence.taskCheckList, oldIndex, newIndex),
                }
            }),
        )
    }

    return (
        <div className="d-flex gap-4 horizontal-view">
            {fences.map((fence) => {
                const isOpen = expanded[fence.id] ?? true

                return (
                    <div
                        key={fence.id}
                        className={`fence-wrapper ${isOpen ? "expanded" : "shrink"}`}
                    >
                        <div className="fence-column">
                            <div className="fence-header">
                                <span className="title">{fence.label}</span>

                                <div className="actions">
                                    <button onClick={() => toggleExpand(fence.id)}>
                                        <span className="material-symbols-outlined">
                                            {isOpen ? "collapse_content" : "expand_content"}
                                        </span>
                                    </button>

                                    <button>
                                        <span className="material-symbols-outlined">add</span>
                                    </button>
                                </div>
                            </div>
                            <div className="kanban-drag">
                                <DndContext
                                    collisionDetection={closestCenter}
                                    onDragEnd={(e) => handleDragEnd(fence.id, e)}
                                >
                                    <SortableContext
                                        items={fence.taskCheckList.map((item) => item.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        <div className="task-list-container">
                                            {fence.taskCheckList.map((item) => (
                                                <SortableTask key={item.id} item={item} />
                                            ))}
                                        </div>
                                    </SortableContext>
                                </DndContext>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default HorizontalView
