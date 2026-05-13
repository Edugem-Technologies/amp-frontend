"use client"

import React, { useMemo, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import DraggableTable from "../common/DraggableTable"
import { IconMap } from "../icons/IconMap"
import { BaseRow } from "@/types/components/Settings"

type Pipeline = BaseRow<{
    status: string
}>

function DragHandle() {
    return (
        <span className="svg-icon svg-icon-2" style={{ cursor: "grab" }}>
            {IconMap.dragIndicator}
        </span>
    )
}

const initialData: Pipeline[] = [
    {
        id: "1",
        name: "Product Pipeline",
        status: "Completed",
        team: [{ id: "u1", name: "Alice", avatar: "/media/avatars/150-26.jpg" }],
    },
    {
        id: "2",
        name: "Business Pipeline",
        status: "In Progress",
        team: [{ id: "u2", name: "Bob", avatar: "/media/avatars/150-26.jpg" }],
    },
]

export default function Pipeline() {
    const [data, setData] = useState<Pipeline[]>(initialData)

    const columns = useMemo<ColumnDef<Pipeline>[]>(
        () => [
            {
                id: "drag",
                header: "",
                cell: () => <DragHandle />,
            },
            {
                accessorKey: "name",
                header: "Pipeline Name",
                cell: (info) => (
                    <span className="text-dark fw-bolder fs-6">{info.getValue() as string}</span>
                ),
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: (info) => (
                    <span className="badge badge-light-success">{info.getValue() as string}</span>
                ),
            },
            {
                accessorKey: "team",
                header: "Team",
                cell: (info) => {
                    const team = info.getValue() as Pipeline["team"]

                    return (
                        <div className="symbol-group d-inline-flex">
                            {team.slice(0, 3).map((m) => (
                                <div
                                    key={m.id}
                                    className="symbol symbol-circle symbol-30px"
                                    title={m.name}
                                >
                                    <img src={m.avatar} alt={m.name} />
                                </div>
                            ))}
                        </div>
                    )
                },
            },
            {
                id: "actions",
                header: "Actions",
                cell: () => (
                    <div className="d-flex justify-content-end flex-shrink-0">
                        <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                            <span className="svg-icon svg-icon-3">{IconMap.edit}</span>
                        </button>
                        <button className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
                            <span className="svg-icon svg-icon-3">{IconMap.trashBin}</span>
                        </button>
                    </div>
                ),
            },
        ],
        [],
    )

    return (
        <div className="card">
            <div className="card-header">
                <h3>Pipeline</h3>
                <span>{data.length} items</span>
            </div>

            <div className="card-body">
                <DraggableTable
                    data={data}
                    setData={setData}
                    columns={columns}
                    getRowId={(row) => row.id}
                    tabType="pipeline"
                />
            </div>
        </div>
    )
}
