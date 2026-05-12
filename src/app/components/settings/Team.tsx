"use client"

import React from "react"
import { createColumnHelper } from "@tanstack/react-table"
import ReactStaticTable from "@/app/components/common/ReactStaticTable"
import { IconMap } from "../icons/IconMap"

type TeamMemberType = {
    member: {
        name: string
        role: string
        avatar?: string
        initials?: string
    }
    email: string
    status: "Active" | "Inactive"
}

const columnHelper = createColumnHelper<TeamMemberType>()

const teamData: TeamMemberType[] = [
    {
        member: {
            name: "Mark Lyttleton",
            role: "Admin",
            avatar: "/media/avatars/150-26.jpg",
        },
        email: "mark.l@example.com",
        status: "Active",
    },
    {
        member: {
            name: "Adedayo Adelowokan",
            role: "Developer",
            avatar: "/media/avatars/150-26.jpg",
        },
        email: "adedayo.a@example.com",
        status: "Active",
    },
    {
        member: {
            name: "Jenna Keane",
            role: "Designer",
            avatar: "/media/avatars/150-26.jpg",
        },
        email: "jenna.k@example.com",
        status: "Active",
    },
]

const columns = [
    columnHelper.accessor("member", {
        header: "Member",
        size: 420,
        cell: ({ row }) => {
            const member = row.original.member

            return (
                <div className="d-flex align-items-center">
                    {member.avatar ? (
                        <div className="symbol symbol-45px me-5">
                            <img
                                src={member.avatar}
                                alt={member.name}
                                className="object-fit-cover"
                            />
                        </div>
                    ) : (
                        <div className="symbol symbol-45px me-5">
                            <span className="symbol-label fs-6 fw-bold bg-light text-dark">
                                {member.initials}
                            </span>
                        </div>
                    )}

                    <div className="d-flex justify-content-start flex-column">
                        <span className="text-dark fw-bolder fs-6">{member.name}</span>

                        <span className="text-muted fw-bold fs-7">{member.role}</span>
                    </div>
                </div>
            )
        },
    }),

    columnHelper.accessor("email", {
        header: "Email",
        size: 380,
        cell: ({ row }) => <span className="text-dark fw-bolder fs-6">{row.original.email}</span>,
    }),

    columnHelper.accessor("status", {
        header: "Status",
        size: 180,
        cell: ({ row }) => {
            // const isActive = row.original.status === "Active"

            return <span className="badge w-85px badge-light-success">{row.original.status}</span>
        },
    }),

    columnHelper.display({
        id: "actions",
        size: 180,
        header: "Actions",
        meta: {
            headerClassName: "text-end",
        },
        cell: () => (
            <div className="d-flex justify-content-end flex-shrink-0">
                <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                    <span className="svg-icon svg-icon-3">{IconMap.edit}</span>
                </button>
                <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                    <span className="svg-icon svg-icon-3">{IconMap.trashBin}</span>
                </button>
            </div>
        ),
    }),
]

const Team = () => {
    return (
        <div className="card card-xl-stretch mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder fs-3 mb-1">Team Management</span>

                    <span className="text-muted mt-1 fw-bold fs-7">
                        7 total • 5 active • 2 inactive
                    </span>
                </h3>

                <div className="card-toolbar">
                    <button className="btn btn-sm btn-dark">
                        <span className="svg-icon svg-icon-3 me-1">
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
                                />

                                <rect
                                    x="4.36396"
                                    y="11.364"
                                    width="16"
                                    height="2"
                                    rx="1"
                                    fill="black"
                                />
                            </svg>
                        </span>
                        New Member
                    </button>
                </div>
            </div>

            <div className="card-body py-3">
                <ReactStaticTable
                    columns={columns}
                    data={teamData}
                    tableWClassName="table align-middle gs-0 gy-4"
                    headerClass="fw-bolder text-muted"
                />
            </div>
        </div>
    )
}

export default Team
