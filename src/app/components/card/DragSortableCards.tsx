"use client"
import React, { useState } from "react"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { DragColumnProps, TaskCheckItem } from "@/types/components/DragSortableCards"
import Link from "next/link"
import HoveredIcons from "../common/HoveredIcons"

const SortableItem = ({ item }: { item: TaskCheckItem }) => {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: item.id,
    })

    const style = {
        transform: isDragging
            ? `${CSS.Transform.toString(transform)} rotate(2deg) scale(1.03)`
            : CSS.Transform.toString(transform),
        transition,
        backgroundColor: item.bgColor ?? "#fff",
        opacity: isDragging ? 0.4 : 1,
    }
    console.log("SortableItem", item)

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className="kanban-item">
                <div className="item-card actions hover-icons">
                    <div className="description">
                        <div
                            className="bar"
                            data-width={`${item.progress}%`}
                            style={{ width: `${item.progress}%` }}
                        ></div>

                        <div className="title">
                            <div className="ellipsis-1">{item.label}</div>
                            <div className="desc ellipsis-1">{item.desc}</div>
                        </div>
                        {item?.users && (
                            <>
                                <div className="symbol-group symbol-hover d-inline-flex flex-nowrap pe-1">
                                    <div className="symbol symbol-circle symbol-20px ">
                                        {item?.users?.map((user, index) =>
                                            user.avatar ? (
                                                <img key={index} src={user.avatar} alt="" />
                                            ) : (
                                                <></>
                                            ),
                                        )}
                                    </div>
                                </div>
                                <div className="num c-var">2</div>
                            </>
                        )}
                    </div>
                    <HoveredIcons />
                </div>
                {/* Progress Bar */}
                {/* {item.progress !== undefined &&
          item.progress !== null && (
            <div className="task-progress">
              <div
                className="task-progress-fill"
                style={{
                  width: `${item.progress}%`,
                }}
              />
            </div>
          )} */}
            </div>
        </div>
    )
}

// Separate droppable wrapper so empty columns accept drops
const DroppableList = ({ fenceId, items }: { fenceId: string; items: TaskCheckItem[] }) => {
    const { setNodeRef } = useDroppable({ id: fenceId })

    return (
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            <main ref={setNodeRef} className="kanban-drag" style={{ minHeight: 60 }}>
                {items.map((item) => (
                    <SortableItem key={item.id} item={item} />
                ))}
            </main>
        </SortableContext>
    )
}

const DragSortableCards = ({ id, title, userImage, items, actions = [] }: DragColumnProps) => {
    const [isOpen, setIsOpen] = useState(true)

    // items is now always TaskCheckItem[] (flat list — remove SplitItems support if unused)
    const list = Array.isArray(items) ? (items as TaskCheckItem[]) : []

    return (
        <div className={`kanban-board ${isOpen ? "expanded" : "collapsed"}`}>
            <header className="kanban-board-header color-theme-v2">
                <div className="kanban-title-board">
                    <Link href="" className="symbol symbol-circle symbol-30px">
                        {userImage && <img src={userImage} alt={title} className="user-avatar" />}
                    </Link>

                    <div className="col-8 c1">
                        <a>{title}</a>
                    </div>
                    <div className="c2">
                        {/* <div className="dropdown one" onClick={() => setIsOpen((p) => !p)}>
              <a className="dropdown-toggle label label-rounded label-success fs-16 font-weight-bold hover-w-7">
                <span className="material-symbols-outlined">
                  {isOpen ? "collapse_content" : "expand_content"}
                </span>
              </a>
            </div> */}
                        {actions
                            .filter((action) => {
                                if (!isOpen) return action.id === "expand"
                                return true
                            })
                            .map((action, index) => (
                                <div
                                    className={`cursor-pointer dropdown two ms-1 ${
                                        isOpen ? "" : "expand"
                                    }`}
                                    key={index}
                                    onClick={() => {
                                        if (action.id === "expand") {
                                            setIsOpen((prev) => !prev)
                                        } else {
                                            action.onClick?.(id)
                                        }
                                    }}
                                >
                                    <a className="dropdown-toggle label label-rounded label-success fs-16 font-weight-bold hover-w-7">
                                        <span className="material-symbols-outlined">
                                            {action.id === "expand"
                                                ? isOpen
                                                    ? "collapse_content"
                                                    : "expand_content"
                                                : action.icon}
                                        </span>
                                    </a>
                                </div>
                            ))}
                    </div>
                </div>
            </header>

            {isOpen && <DroppableList fenceId={id} items={list} />}
        </div>
    )
}

export default DragSortableCards
