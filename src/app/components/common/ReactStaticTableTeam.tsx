/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useMemo, useState } from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

type TaskRow = {
    id: number
    number: string
    task: string
    category: string
    calendar: string
    progress: number
    tags: string[]
    assigned: string
    dueDate: string
    priority: "High" | "Medium" | "Low"
}

type PartitionType = {
    title: string
    tasks: TaskRow[]
    partitionCSS?: string
}

const TEAM_TABLE_DATA: PartitionType[] = [
    {
        title: "Jenna",
        partitionCSS: "type-2",
        tasks: [
            {
                id: 1,
                number: "1",
                task: "Create FureStibe branding logo, Customers Update and Project Meeting",
                category: "Intertico",
                calendar: "14 Oct 2023",
                progress: 0,
                tags: ["Web", "UI", "UX"],
                assigned: "Me",
                dueDate: "14 Jul 22",
                priority: "High",
            },
            {
                id: 2,
                number: "4",
                task: "Create FireStone Logo",
                category: "Agoda",
                calendar: "",
                progress: 70,
                tags: ["Insurance", "Art", "Director"],
                assigned: "Jessie Clarcson",
                dueDate: "10 Aug 22",
                priority: "Medium",
            },
            {
                id: 3,
                number: "2",
                task: "KPI App Showcase",
                category: "RoadGee",
                calendar: "12 Oct 2023",
                progress: 60,
                tags: ["UI", "Houses", "KPI"],
                assigned: "Lebron Wayde",
                dueDate: "19 Dec 22",
                priority: "Low",
            },
        ],
    },
    {
        title: "Mark",
        tasks: [
            {
                id: 4,
                number: "3",
                task: "Customers Update",
                category: "The Hill",
                calendar: "11 Oct 2023",
                progress: 10,
                tags: ["Web", "Director", "KPI"],
                assigned: "Me",
                dueDate: "22 Oct 22",
                priority: "Medium",
            },
            {
                id: 5,
                number: "1",
                task: "Project Meeting",
                category: "RoadGee",
                calendar: "",
                progress: 0,
                tags: ["Art", "Director", "Hotels", "KPI"],
                assigned: "Ana Simmons",
                dueDate: "14 Aug 22",
                priority: "High",
            },
            {
                id: 6,
                number: "3",
                task: "Create FureStibe branding logo",
                category: "Intertico",
                calendar: "14 Oct 2023",
                progress: 20,
                tags: ["UI", "UX", "Art"],
                assigned: "Ana Simmons",
                dueDate: "14 Sep 22",
                priority: "Medium",
            },
        ],
    },
    {
        title: "Tom",
        tasks: [
            {
                id: 7,
                number: "2",
                task: "Create FireStone Logo",
                category: "Agoda",
                calendar: "13 Oct 2023",
                progress: 80,
                tags: ["Hotels", "Houses", "KPI"],
                assigned: "Jessie Clarcson",
                dueDate: "21 Oct 22",
                priority: "High",
            },
            {
                id: 8,
                number: "1",
                task: "KPI App Showcase",
                category: "RoadGee",
                calendar: "",
                progress: 30,
                tags: ["Art", "Director", "KPI"],
                assigned: "Lebron Wayde",
                dueDate: "16 Sep 22",
                priority: "Low",
            },
            {
                id: 9,
                number: "1",
                task: "Customers Update",
                category: "The Hill",
                calendar: "",
                progress: 40,
                tags: ["Web", "Director", "Transportation"],
                assigned: "Natali Goodwin",
                dueDate: "12 Aug 22",
                priority: "Low",
            },
        ],
    },
]

const getPriorityClass = (priority: string) => {
    switch (priority) {
        case "High":
            return "badge-light-danger"
        case "Medium":
            return "badge-light-warning"
        case "Low":
            return "badge-light-success"
        default:
            return "badge-light-secondary"
    }
}

const ReactStaticTableTeam = () => {
    const [sorting, setSorting] = useState<SortingState>([])

    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
        Jenna: true,
        Mark: true,
        Tom: true,
    })

    const toggleRow = (title: string) => {
        setExpandedRows((prev) => ({
            ...prev,
            [title]: !prev[title],
        }))
    }

    const flatData = useMemo(() => {
        return TEAM_TABLE_DATA.flatMap((partition) =>
            partition.tasks.map((task) => ({
                ...task,
                partitionTitle: partition.title,
            })),
        )
    }, [])

    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "task",
                header: "Task",
                cell: ({ row }) => {
                    const item = row.original

                    return (
                        <div className="d-flex align-items-start gap-3 py-3">
                            <div className="symbol symbol-35px">
                                <div className="symbol-label fs-7 fw-bold bg-light-primary text-primary">
                                    {item.number}
                                </div>
                            </div>

                            <div className="d-flex flex-column">
                                <span className="fw-bold text-dark fs-6 mb-1">{item.task}</span>

                                <div className="d-flex align-items-center flex-wrap gap-2">
                                    <span className="text-muted fs-7">{item.category}</span>

                                    {item.calendar && (
                                        <>
                                            <span className="bullet bullet-dot bg-gray-400"></span>

                                            <span className="text-muted fs-7">{item.calendar}</span>
                                        </>
                                    )}
                                </div>

                                <div className="d-flex flex-wrap gap-2 mt-2">
                                    {item.tags.map((tag: string, index: number) => (
                                        <span key={index} className="badge badge-light-primary">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                },
            },
            {
                accessorKey: "assigned",
                header: "Assigned",
                cell: ({ row }) => (
                    <span className="text-dark fw-semibold fs-7">{row.original.assigned}</span>
                ),
            },
            {
                accessorKey: "progress",
                header: "Progress",
                cell: ({ row }) => (
                    <div className="d-flex align-items-center gap-3 min-w-150px">
                        <div className="progress h-6px w-100 bg-light-primary">
                            <div
                                className="progress-bar bg-primary"
                                role="progressbar"
                                style={{
                                    width: `${row.original.progress}%`,
                                }}
                            />
                        </div>

                        <span className="text-muted fs-7 fw-bold">{row.original.progress}%</span>
                    </div>
                ),
            },
            {
                accessorKey: "priority",
                header: "Priority",
                cell: ({ row }) => (
                    <span className={`badge ${getPriorityClass(row.original.priority)}`}>
                        {row.original.priority}
                    </span>
                ),
            },
            {
                accessorKey: "dueDate",
                header: "Due Date",
                cell: ({ row }) => (
                    <span className="text-muted fw-semibold fs-7">{row.original.dueDate}</span>
                ),
            },
        ],
        [],
    )

    const table = useReactTable({
        data: flatData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div id="kt_content_container" className="container-fluid p-0">
            <div className="g-5 gx-xxl-8">
                <div className="tab-content text-start" id="myTabContent">
                    <div
                        className="tab-pane tab-pane-Table fade show active"
                        id="Table"
                        role="tabpanel"
                    >
                        <div className="px-30px">
                            <div className="card card-xl-stretch mb-5 mb-xl-8 table-v1">
                                <div className="card-body py-3">
                                    <div className="table-responsive">
                                        <table className="table table-row-dashed table-row-gray-300 main align-middle gs-0 gy-1">
                                            <thead className="d-none">
                                                {table.getHeaderGroups().map((headerGroup) => (
                                                    <tr key={headerGroup.id}>
                                                        {headerGroup.headers.map((header) => (
                                                            <th key={header.id}>
                                                                {flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext(),
                                                                )}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </thead>

                                            <tbody>
                                                {TEAM_TABLE_DATA.map(
                                                    (partition, partitionIndex) => (
                                                        <React.Fragment key={partitionIndex}>
                                                            {/* partition row */}
                                                            <tr
                                                                className={`partition-row ${
                                                                    partition.partitionCSS ?? ""
                                                                }`}
                                                                onClick={() =>
                                                                    toggleRow(partition.title)
                                                                }
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                            >
                                                                <td
                                                                    colSpan={5}
                                                                    className="bg-light-primary fw-bold text-dark fs-5 py-5 px-7"
                                                                >
                                                                    <div className="d-flex align-items-center justify-content-between">
                                                                        <span>
                                                                            {partition.title}
                                                                        </span>

                                                                        <i
                                                                            className={`ki-duotone fs-2 ${
                                                                                expandedRows[
                                                                                    partition.title
                                                                                ]
                                                                                    ? "ki-minus-square"
                                                                                    : "ki-plus-square"
                                                                            }`}
                                                                        >
                                                                            <span className="path1"></span>
                                                                            <span className="path2"></span>
                                                                            <span className="path3"></span>
                                                                        </i>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            {/* nested task rows */}
                                                            {expandedRows[partition.title] &&
                                                                partition.tasks.map((task) => {
                                                                    const row = table
                                                                        .getRowModel()
                                                                        .rows.find(
                                                                            (r) =>
                                                                                r.original.id ===
                                                                                task.id,
                                                                        )

                                                                    if (!row) return null

                                                                    return (
                                                                        <tr key={row.id}>
                                                                            {row
                                                                                .getVisibleCells()
                                                                                .map((cell) => (
                                                                                    <td
                                                                                        key={
                                                                                            cell.id
                                                                                        }
                                                                                        className="py-2"
                                                                                    >
                                                                                        {flexRender(
                                                                                            cell
                                                                                                .column
                                                                                                .columnDef
                                                                                                .cell,
                                                                                            cell.getContext(),
                                                                                        )}
                                                                                    </td>
                                                                                ))}
                                                                        </tr>
                                                                    )
                                                                })}
                                                        </React.Fragment>
                                                    ),
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* pagination */}
                                    <div className="d-flex justify-content-end align-items-center mt-5 gap-2">
                                        <button
                                            className="btn btn-sm btn-light"
                                            onClick={() => table.previousPage()}
                                            disabled={!table.getCanPreviousPage()}
                                        >
                                            Previous
                                        </button>

                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => table.nextPage()}
                                            disabled={!table.getCanNextPage()}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReactStaticTableTeam
