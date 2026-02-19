"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Option } from "@/types/components/ReactSelect"
import { SLIDE_MENU_DATA } from "@/fixtures/NotesData"
import BaseStaticSelect from "../input/BaseStaticSelect"
import { DropdownSelectorItem, SlideTask } from "@/types/common/Notes"

type Props = {
    title: string
    variation: "btm-right" | "v-mirrored" | "v-open-sections"
    btnLabel?: string
    tasks: SlideTask[] | DropdownSelectorItem[]
    isOpen: boolean
    onToggle: () => void
    onButtonClick?: () => void
}

const SlideOverInnerMenu: React.FC<Props> = ({
    title,
    variation,
    btnLabel,
    tasks,
    isOpen,
    onToggle,
    onButtonClick,
}) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null)

    // Convert dropdownSelector → ReactSelect options
    const dropdownOptions: Option[] = useMemo(() => {
        return SLIDE_MENU_DATA.dropdownSelector.map((item) => ({
            label: item.label,
            value: item.id,
            data: item,
        }))
    }, [])

    useEffect(() => {
        const className = `show-slide-over-inner-menu-${variation}`

        if (isOpen) {
            document.body.classList.add(className)
        } else {
            document.body.classList.remove(className)
        }

        return () => {
            document.body.classList.remove(className)
        }
    }, [isOpen, variation])

    return (
        <div className={`slide-over-inner-menu ${variation} ${isOpen ? "open" : ""}`}>
            <div>
                {/* Header */}
                <p className="title d-flex justify-content-between">{title}</p>

                {/* Dropdown Variation */}
                {variation === "v-open-sections" && (
                    <div className="dropdown-container">
                        <BaseStaticSelect
                            options={dropdownOptions}
                            selectedOptionValue={selectedOption}
                            onSelected={(option) => setSelectedOption(option as Option)}
                            isMulti={false}
                            placeholder="Select Section"
                            className="w-100"
                        />
                    </div>
                )}

                {/* Task List Variations */}
                {variation !== "v-open-sections" && (
                    <div className="tasks">
                        {tasks.map((task) => (
                            <div key={task.id} className="task">
                                {"title" in task ? task.title : task.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Optional Button */}
            {btnLabel && (
                <button className="optional-btn" onClick={onButtonClick}>
                    {btnLabel}
                </button>
            )}

            {/* Floating Toggle Button */}
            <button className="btn-floating" onClick={onToggle}>
                <span className="material-symbols-outlined default">
                    {variation === "v-mirrored"
                        ? "tab_inactive"
                        : variation === "v-open-sections"
                          ? "expand_more"
                          : "menu"}
                </span>

                <span className="material-symbols-outlined close">close</span>
            </button>
        </div>
    )
}

export default SlideOverInnerMenu
