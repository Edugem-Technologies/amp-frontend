"use client"
import SlideOverInnerMenu from "@/app/components/common/SlideOverInnerMenu"
import TalendarDraggable from "@/app/components/common/TalendarDraggable"
import { SLIDE_MENU_DATA } from "@/fixtures/NotesData"
import React, { useState } from "react"
import { MenuType } from "../notes/page"

const Page = () => {
    const [openMenu, setOpenMenu] = useState<MenuType>(null)
    const toggleMenu = (menu: MenuType) => {
        setOpenMenu((prev) => (prev === menu ? null : menu))
    }

    const openProjects = () => setOpenMenu("open-sections")

    const openSectionsDropdown = () => setOpenMenu("open-sections")

    return (
        <div className="content d-flex flex-column flex-column-fluid p-0">
            <div className="post d-flex flex-column-fluid">
                <div className="container-fluid p-0 pages talendar">
                    <div className="g-5 gx-xxl-8">
                        <div className="tldr">
                            <div className="c-left">
                                <TalendarDraggable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex gap-4 horizontal-view">
                {/* Sections Menu */}
                <SlideOverInnerMenu
                    title="Sections"
                    variation="v-mirrored"
                    btnLabel="Open Projects"
                    tasks={SLIDE_MENU_DATA.sections}
                    isOpen={openMenu === "sections"}
                    onToggle={() => toggleMenu("sections")}
                    onButtonClick={openProjects}
                />

                {/* Projects Menu */}
                <SlideOverInnerMenu
                    title="Projects"
                    variation="btm-right"
                    btnLabel="Choose Section"
                    tasks={SLIDE_MENU_DATA.projects}
                    isOpen={openMenu === "projects"}
                    onToggle={() => toggleMenu("projects")}
                    onButtonClick={openSectionsDropdown}
                />

                {/* Open Sections Dropdown */}
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

export default Page
