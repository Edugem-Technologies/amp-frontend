"use client"

import HorizontalView from "@/app/components/common/HorizontalView"
import SlideOverInnerMenu from "@/app/components/common/SlideOverInnerMenu"
import { useAppContext } from "@/app/context/AppContext"
import { NOTES_DATA, SLIDE_MENU_DATA } from "@/fixtures/NotesData"
import { CONFIG } from "@/utils/Constants"
import { useEffect, useState } from "react"

export type MenuType = "sections" | "projects" | "open-sections" | null

export default function Page() {
    const { layout, setLayout } = useAppContext()

    useEffect(() => {
        setLayout?.(CONFIG.LAYOUT.HORIZONTAL)
    }, [setLayout])

    const [openMenu, setOpenMenu] = useState<MenuType>(null)

    const toggleMenu = (menu: MenuType) => {
        setOpenMenu((prev) => (prev === menu ? null : menu))
    }

    const openProjects = () => {
        setOpenMenu("open-sections")
    }

    const openSectionsDropdown = () => {
        setOpenMenu("open-sections")
    }

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
                                                    <HorizontalView data={NOTES_DATA} />
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

            <div className="d-flex gap-4 horizontal-view">
                <SlideOverInnerMenu
                    title="Sections"
                    variation="v-mirrored"
                    btnLabel="Open Projects"
                    tasks={SLIDE_MENU_DATA.sections}
                    isOpen={openMenu === "sections"}
                    onToggle={() => toggleMenu("sections")}
                    onButtonClick={openProjects}
                />

                <SlideOverInnerMenu
                    title="Projects"
                    variation="btm-right"
                    btnLabel="Choose Section"
                    tasks={SLIDE_MENU_DATA.projects}
                    isOpen={openMenu === "projects"}
                    onToggle={() => toggleMenu("projects")}
                    onButtonClick={openSectionsDropdown}
                />

                <SlideOverInnerMenu
                    title="Choose Section"
                    variation="v-open-sections"
                    tasks={SLIDE_MENU_DATA.dropdownSelector}
                    isOpen={openMenu === "open-sections"}
                    onToggle={() => toggleMenu("open-sections")}
                />
            </div>
        </div>
    )
}
