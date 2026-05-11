"use client"

import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import ReactStaticTable from "./ReactStaticTable"
import { ColumnDef } from "@tanstack/react-table"
import { IconMap } from "../icons/IconMap"
import Link from "next/link"

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
        size: 10,
        header: () => (
            <div className="form-check form-check-sm form-check-custom form-check-solid">
                <input type="checkbox" className="form-check-input widget-9-check" />
            </div>
        ),
        cell: () => (
            <div className="form-check form-check-sm form-check-custom form-check-solid">
                <input type="checkbox" className="form-check-input widget-9-check" />
            </div>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "name",
        header: "Authors",
        size: 350,
        cell: ({ row }) => {
            const item = row.original
            return (
                <div className="d-flex align-items-center">
                    <div className="symbol symbol-45px me-5">
                        <img src={item.avatar} alt={item.name} />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                        <Link href="#" className="text-dark fw-bolder text-hover-primary fs-6">
                            {item.name}
                        </Link>
                        <span className="text-muted fw-bold text-muted d-block fs-7">
                            {item.skills}
                        </span>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "company",
        header: "Company",
        size: 180,

        cell: ({ row }) => {
            const item = row.original
            return (
                <>
                    <Link href="#" className="text-dark fw-bolder text-hover-primary fs-6">
                        {item.company}
                    </Link>
                    <span className="text-muted fw-bold text-muted d-block fs-7">
                        {item.companyType}
                    </span>
                </>
            )
        },
    },
    {
        accessorKey: "progress",
        header: "Progress",
        size: 100,
        cell: ({ row }) => {
            const { progress } = row.original
            return (
                <div className="d-flex flex-column w-100 me-2">
                    <div className="d-flex flex-stack mb-2">
                        <span className="text-muted me-2 fs-7 fw-bold">{progress}%</span>
                    </div>
                    <div className="progress h-6px w-100">
                        <div
                            className="progress-bar bg-primary"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        meta: {
            headerClassName: "text-end",
        },
        size: 140,
        cell: ({ row }) => {
            const id = row.original.id

            return (
                <div className="d-flex justify-content-end flex-shrink-0">
                    <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                        <span className="svg-icon svg-icon-3">{IconMap.toggleSwitch}</span>
                    </button>

                    <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                        <span className="svg-icon svg-icon-3">{IconMap.edit}</span>
                    </button>

                    <button
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        onClick={() => {
                            return id
                        }}
                    >
                        <span className="svg-icon svg-icon-3">{IconMap.trashBin}</span>
                    </button>
                </div>
            )
        },
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
        <div className="card mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder fs-3 mb-1">Members Statistics</span>
                    <span className="text-muted mt-1 fw-bold fs-7">Over 500 members</span>
                </h3>
                <div className="card-toolbar">
                    <Link href="#" className="btn btn-sm btn-light btn-active-primary">
                        <span className="svg-icon svg-icon-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <rect
                                    opacity="0.5"
                                    x="11.364"
                                    y="20.364"
                                    width="16"
                                    height="2"
                                    rx="1"
                                    transform="rotate(-90 11.364 20.364)"
                                    fill="black"
                                ></rect>
                                <rect
                                    x="4.36396"
                                    y="11.364"
                                    width="16"
                                    height="2"
                                    rx="1"
                                    fill="black"
                                ></rect>
                            </svg>
                        </span>
                        New Member
                    </Link>
                </div>
            </div>

            <div className="card-body py-3">
                <ReactStaticTable
                    data={data}
                    columns={memberStatsColumns()}
                    isTableView
                    headerClass={"fw-bolder text-muted"}
                    tableWClassName="gy-4"
                />
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
        </div>
    )
}

export default MemberStats
