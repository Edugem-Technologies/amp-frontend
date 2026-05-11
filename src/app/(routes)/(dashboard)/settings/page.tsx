/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from "react"
// import { createColumnHelper } from "@tanstack/react-table"
// import { PipelineItem, Project, Roadmap, TeamMember } from "@/types/common/Settings"
import { settingsTabs } from "@/fixtures/SettingsData"
// const teamColumnHelper = createColumnHelper<TeamMember>()
// const projectColumnHelper = createColumnHelper<Project>()
// const roadmapColumnHelper = createColumnHelper<Roadmap>()
// const pipelineColumnHelper = createColumnHelper<PipelineItem>()

/* ================= TEAM COLUMNS ================= */

// const teamColumns = [
//     teamColumnHelper.accessor("profileImage", {
//         header: "User",
//         cell: (info) => {
//             const row = info.row.original

//             return (
//                 <div className="d-flex align-items-center gap-3">
//                     <img
//                         src={row.profileImage}
//                         width={32}
//                         height={32}
//                         style={{ borderRadius: "50%" }}
//                         alt=""
//                     />
//                     <div>
//                         <div>{row.name}</div>
//                         <small className="text-muted">{row.email}</small>
//                     </div>
//                 </div>
//             )
//         },
//     }),

//     teamColumnHelper.accessor("role", {
//         header: "Role",
//     }),

//     teamColumnHelper.accessor("status", {
//         header: "Status",
//         cell: (info) => {
//             const value = info.getValue()

//             return (
//                 <span className={`badge ${value === "Active" ? "bg-success" : "bg-danger"}`}>
//                     {value}
//                 </span>
//             )
//         },
//     }),
// ]

/* ================= PROJECT COLUMNS ================= */

// const projectColumns = [
//     projectColumnHelper.accessor("logo", {
//         header: "Project",
//         cell: (info) => {
//             const row = info.row.original

//             return (
//                 <div className="d-flex align-items-center gap-3">
//                     <img src={row.logo} width={32} height={32} alt="" />
//                     <span>{row.name}</span>
//                 </div>
//             )
//         },
//     }),

//     projectColumnHelper.accessor("status", {
//         header: "Status",
//         cell: (info) => {
//             const value = info.getValue()

//             return (
//                 <span className={`badge ${value === "Active" ? "bg-success" : "bg-danger"}`}>
//                     {value}
//                 </span>
//             )
//         },
//     }),
// ]

/* ================= ROADMAP COLUMNS ================= */

// const roadmapColumns = [
//     roadmapColumnHelper.accessor("name", {
//         header: "Roadmap",
//     }),

//     roadmapColumnHelper.accessor("assignedTeam", {
//         header: "Assigned Team",
//         cell: (info) => {
//             const team = info.getValue()

//             return (
//                 <div className="d-flex gap-2 flex-wrap">
//                     {team.map((member, index) => (
//                         <div key={index} className="d-flex align-items-center gap-1">
//                             <img
//                                 src={member.profileImage}
//                                 width={24}
//                                 height={24}
//                                 style={{ borderRadius: "50%" }}
//                                 alt=""
//                             />
//                         </div>
//                     ))}
//                 </div>
//             )
//         },
//     }),
// ]

/* ================= PIPELINE COLUMNS ================= */

// const pipelineColumns = [
//     pipelineColumnHelper.accessor("name", {
//         header: "Pipeline Item",
//     }),

//     pipelineColumnHelper.accessor("status", {
//         header: "Status",
//         cell: (info) => {
//             const value = info.getValue()
//             return <span className="badge bg-primary">{value}</span>
//         },
//     }),

//     pipelineColumnHelper.accessor("assignedTeam", {
//         header: "Assigned Team",
//         cell: (info) => {
//             const team = info.getValue()

//             return (
//                 <div className="d-flex gap-2 flex-wrap">
//                     {team.map((member, index) => (
//                         <div key={index} className="d-flex align-items-center gap-1">
//                             <img
//                                 src={member.profileImage}
//                                 width={24}
//                                 height={24}
//                                 style={{ borderRadius: "50%" }}
//                                 alt=""
//                             />
//                         </div>
//                     ))}
//                 </div>
//             )
//         },
//     }),
// ]

/* ================= TAB TABLE CONFIG ================= */

// const tabTableMap = {
//     team: {
//         title: "Team Management",
//         buttonLabel: "Add Member",
//         columns: teamColumns,
//         data: settingsData.team,
//         stats: (() => {
//             const total = settingsData.team.length
//             const active = settingsData.team.filter((m) => m.status === "Active").length
//             const inactive = settingsData.team.filter((m) => m.status === "Inactive").length
//             return `${total} total · ${active} active · ${inactive} inactive`
//         })(),
//     },

//     projects: {
//         title: "Projects",
//         buttonLabel: "Add Project",
//         columns: projectColumns,
//         data: settingsData.projects,
//         stats: (() => {
//             const total = settingsData.projects.length
//             const active = settingsData.projects.filter((p) => p.status === "Active").length
//             const inactive = settingsData.projects.filter((p) => p.status === "Inactive").length
//             return `${total} total · ${active} active · ${inactive} inactive`
//         })(),
//     },

//     roadmaps: {
//         title: "Roadmaps",
//         buttonLabel: "New Roadmap",
//         columns: roadmapColumns,
//         data: settingsData.roadmaps,
//         stats: `${settingsData.roadmaps.length} roadmaps`,
//     },

//     pipeline: {
//         title: "Pipeline",
//         buttonLabel: "Add New Pipeline",
//         columns: pipelineColumns,
//         data: settingsData.pipeline,
//         stats: `${settingsData.pipeline.length} pipeline items`,
//     },
// }

/* ================= PAGE ================= */

const Page = () => {
    const [activeTab, setActiveTab] = useState(settingsTabs[0]?.id)

    const handleTabClick = (tab: any) => {
        setActiveTab(tab.id)
        console.log("Active tab:", tab.label)
    }

    return (
        <div className="content d-flex flex-column flex-column-fluid h-100">
            <div className="post d-flex flex-column-fluid">
                <div className="container-fluid">
                    <div className="card c-settings">
                        <div className="row h-100">
                            <div className="c-settings-nav col-md-3">
                                <ul className="nav nav-tabs nav-pills">
                                    {settingsTabs.map((tab, index) => {
                                        const isActive = activeTab === tab.id
                                        return (
                                            <li key={index} className="nav-item me-0 mb-md-2">
                                                <button
                                                    className={`nav-link btn btn-flex ${
                                                        isActive ? "active" : ""
                                                    }`}
                                                    onClick={() => handleTabClick(tab)}
                                                >
                                                    <span className="menu-icon">
                                                        <span className="material-symbols-outlined">
                                                            {tab.iconType}
                                                        </span>
                                                    </span>
                                                    <span className="d-flex flex-column align-items-start">
                                                        <span className="menu-title">
                                                            {tab.label}
                                                        </span>
                                                        <span className="menu-desc">
                                                            {tab.description}
                                                        </span>
                                                    </span>
                                                </button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="c-settings-tab-content col-md-9">
                                <div className="tab-content">
                                    <div className="tab-pane fade active show">
                                        <div className="card"></div>
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

export default Page
