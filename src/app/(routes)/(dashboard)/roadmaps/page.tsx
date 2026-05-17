"use client"

import HorizontalView from "@/app/components/common/HorizontalView"
import VerticalView from "@/app/components/common/VerticalView"
import { useAppContext } from "@/app/context/AppContext"
import { FENCES_FIXTURE } from "@/fixtures/GlobalData"
import { CONFIG, headerActions } from "@/utils/Constants"
import { useEffect } from "react"

export default function Page() {
    const { layout, setLayout } = useAppContext()

    useEffect(() => {
        setLayout?.(CONFIG.LAYOUT.HORIZONTAL)
    }, [setLayout])

    return (
        <div className="content d-flex flex-column flex-column-fluid pb-0">
            <div className="post d-flex flex-column-fluid">
                <div className="container-fluid pages m-roadmaps p-0">
                    <div className="g-5 gx-xxl-8">
                        <div className="tab-content text-start">
                            <div className="position-relative">
                                {/* Vertical View */}
                                <div
                                    className={`layout-fade-wrapper ${
                                        layout === CONFIG.LAYOUT.VERTICAL
                                            ? "layout-visible"
                                            : "layout-hidden"
                                    }`}
                                >
                                    <div className="horizontal-roadmap">
                                        <VerticalView data={FENCES_FIXTURE} />
                                    </div>
                                </div>

                                {/* Horizontal View */}
                                <div
                                    className={`layout-fade-wrapper ${
                                        layout === CONFIG.LAYOUT.HORIZONTAL
                                            ? "layout-visible"
                                            : "layout-hidden"
                                    }`}
                                >
                                    <div className="text-left">
                                        <div className="board-container kanban-v2">
                                            <div className="board">
                                                <div className="tab-people jkanban_roadmaps">
                                                    <div className="kanban-container">
                                                        <HorizontalView
                                                            data={FENCES_FIXTURE}
                                                            headerActions={headerActions.filter(
                                                                (action) =>
                                                                    action.id !== "settings" &&
                                                                    action.id !== "replay",
                                                            )}
                                                        />
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
            </div>
        </div>
    )
}
