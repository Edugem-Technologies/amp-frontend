import React, { useState } from "react"
import DragSortableCards from "../card/DragSortableCards"
import { Fence, TaskCheckItem } from "@/types/components/DragSortableCards"
const HorizontalView = ({ data }: { data: Fence[] }) => {
    const [fences, setFences] = useState<Fence[]>(data)

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
                console.log("fenceIdfenceIdfenceId", fenceId)
            },
        },
    ]

    return (
        <div className="d-flex gap-4 horizontal-view align-items-center">
            {fences.map((fence) => (
                <DragSortableCards
                    key={fence.id}
                    id={fence.id}
                    title={fence.label}
                    items={fence.taskCheckList}
                    onChange={(items) => updateFenceItems(fence.id, items as TaskCheckItem[])}
                    actions={headerActions}
                />
            ))}
        </div>
    )
}

export default HorizontalView
