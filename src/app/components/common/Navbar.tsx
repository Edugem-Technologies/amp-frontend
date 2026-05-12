"use client"

import { useState } from "react"
import { components, MenuListProps } from "react-select"
import useScroll from "@/app/hooks/useScroll"
import UserDropdown from "./UserDropdown"
import { useAppContext } from "@/app/context/AppContext"
import TextInputField from "../input/TextInput"
import BaseStaticSelect from "../input/BaseStaticSelect"
import { Option } from "@/types/components/ReactSelect"
import { filterData } from "@/fixtures/CheckboxFilterData"
import { CONFIG } from "@/utils/Constants"
import { usePathname } from "next/navigation"
import { roadmapOptions } from "@/fixtures/NavbarMenu"
import FiltersMenu from "./FiltersMenu"

export const FlexMenuListCheckbox = (props: MenuListProps) => {
    const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({})

    const toggleValue = (column: string, value: string) => {
        setSelectedValues((prev) => {
            const columnValues = prev[column] || []
            if (columnValues.includes(value)) {
                return { ...prev, [column]: columnValues.filter((v) => v !== value) }
            } else {
                return { ...prev, [column]: [...columnValues, value] }
            }
        })
    }

    const resetAll = () => {
        setSelectedValues({})
    }

    return (
        <components.MenuList {...props}>
            <div className="filter-flex-wrapper">
                {Object.keys(filterData).map((column) => (
                    <div key={column} className="filter-column">
                        <div className="filter-column-header">{column}</div>
                        <div className="filter-column-items">
                            {filterData[column].map((item) => (
                                <label key={item} className="filter-item">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={selectedValues[column]?.includes(item) || false}
                                        onChange={() => toggleValue(column, item)}
                                    />
                                    <span>{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="filter-reset">
                <button onClick={resetAll}>Reset Filters</button>
            </div>
        </components.MenuList>
    )
}

const Navbar = () => {
    const position = useScroll()
    const { setSidebarCollapse, sidebarCollapse } = useAppContext()

    const {
        isCatActive,
        setIsCatActive,
        isTimerActive,
        setIsTimerActive,
        layout,
        setLayout,
        selectedRoadmaps,
        setSelectedRoadmaps,
    } = useAppContext()
    const pathname = usePathname()

    const roadmap_projects = ["Outmin", "XYZ", "Customs Window", "Splink", "Workflow", "Linkle"]

    const c_team = ["Jenna", "Mark", "Tom", "Greg", "Keith", "Dayo", "Florencia"]

    const c_tag = ["Design", "Develop", "Finance"]

    const c_statuses = ["Pending", "Completed", "Not Started", "Problem", "In Progress", "On Hold"]

    const c_priority = ["Low", "Medium", "High"]

    return (
        <nav
            className={`container-fluid navbar d-flex align-items-center header align-items-stretch h-pipeline ${
                position > 120 ? "shadow-sm" : ""
            }`}
        >
            {/* Sidebar toggle */}
            {/* <button
                className={`btn btn-sm shadow-sm p-0 sidebar-toggle-button ${
                    sidebarCollapse ? "rotate-180" : ""
                }`}
                onClick={() => setSidebarCollapse((prev) => !prev)}
            >
                <span className="svg-icon svg-icon-2">
                    <img src="/icons/arrow.svg" alt="" />
                </span>
            </button> */}

            <div className="navbar-wrapper d-flex align-items-center justify-content-between w-100">
                {/* left bar */}
                <button
                    className={`btn btn-sm shadow-sm p-0 sidebar-toggle-button-sm ${
                        sidebarCollapse ? "rotate-180" : ""
                    }`}
                    onClick={() => setSidebarCollapse((prev) => !prev)}
                >
                    <span className="svg-icon svg-icon-2">
                        <img src="/icons/list.svg" alt="" width={20} />
                    </span>
                </button>
                <div className="nav-left-bar  align-items-center" style={{ gap: "6px" }}>
                    <TextInputField
                        isRequired
                        type="text"
                        autoComplete="false"
                        className="custom-input"
                        inplaceIcon={
                            <span
                                className="material-symbols-outlined"
                                style={{ color: "#a1a5b7", fontSize: "22px" }}
                            >
                                search
                            </span>
                        }
                        placeholder="Search..."
                        inputContainerClass="inplace-input-wrapper"
                    />

                    {/* <div className="filter-dropdown">
                        <Select
                            options={[{ value: "filters", label: "Filters" }]}
                            components={{
                                MenuList: FlexMenuListCheckbox,
                                IndicatorSeparator: () => null,
                            }}
                            isSearchable={false}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            placeholder="Filters"
                            menuPlacement="bottom"
                            menuShouldScrollIntoView={false}
                            styles={{
                                menu: (provided) => ({
                                    ...provided,
                                    width: "100%",
                                    maxHeight: "auto",
                                }),
                            }}
                        />
                    </div> */}
                    <FiltersMenu
                        roadmap_projects={roadmap_projects}
                        c_team={c_team}
                        c_tag={c_tag}
                        c_statuses={c_statuses}
                        c_priority={c_priority}
                    />

                    <div className="d-flex category-filter-btn">
                        <button
                            className={isCatActive ? "active" : ""}
                            onClick={() => setIsCatActive((prev) => !prev)}
                        >
                            ML
                        </button>
                    </div>

                    <div className=" category-filter-btn timer-filter-btn">
                        <button
                            className={`d-flex justify-content-center align-items-center ${
                                isTimerActive ? "active" : ""
                            }`}
                            onClick={() => setIsTimerActive((prev) => !prev)}
                        >
                            <span
                                className="material-symbols-sharp"
                                style={{ color: "#7e8299", fontSize: "20px" }}
                            >
                                schedule
                            </span>
                        </button>
                    </div>
                </div>

                {/* right bar */}
                <div className="nav-right-bar d-flex align-items-center s">
                    {pathname === CONFIG.PAGES.ROADMAPS && (
                        <>
                            <div className="ve-hr-selector-wrapper gap-2 align-items-center mx-2">
                                <button
                                    className={`hr-btn ${
                                        layout === CONFIG.LAYOUT.HORIZONTAL ? "hr-btn-active " : ""
                                    }`}
                                    onClick={() => setLayout && setLayout(CONFIG.LAYOUT.HORIZONTAL)}
                                >
                                    Horizontal
                                </button>

                                <button
                                    className={`ve-btn ${
                                        layout === CONFIG.LAYOUT.VERTICAL ? "ve-btn-active " : ""
                                    }`}
                                    onClick={() => setLayout && setLayout(CONFIG.LAYOUT.VERTICAL)}
                                >
                                    Vertical
                                </button>
                            </div>

                            <div className="roadmaps-selector">
                                <BaseStaticSelect
                                    placeholder="Roadmaps"
                                    isMulti={true}
                                    options={roadmapOptions}
                                    selectedOptionValue={selectedRoadmaps}
                                    onSelected={(data) => {
                                        setSelectedRoadmaps(data as Option[])
                                    }}
                                    isCheckBoxDropdowns={true}
                                />
                            </div>
                        </>
                    )}

                    {pathname === CONFIG.PAGES.TEAM && (
                        <>
                            <div className="ve-hr-selector-wrapper  gap-3 align-items-center">
                                <button
                                    className={`hr-btn ${
                                        layout === CONFIG.LAYOUT.COLUMNS ? "hr-btn-active " : ""
                                    }`}
                                    onClick={() => setLayout && setLayout(CONFIG.LAYOUT.COLUMNS)}
                                >
                                    Columns
                                </button>

                                <button
                                    className={`ve-btn ${
                                        layout === CONFIG.LAYOUT.TABLE ? "ve-btn-active " : ""
                                    }`}
                                    onClick={() => setLayout && setLayout(CONFIG.LAYOUT.TABLE)}
                                >
                                    Table
                                </button>
                            </div>
                        </>
                    )}

                    <UserDropdown />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
