"use client"

import DragSortableCards from "@/app/components/card/DragSortableCards"
import SlideOverInnerMenu from "@/app/components/common/SlideOverInnerMenu"

import { NOTES_DATA, SLIDE_MENU_DATA } from "@/fixtures/NotesData"

import { Fence, TaskCheckItem } from "@/types/components/DragSortableCards"

import React, { useState } from "react"

type MenuType = "sections" | "projects" | "open-sections" | null

const Page = () => {
    const [fences, setFences] = useState<Fence[]>(NOTES_DATA)

    const [openMenu, setOpenMenu] = useState<MenuType>(null)

    const updateFenceItems = (fenceId: string, items: TaskCheckItem[]) => {
        setFences((prev) =>
            prev.map((f) =>
                f.id === fenceId
                    ? {
                          ...f,
                          taskCheckList: items,
                      }
                    : f,
            ),
        )
    }

    const toggleMenu = (menu: MenuType) => {
        setOpenMenu((prev) => (prev === menu ? null : menu))
    }

    const openProjects = () => setOpenMenu("open-sections")

    const openSectionsDropdown = () => setOpenMenu("open-sections")

    const headerActions = [
        {
            id: "add",
            icon: "add",

            onClick: (fenceId: string) => console.log("Add clicked:", fenceId),
        },

        {
            id: "settings",
            icon: "settings",

            onClick: (fenceId: string) => console.log("Settings clicked:", fenceId),
        },
    ]

    return (
        <section className="team-section-wrapper container-wrapper container-fluid h-100">
            <div className="d-flex gap-4 horizontal-view">
                {fences.map((fence) => (
                    <DragSortableCards
                        key={fence.id}
                        id={fence.id}
                        userImage={fence.userImage}
                        title={fence.userName as string}
                        items={fence.taskCheckList}
                        onChange={(items) => updateFenceItems(fence.id, items as TaskCheckItem[])}
                        actions={headerActions}
                    />
                ))}

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
        </section>
    )
}

export default Page
