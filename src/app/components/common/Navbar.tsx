"use client"

import { useState } from "react"
import Select, { components, DropdownIndicatorProps, MenuListProps } from "react-select"
import useScroll from "@/app/hooks/useScroll"
import UserDropdown from "./UserDropdown"
import { useAppContext } from "@/app/context/AppContext"
import TextInputField from "../input/TextInput"
import SearchIcon from "@mui/icons-material/Search"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import BaseStaticSelect from "../input/BaseStaticSelect"
import { Option } from "@/types/components/ReactSelect"
import { filterData } from "@/fixtures/CheckboxFilterData"

const DropdownIndicator = (props: DropdownIndicatorProps) => {
    return (
        <components.DropdownIndicator {...props}>
            <KeyboardArrowDownIcon />
        </components.DropdownIndicator>
    )
}

const FlexMenuListCheckbox = (props: MenuListProps) => {
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
    const [isCatActive, setIsCatActive] = useState<boolean>(false)
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false)
    const [layout, setLayout] = useState<"horizontal" | "vertical">("horizontal")
    const [selectedRoadmaps, setSelectedRoadmaps] = useState<Option[]>([])

    const roadmapOptions = [
        {
            label: "Outmin",
            value: "outmin",
            data: { key: "outmin" },
        },
        {
            label: "Xyz",
            value: "xyz",
            data: { key: "xyz" },
        },
        {
            label: "Customs Windows",
            value: "customs_windows",
            data: { key: "customs_windows" },
        },
        {
            label: "Splink",
            value: "splink",
            data: { key: "splink" },
        },
        {
            label: "Workflow",
            value: "workflow",
            data: { key: "workflow" },
        },
        {
            label: "Linkle",
            value: "linkle",
            data: { key: "linkle" },
        },
    ]

    return (
        <nav className={`navbar d-flex align-items-center ${position > 120 ? "shadow-sm" : ""}`}>
            {/* Sidebar toggle */}
            <button
                className={`btn btn-sm shadow-sm p-0 sidebar-toggle-button ${
                    sidebarCollapse ? "rotate-180" : ""
                }`}
                onClick={() => setSidebarCollapse((prev) => !prev)}
            >
                <span className="svg-icon svg-icon-2">
                    <img src="/icons/arrow.svg" alt="" />
                </span>
            </button>

            <div className="navbar-wrapper d-flex align-items-center justify-content-between w-100">
                {/* left bar */}
                <div className="nav-left-bar d-flex align-items-center gap-3 mx-4">
                    <TextInputField
                        isRequired
                        type="text"
                        autoComplete="false"
                        className="custom-input"
                        inplaceIcon={<SearchIcon sx={{ color: "#a1a5b7" }} />}
                        placeholder="Search..."
                        inputContainerClass="inplace-input-wrapper"
                    />

                    <div className="filter-dropdown">
                        <Select
                            options={[{ value: "filters", label: "Filters" }]}
                            components={{
                                MenuList: FlexMenuListCheckbox,
                                IndicatorSeparator: () => null,
                                DropdownIndicator,
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
                    </div>

                    <div className="category-filter-btn">
                        <button
                            className={isCatActive ? "active" : ""}
                            onClick={() => setIsCatActive((prev) => !prev)}
                        >
                            ML
                        </button>
                    </div>

                    <div className="category-filter-btn timer-filter-btn">
                        <button
                            className={isTimerActive ? "active" : ""}
                            onClick={() => setIsTimerActive((prev) => !prev)}
                        >
                            <AccessTimeIcon />
                        </button>
                    </div>
                </div>

                {/* right bar */}
                <div className="nav-right-bar d-flex align-items-center gap-3">
                    <div className="ve-hr-selector-wrapper d-flex gap-3 align-items-center">
                        <button
                            className={`hr-btn ${layout === "horizontal" ? "hr-btn-active " : ""}`}
                            onClick={() => setLayout("horizontal")}
                        >
                            Horizontal
                        </button>

                        <button
                            className={`ve-btn ${layout === "vertical" ? "ve-btn-active " : ""}`}
                            onClick={() => setLayout("vertical")}
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
                            isCheckBoxDrodowns={true}
                        />
                    </div>
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

                    <UserDropdown />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
