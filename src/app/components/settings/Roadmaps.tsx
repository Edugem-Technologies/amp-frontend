"use client"

import React, { useMemo, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import DraggableTable from "../common/DraggableTable"
import { IconMap } from "../icons/IconMap"
import { BaseRow } from "@/types/components/Settings"

type Roadmap = BaseRow

function DragHandle() {
    return (
        <span className="svg-icon svg-icon-2" style={{ cursor: "grab" }}>
            {IconMap.dragIndicator}
        </span>
    )
}

const initialData: Roadmap[] = [
    {
        id: "1",
        name: "Product Roadmap",
        team: [
            { id: "u1", name: "Alice", avatar: "/media/avatars/150-26.jpg" },
            { id: "u2", name: "Bob", avatar: "/media/avatars/150-26.jpg" },
        ],
    },
    {
        id: "2",
        name: "Business Roadmap",
        team: [{ id: "u3", name: "Eve", avatar: "/media/avatars/150-26.jpg" }],
    },
]

export default function Roadmaps() {
    const [data, setData] = useState<Roadmap[]>(initialData)

    const columns = useMemo<ColumnDef<Roadmap>[]>(
        () => [
            {
                id: "drag",
                header: "",
                cell: () => <DragHandle />,
            },
            {
                accessorKey: "name",
                header: "Roadmap Name",
                cell: (info) => (
                    <span className="text-dark fw-bolder fs-6">{info.getValue() as string}</span>
                ),
            },
            {
                accessorKey: "team",
                header: "Team",
                cell: (info) => {
                    const team = info.getValue() as Roadmap["team"]

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
        <div className="card card-xl-stretch mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder fs-3 mb-1">Roadmaps</span>
                    <span className="text-muted mt-1 fw-bold fs-7">{data.length} roadmaps</span>
                </h3>

                <div className="card-toolbar">
                    <button className="btn btn-sm btn-dark">
                        <span className="svg-icon svg-icon-3">{IconMap.addWhite}</span>
                        New Roadmap
                    </button>
                </div>
            </div>

            <div className="card-body py-3">
                <DraggableTable
                    data={data}
                    setData={setData}
                    columns={columns}
                    getRowId={(row) => row.id}
                    tabType="roadmap"
                />
            </div>
        </div>
    )
}
