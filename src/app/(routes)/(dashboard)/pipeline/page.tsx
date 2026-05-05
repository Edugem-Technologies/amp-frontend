"use client"
import DragSortableCards from "@/app/components/card/DragSortableCards"
import StatsOverviewWithChart from "@/app/components/common/StatsOverviewWithChart"
import { PIPELINE_DASHBOARD_DATA, PIPELINES_CHECKLIST } from "@/fixtures/PipelineData"
import { Fence, TaskCheckItem } from "@/types/components/DragSortableCards"
import React, { useState } from "react"

const Page = () => {
    const [fences, setFences] = useState<Fence[]>(PIPELINES_CHECKLIST)
    const { header, stats, chart, upcomingPlans } = PIPELINE_DASHBOARD_DATA

    const updateFenceItems = (fenceId: string, items: TaskCheckItem[]) => {
        setFences((prev) =>
            prev.map((f) => (f.id === fenceId ? { ...f, taskCheckList: items } : f)),
        )
    }

    const headerActions = [
        {
            id: "add",
            icon: "add",
            onClick: (fenceId: string) => {
                console.log("Add clicked for fence:", fenceId)
            },
        },
    ]

    const chartData = chart.points.map((p) => ({
        label: p.weekLabel,
        value: p.value,
    }))

    return (
        <section className="pipeline-wrapper d-flex gap-4">
            <div className="pipeline-stats">
                <StatsOverviewWithChart
                    header={header}
                    stats={stats}
                    currency={chart.currency}
                    chartData={chartData}
                />
                <div className="pipeline-upcoming">
                    <div className="pipeline-upcoming__header">
                        <p className="mb-0">{upcomingPlans.header.title}</p>
                        <span>{upcomingPlans.header.subtitle}</span>
                    </div>

                    <div className="task-list-container">
                        {upcomingPlans.items.map((item) => (
                            <div key={item.id} className="task-check-item">
                                <div className="task-content">
                                    <h5 className="mb-0">{item.title}</h5>
                                    <p className="mb-0">{item.subtitle}</p>
                                </div>

                                <div className="task-meta">
                                    <div className="task-avatars">
                                        {item.users.map((user) =>
                                            user.avatarUrl ? (
                                                <img key={user.id} src={user.avatarUrl} alt="" />
                                            ) : (
                                                <span key={user.id} className="avatar-fallback">
                                                    {user.initials}
                                                </span>
                                            ),
                                        )}
                                    </div>

                                    <span className="task-badge">{item.badgeCount}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="d-flex gap-4 horizontal-view main-dashboard-container  container-wrapper">
                {fences.map((fence) => (
                    <DragSortableCards
                        key={fence.id}
                        id={fence.id}
                        title={fence.label as string}
                        items={fence.taskCheckList}
                        onChange={(items) => updateFenceItems(fence.id, items as TaskCheckItem[])}
                        actions={headerActions}
                    />
                ))}
            </div>
        </section>
    )
}

export default Page
