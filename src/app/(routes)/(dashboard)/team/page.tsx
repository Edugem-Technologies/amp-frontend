"use client"
import DragSortableCards from "@/app/components/card/DragSortableCards"
import TaskTableView from "@/app/components/common/TaskTableView"
import { useAppContext } from "@/app/context/AppContext"
import { TASK_SECTIONS, TEAM_TASKS } from "@/fixtures/TeamData"
import { Fence, TaskCheckItem } from "@/types/components/DragSortableCards"
import { CONFIG } from "@/utils/Constants"
import React, { useEffect, useState } from "react"

const Page = () => {
    const [fences, setFences] = useState<Fence[]>(TEAM_TASKS)
    const { layout, setLayout } = useAppContext()
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
        {
            id: "settings",
            icon: "settings",
            onClick: (fenceId: string) => {
                console.log("Settings clicked for fence:", fenceId)
            },
        },
    ]

    useEffect(() => {
        setLayout && setLayout(CONFIG.LAYOUT.COLUMNS)
    }, [])

    return (
        <section className="team-section-wrapper  container-wrapper container-fluid  h-100">
            {layout === CONFIG.LAYOUT.COLUMNS && (
                <div className="d-flex gap-4 horizontal-view ">
                    {fences.map((fence) => (
                        <DragSortableCards
                            key={fence.id}
                            id={fence.id}
                            userImage={fence.userImage}
                            title={fence.userName as string}
                            items={fence.taskCheckList}
                            onChange={(items) =>
                                updateFenceItems(fence.id, items as TaskCheckItem[])
                            }
                            actions={headerActions}
                        />
                    ))}
                </div>
            )}

            {layout === CONFIG.LAYOUT.TABLE && (
                <div className="team-task-table">
                    <TaskTableView sections={TASK_SECTIONS} />
                </div>
            )}
        </section>
    )
}

export default Page
