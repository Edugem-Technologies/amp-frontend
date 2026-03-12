"use client"
import DragSortableCards from "@/app/components/card/DragSortableCards"
import { WORK_SCHEDULE_BOARD } from "@/fixtures/TalendarData"
import React, { useState } from "react"

const Page = () => {
    const [boardScheduleData, setBoardScheduleData] = useState(WORK_SCHEDULE_BOARD)
    const [activeRoutineBoard, setActiveRoutineBoard] = useState<string | null>(null)

    const headerActions = [
        {
            id: "add",
            icon: "add",
            onClick: (fenceId: string) => {
                console.log("Add clicked for fence:", fenceId)
            },
        },
        {
            id: "routine",
            icon: "replay",
            onClick: (fenceId: string) => {
                setActiveRoutineBoard((prev) => (prev === fenceId ? null : fenceId))
            },
        },
    ]

    return (
        <div className="d-flex gap-4 horizontal-view container-wrapper talendar-wrapper">
            {boardScheduleData?.map((fence) => (
                <DragSortableCards
                    key={fence.id}
                    id={fence.id}
                    title={"ashish"}
                    items={fence.taskCheckList[0]}
                    onChange={(items) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        setBoardScheduleData((prev) =>
                            prev.map((f) =>
                                f.id === fence.id ? { ...f, taskCheckList: [items] } : f,
                            ),
                        )
                    }}
                    actions={headerActions}
                    routineData={fence.routineData}
                    isRoutineOpen={activeRoutineBoard === fence.id}
                />
            ))}
        </div>
    )
}

export default Page
