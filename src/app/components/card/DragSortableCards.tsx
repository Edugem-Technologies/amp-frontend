"use client"

import React, { useState } from "react"
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core"
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
    DragColumnProps,
    TaskCheckItem,
    ColumnItems,
    SplitItems,
} from "@/types/components/DragSortableCards"

const isSplitItems = (items: ColumnItems): items is SplitItems => {
    return !Array.isArray(items)
}

const SortableItem = ({ item, section }: { item: TaskCheckItem; section?: string }) => {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
        id: item.id,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: item.bgColor ? item.bgColor : "#fff",
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`task-check-item ${section ? `section-${section}` : ""}`}
        >
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
                <h5 className="mb-0">{item.label}</h5>
                <p className="mb-0">{item.desc}</p>
            </div>

            {item.prgressLevel !== undefined && (
                <div className="task-progress">
                    <span
                        className="task-progress-fill"
                        style={{ width: `${item.prgressLevel}%` }}
                    />
                </div>
            )}
        </div>
    )
}

const DragSortableCards = ({
    id,
    title,
    userImage,
    items,
    onChange,
    actions = [],
    routineData,
    isRoutineOpen,
}: DragColumnProps) => {
    const [isOpen, setIsOpen] = useState(true)

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        if (isSplitItems(items)) {
            const updated: SplitItems = { ...items }

            const side: "left" | "right" | null = items.left?.some((i) => i.id === active.id)
                ? "left"
                : items.right?.some((i) => i.id === active.id)
                  ? "right"
                  : null

            if (!side || !items[side]) return

            const oldIndex = items[side]!.findIndex((i) => i.id === active.id)
            const newIndex = items[side]!.findIndex((i) => i.id === over.id)

            if (oldIndex === -1 || newIndex === -1) return

            updated[side] = arrayMove(items[side]!, oldIndex, newIndex)

            onChange(updated)
        } else {
            const oldIndex = items.findIndex((i) => i.id === active.id)
            const newIndex = items.findIndex((i) => i.id === over.id)

            if (oldIndex === -1 || newIndex === -1) return

            onChange(arrayMove(items, oldIndex, newIndex))
        }
    }

    const renderList = (list: TaskCheckItem[], direction?: string) => (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={list.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                <div className={`task-list-container container-${direction}`}>
                    {list.map((item) => (
                        <SortableItem key={item.id} item={item} section={direction} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    )

    return (
        <div className={`fence-wrapper ${isOpen ? "expanded" : "shrink"}`}>
            <div className="fence-column">
                <div className="fence-header">
                    <div className="d-flex gap-2 align-items-center">
                        {userImage && (
                            <div className="user-avatar-wrapper">
                                <img src={userImage} alt={title} className="user-avatar" />
                            </div>
                        )}
                        <span className="title">{title}</span>
                    </div>

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
                    <>
                        {isSplitItems(items) ? (
                            <>
                                <div className={`routine-drawer ${isRoutineOpen ? "open" : ""}`}>
                                    {routineData &&
                                        routineData.length > 0 &&
                                        renderList(routineData, "top")}
                                </div>
                                <div className="d-flex gap-3 mt-3">
                                    {items.left && renderList(items.left, "left")}
                                    {items.right && renderList(items.right, "right")}
                                </div>
                            </>
                        ) : (
                            renderList(items)
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default DragSortableCards
