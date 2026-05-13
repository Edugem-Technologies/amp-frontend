/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table"

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core"

import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"

/** Row */
function SortableRow({ row }: any) {
    const { setNodeRef, transform, transition, isDragging, attributes, listeners } = useSortable({
        id: row.original.id,
    })

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.95 : 1,
    }

    return (
        <tr ref={setNodeRef} style={style}>
            {row.getVisibleCells().map((cell: any) => {
                const isDrag = cell.column.id === "drag"

                return (
                    <td key={cell.id} {...(isDrag ? { ...attributes, ...listeners } : {})}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                )
            })}
        </tr>
    )
}

type Props<T> = {
    data: T[]
    setData: React.Dispatch<React.SetStateAction<T[]>>
    columns: ColumnDef<T>[]
    getRowId: (row: T) => string
    tabType: string
}

export default function DraggableTable<T>({ data, setData, columns, getRowId, tabType }: Props<T>) {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        }),
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId,
    })

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over || active.id === over.id) return

        setData((items: any[]) => {
            const oldIndex = items.findIndex((i) => i.id === active.id)
            const newIndex = items.findIndex((i) => i.id === over.id)
            return arrayMove(items, oldIndex, newIndex)
        })
    }

    const getThClass = (tabType: string, index: number) => {
        if (tabType === "roadmap") {
            // 4 columns
            return index === 0
                ? "w-30px"
                : index === 1
                  ? ""
                  : index === 2
                    ? "min-w-100px"
                    : index === 3
                      ? "min-w-100px text-end"
                      : ""
        }

        if (tabType === "pipeline") {
            // 5 columns
            return index === 0
                ? "w-30px"
                : index === 1
                  ? ""
                  : index === 2
                    ? "min-w-100px"
                    : index === 3
                      ? "min-w-100px"
                      : index === 4
                        ? "text-end end"
                        : ""
        }

        return ""
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="table-responsive">
                <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                    <thead>
                        {table.getHeaderGroups().map((hg) => (
                            <tr key={hg.id} className="fw-bolder text-muted">
                                {hg.headers.map((header, index) => {
                                    return (
                                        <th key={header.id} className={getThClass(tabType, index)}>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>

                    <SortableContext
                        items={data.map((d: any) => d.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <SortableRow key={row.id} row={row} />
                            ))}
                        </tbody>
                    </SortableContext>
                </table>
            </div>
        </DndContext>
    )
}
