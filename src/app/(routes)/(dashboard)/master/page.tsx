"use client"
import HorizontalView from "@/app/components/common/HorizontalView"
import { useAppContext } from "@/app/context/AppContext"
import { MASTER_TASKS } from "@/fixtures/MasterData"
import { CONFIG, headerActions } from "@/utils/Constants"
import { useEffect } from "react"

export default function Page() {
    const { layout, setLayout } = useAppContext()
    useEffect(() => {
        setLayout && setLayout(CONFIG.LAYOUT.HORIZONTAL)
    }, [])

    return (
        <div className="content d-flex flex-column flex-column-fluid pb-0">
            <div className="post d-flex flex-column-fluid">
                <div className="container-fluid pages m-roadmaps p-0">
                    <div className="g-5 gx-xxl-8">
                        <div className="tab-content text-start">
                            <div className="text-left">
                                <div className="board-container kanban-v2">
                                    <div className="board">
                                        <div className="tab-people jkanban_roadmaps">
                                            <div className="kanban-container">
                                                {layout === CONFIG.LAYOUT.HORIZONTAL && (
                                                    <HorizontalView
                                                        data={MASTER_TASKS}
                                                        headerActions={headerActions.filter(
                                                            (action) => action.id !== "replay",
                                                        )}
                                                    />
                                                )}
                                            </div>
                                        </div>
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
