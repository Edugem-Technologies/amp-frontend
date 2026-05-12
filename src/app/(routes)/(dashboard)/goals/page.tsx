"use client"
import DragAccordionBoard from "@/app/components/common/DragAccordionBoard"
import SlideOverInnerMenu from "@/app/components/common/SlideOverInnerMenu"
import { Amp2Data } from "@/fixtures/Amp2Data"
import { SLIDE_MENU_DATA } from "@/fixtures/NotesData"
import { useState } from "react"
import { MenuType } from "../notes/page"

export default function Page() {
    const [openMenu, setOpenMenu] = useState<MenuType>(null)
    const toggleMenu = (menu: MenuType) => {
        setOpenMenu((prev) => (prev === menu ? null : menu))
    }

    const openProjects = () => setOpenMenu("open-sections")

    const openSectionsDropdown = () => setOpenMenu("open-sections")
    return (
        <div className="amp-2-wrapper  h-100 content d-flex flex-column flex-column-fluid pb-0">
            <div className="post d-flex flex-column-fluid">
                <div className="container-fluid p-0 pages amp amp-2">
                    <div className="g-5 gx-xxl-8">
                        <div className="fences columns">
                            <DragAccordionBoard data={Amp2Data} />
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
