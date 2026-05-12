/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from "react"
import { settingsTabs } from "@/fixtures/SettingsData"
import GeneralSettings from "@/app/components/settings/GeneralSettings"
import Team from "@/app/components/settings/Team"
import Projects from "@/app/components/settings/Projects"

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
                                    <div
                                        key={activeTab}
                                        className={`tab-pane fade show active tab-pane-custom`}
                                    >
                                        {activeTab === "general" && <GeneralSettings />}

                                        {activeTab === "team" && <Team />}

                                        {activeTab === "projects" && <Projects />}
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
