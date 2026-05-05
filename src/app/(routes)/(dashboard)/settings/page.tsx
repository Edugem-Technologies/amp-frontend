/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from "react"
import { createColumnHelper } from "@tanstack/react-table"
import ReactStaticTable from "@/app/components/common/ReactStaticTable"
import { IconMap } from "@/app/components/icons/IconMap"
import { PipelineItem, Project, Roadmap, TeamMember } from "@/types/common/Settings"
import { settingsData, settingsTabs } from "@/fixtures/SettingsData"
const teamColumnHelper = createColumnHelper<TeamMember>()
const projectColumnHelper = createColumnHelper<Project>()
const roadmapColumnHelper = createColumnHelper<Roadmap>()
const pipelineColumnHelper = createColumnHelper<PipelineItem>()

/* ================= TEAM COLUMNS ================= */

const teamColumns = [
    teamColumnHelper.accessor("profileImage", {
        header: "User",
        cell: (info) => {
            const row = info.row.original

            return (
                <div className="d-flex align-items-center gap-3">
                    <img
                        src={row.profileImage}
                        width={32}
                        height={32}
                        style={{ borderRadius: "50%" }}
                        alt=""
                    />
                    <div>
                        <div>{row.name}</div>
                        <small className="text-muted">{row.email}</small>
                    </div>
                </div>
            )
        },
    }),

    teamColumnHelper.accessor("role", {
        header: "Role",
    }),

    teamColumnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
            const value = info.getValue()

            return (
                <span className={`badge ${value === "Active" ? "bg-success" : "bg-danger"}`}>
                    {value}
                </span>
            )
        },
    }),
]

/* ================= PROJECT COLUMNS ================= */

const projectColumns = [
    projectColumnHelper.accessor("logo", {
        header: "Project",
        cell: (info) => {
            const row = info.row.original

            return (
                <div className="d-flex align-items-center gap-3">
                    <img src={row.logo} width={32} height={32} alt="" />
                    <span>{row.name}</span>
                </div>
            )
        },
    }),

    projectColumnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
            const value = info.getValue()

            return (
                <span className={`badge ${value === "Active" ? "bg-success" : "bg-danger"}`}>
                    {value}
                </span>
            )
        },
    }),
]

/* ================= ROADMAP COLUMNS ================= */

const roadmapColumns = [
    roadmapColumnHelper.accessor("name", {
        header: "Roadmap",
    }),

    roadmapColumnHelper.accessor("assignedTeam", {
        header: "Assigned Team",
        cell: (info) => {
            const team = info.getValue()

            return (
                <div className="d-flex gap-2 flex-wrap">
                    {team.map((member) => (
                        <div key={member.id} className="d-flex align-items-center gap-1">
                            <img
                                src={member.profileImage}
                                width={24}
                                height={24}
                                style={{ borderRadius: "50%" }}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            )
        },
    }),
]

/* ================= PIPELINE COLUMNS ================= */

const pipelineColumns = [
    pipelineColumnHelper.accessor("name", {
        header: "Pipeline Item",
    }),

    pipelineColumnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
            const value = info.getValue()
            return <span className="badge bg-primary">{value}</span>
        },
    }),

    pipelineColumnHelper.accessor("assignedTeam", {
        header: "Assigned Team",
        cell: (info) => {
            const team = info.getValue()

            return (
                <div className="d-flex gap-2 flex-wrap">
                    {team.map((member) => (
                        <div key={member.id} className="d-flex align-items-center gap-1">
                            <img
                                src={member.profileImage}
                                width={24}
                                height={24}
                                style={{ borderRadius: "50%" }}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            )
        },
    }),
]

/* ================= TAB TABLE CONFIG ================= */

const tabTableMap = {
    team: {
        title: "Team Management",
        buttonLabel: "Add Member",
        columns: teamColumns,
        data: settingsData.team,
        stats: (() => {
            const total = settingsData.team.length
            const active = settingsData.team.filter((m) => m.status === "Active").length
            const inactive = settingsData.team.filter((m) => m.status === "Inactive").length
            return `${total} total · ${active} active · ${inactive} inactive`
        })(),
    },

    projects: {
        title: "Projects",
        buttonLabel: "Add Project",
        columns: projectColumns,
        data: settingsData.projects,
        stats: (() => {
            const total = settingsData.projects.length
            const active = settingsData.projects.filter((p) => p.status === "Active").length
            const inactive = settingsData.projects.filter((p) => p.status === "Inactive").length
            return `${total} total · ${active} active · ${inactive} inactive`
        })(),
    },

    roadmaps: {
        title: "Roadmaps",
        buttonLabel: "New Roadmap",
        columns: roadmapColumns,
        data: settingsData.roadmaps,
        stats: `${settingsData.roadmaps.length} roadmaps`,
    },

    pipeline: {
        title: "Pipeline",
        buttonLabel: "Add New Pipeline",
        columns: pipelineColumns,
        data: settingsData.pipeline,
        stats: `${settingsData.pipeline.length} pipeline items`,
    },
}

/* ================= PAGE ================= */

const Page = () => {
    const [activeTab, setActiveTab] = useState(settingsTabs[0]?.id)

    const handleTabClick = (tab: any) => {
        setActiveTab(tab.id)
        console.log("Active tab:", tab.label)
    }

    return (
        <div className="content-section-wrapper  container-fluid h-100">
            <div className="h-100 card c-settings">
                <div className="row h-100">
                    <div className="c-settings-nav col-md-3">
                        <ul className="nav nav-tabs nav-pills">
                            {settingsTabs.map((tab) => {
                                const isActive = activeTab === tab.id

                                return (
                                    <li key={tab.id} className="nav-item me-0 mb-md-2">
                                        <button
                                            type="button"
                                            onClick={() => handleTabClick(tab)}
                                            className={`nav-link btn btn-flex ${
                                                isActive ? "active" : ""
                                            }`}
                                        >
                                            <span className="menu-icon">
                                                <span className="material-symbols-outlined">
                                                    {tab.iconType}
                                                </span>
                                            </span>

                                            <span className="d-flex flex-column align-items-start">
                                                <span className="menu-title">{tab.label}</span>
                                                <span className="menu-desc">{tab.description}</span>
                                            </span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="c-settings-tab-content col-md-9">
                        <div className="tab-content">
                            {Object.entries(tabTableMap).map(([tabId, table]) => {
                                const isActive = activeTab === tabId

                                return (
                                    <div
                                        key={tabId}
                                        className={`tab-pane fade ${isActive ? "active show" : ""}`}
                                    >
                                        <div className="card card-xl-stretch mb-5 mb-xl-8">
                                            {/* HEADER */}

                                            <div className="card-header border-0 pt_1_25">
                                                <h3 className="card-title d-flex align-items-start flex-column">
                                                    <span className="card-label fw-bolder fs-3 mb-1">
                                                        {table.title}
                                                    </span>

                                                    <span className="text-muted fw-semibold fs-7">
                                                        {table.stats}
                                                    </span>
                                                </h3>

                                                <div className="card-toolbar">
                                                    <button className="btn btn-sm btn-dark">
                                                        {IconMap.addWhite}
                                                        <span className="ms-2">
                                                            {table.buttonLabel}
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="card-header border-0 pt_1_25">
                                                <ReactStaticTable
                                                    columns={table.columns}
                                                    data={table.data as any}
                                                    isTableView={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
