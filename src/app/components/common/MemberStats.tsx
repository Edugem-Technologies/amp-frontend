"use client"

import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import ReactStaticTable from "./ReactStaticTable"
import { ColumnDef } from "@tanstack/react-table"
import { IconMap } from "../icons/IconMap"

export type MemberStatsItem = {
    id: string
    name: string
    skills: string
    company: string
    companyType: string
    progress: number
    progressColor: string
    avatar: string
}

interface Props {
    data: MemberStatsItem[]
    onAdd: (data: Omit<MemberStatsItem, "id">) => void
    onDelete: (id: string) => void
}

export const memberStatsColumns = () // onDelete: (id: string) => void,
: ColumnDef<MemberStatsItem>[] => [
    {
        id: "select",
        size: 5,
        header: ({ table }) => (
            <input
                type="checkbox"
                checked={table.getIsAllRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
            />
        ),
        cell: ({ row }) => (
            <input
                type="checkbox"
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
            />
        ),
        enableSorting: false,
    },
    {
        accessorKey: "name",
        header: "Authors",
        size: 180,
        cell: ({ row }) => {
            const item = row.original
            return (
                <div className="author-cell">
                    <img src={item.avatar} alt={item.name} />
                    <div>
                        <div className="name">{item.name}</div>
                        <div className="meta">{item.skills}</div>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "company",
        header: "Company",
        size: 60,
        cell: ({ row }) => {
            const item = row.original
            return (
                <div className="company-cell">
                    <div className="company">{item.company}</div>
                    <div className="meta">{item.companyType}</div>
                </div>
            )
        },
    },
    {
        accessorKey: "progress",
        header: "Progress",
        size: 40,
        cell: ({ row }) => {
            const { progress, progressColor } = row.original
            return (
                <div className="progress-cell">
                    <span className="percent">{progress}%</span>
                    <div className="bar">
                        <span
                            className="fill"
                            style={{
                                width: `${progress}%`,
                                backgroundColor: progressColor,
                            }}
                        />
                    </div>
                </div>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        size: 60,
        cell: () => (
            <div className="actions-cell">
                <button>
                    <span className="svg-icon svg-icon-3">{IconMap.toggleSwitch}</span>
                </button>
                <button>
                    <span className="svg-icon svg-icon-3"> {IconMap.edit}</span>
                </button>
                <button>
                    <span className="svg-icon svg-icon-3">{IconMap.trashBin}</span>
                </button>
            </div>
        ),
    },
]
const MemberStats: React.FC<Props> = ({ data, onAdd }) => {
    const [show, setShow] = useState(false)

    const [form, setForm] = useState<Omit<MemberStatsItem, "id">>({
        name: "",
        skills: "",
        company: "",
        companyType: "",
        progress: 0,
        progressColor: "#22c55e",
        avatar: "/media/avatars/300-1.jpg",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: name === "progress" ? Number(value) : value,
        }))
    }

    const handleSubmit = () => {
        onAdd(form)
        setShow(false)
        setForm({
            name: "",
            skills: "",
            company: "",
            companyType: "",
            progress: 0,
            progressColor: "#22c55e",
            avatar: "/media/avatars/300-1.jpg",
        })
    }

    return (
        <>
            <div className="header">
                <div>
                    <h3 className="card-title">Members Statistics</h3>
                    <p className="card-muted-text">Over 500 members</p>
                </div>
                <button className="add-btn" onClick={() => setShow(true)}>
                    + New Member
                </button>
            </div>

            <div className="dt-table">
                <ReactStaticTable data={data} columns={memberStatsColumns()} isTableView />
            </div>

            {/* MODAL */}
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Member</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        {[
                            { label: "Name", name: "name" },
                            { label: "Skills", name: "skills" },
                            { label: "Company", name: "company" },
                            { label: "Company Type", name: "companyType" },
                        ].map((field) => (
                            <Form.Group className="mb-3" key={field.name}>
                                <Form.Label>{field.label}</Form.Label>
                                <Form.Control
                                    name={field.name}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    value={(form as any)[field.name]}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        ))}

                        <Form.Group>
                            <Form.Label>Progress (%)</Form.Label>
                            <Form.Control
                                type="number"
                                name="progress"
                                min={0}
                                max={100}
                                value={form.progress}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Add Member
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MemberStats
