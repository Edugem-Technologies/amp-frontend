import React, { useState } from "react"
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core"
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DragColumnProps, SortItem } from "@/types/components/DragSortableCards"

const SortableItem = ({ item }: { item: SortItem }) => {
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

const DragSortableCards = ({ id, title, items, onChange, actions = [] }: DragColumnProps) => {
    const [isOpen, setIsOpen] = useState(true)
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        onChange(arrayMove(items, oldIndex, newIndex))
    }

    return (
        <div className={`fence-wrapper ${isOpen ? "expanded" : "shrink"}`}>
            <div className="fence-column">
                <div className="fence-header">
                    <span className="title">{title}</span>

                    <div className="actions">
                        <button onClick={() => setIsOpen((p) => !p)}>
                            <span className="material-symbols-outlined">
                                {isOpen ? "collapse_content" : "expand_content"}
                            </span>
                        </button>

                        {actions.map((action) => (
                            <button key={action.id} onClick={() => action.onClick(id)}>
                                <span className="material-symbols-outlined">{action.icon}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {isOpen && (
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext
                            items={items.map((i) => i.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="task-list-container">
                                {items.map((item) => (
                                    <SortableItem key={item.id} item={item} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    )
}

export default DragSortableCards
