import React, { useState } from "react"
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core"
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DragColumnProps, TaskCheckItem } from "@/types/components/DragSortableCards"

const SortableItem = ({ item }: { item: TaskCheckItem }) => {
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
            className="task-check-item"
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

            <div className="task-meta">
                <div className="task-avatars">
                    {item?.users?.map((user, index) => (
                        <img key={index} src={user.avatar} alt={user.name} />
                    ))}
                </div>
                {item?.users?.length && <span className="task-badge">{item?.users?.length}</span>}{" "}
            </div>
            {item.prgressLevel && (
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
}: DragColumnProps) => {
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
                    <div className="d-flex gap-2 align-items-center">
                        {userImage && (
                            <div className="user-avatar-wrapper">
                                {userImage && (
                                    <img src={userImage} alt={title} className="user-avatar" />
                                )}
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
