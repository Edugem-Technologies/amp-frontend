"use client"

import { useEffect, useRef, useState } from "react"

type FiltersMenuProps = {
    roadmap_projects: string[]
    c_team: string[]
    c_tag: string[]
    c_statuses?: string[]
    c_priority?: string[]
}

const FiltersMenu = ({
    roadmap_projects,
    c_team,
    c_tag,
    c_statuses = [],
    c_priority = [],
}: FiltersMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="ms-1 f-filters position-relative" ref={menuRef}>
            {/*begin::Trigger*/}
            <button
                type="button"
                className="btn btn-light btn-menu size-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                Filters
            </button>
            {/*end::Trigger*/}

            {/*begin::Company Menu*/}
            {isOpen && (
                <div
                    className="menu menu-sub menu-sub-dropdown show"
                    id="kt_menu_filters"
                    style={{
                        display: "block",
                        position: "absolute",
                        zIndex: 1000,
                        width: "875px",
                    }}
                >
                    {/*begin::Form*/}
                    <div className="px-7 py-5 bg-white rounded">
                        <div className="row">
                            <div className="col">
                                {/*begin::company options*/}
                                <div className="text-gray-900 text-hover-primary fs-6 fw-bolder">
                                    Priority
                                </div>

                                <div className="separator border-gray-200 mt-2 mb-4"></div>

                                {/*begin::Options*/}
                                <div className="">
                                    {c_priority.map((value, index) => (
                                        <label
                                            key={index}
                                            className="form-check form-check-sm form-check-custom form-check-solid mb-3"
                                        >
                                            <input
                                                className="form-check-input"
                                                name="priority[]"
                                                type="checkbox"
                                                value={value}
                                            />

                                            <span className="form-check-label">{value}</span>
                                        </label>
                                    ))}
                                </div>
                                {/*end::Options*/}
                                {/*end::company options*/}
                            </div>

                            <div className="col">
                                {/*begin:: projects options*/}
                                <div className="min-w-150px">
                                    <div className="text-gray-900 text-hover-primary fs-6 fw-bolder">
                                        Projects
                                    </div>

                                    <div className="separator border-gray-200 mt-2 mb-4"></div>

                                    {/*begin::Options*/}
                                    <div className="">
                                        {roadmap_projects.map((value, index) => (
                                            <label
                                                key={index}
                                                className="form-check form-check-sm form-check-custom form-check-solid mb-3"
                                            >
                                                <input
                                                    className="form-check-input"
                                                    name="company[]"
                                                    type="checkbox"
                                                    value={value}
                                                />

                                                <span className="form-check-label">{value}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {/*end::Options*/}
                                </div>
                                {/*end::projects options*/}
                            </div>

                            <div className="col">
                                {/*begin::team options*/}
                                <div className="min-w-150px">
                                    <div className="text-gray-900 text-hover-primary fs-6 fw-bolder">
                                        Team
                                    </div>

                                    <div className="separator border-gray-200 mt-2 mb-4"></div>

                                    {/*begin::Options*/}
                                    <div className="">
                                        <div className="">
                                            {c_team.map((value, index) => (
                                                <label
                                                    key={index}
                                                    className="form-check form-check-sm form-check-custom form-check-solid mb-3"
                                                >
                                                    <input
                                                        className="form-check-input"
                                                        name="company[]"
                                                        type="checkbox"
                                                        value={value}
                                                    />

                                                    <span className="form-check-label">
                                                        {value}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    {/*end::Options*/}
                                </div>
                                {/*end::team options*/}
                            </div>

                            <div className="col">
                                {/*begin::company options*/}
                                <div className="min-w-150px">
                                    <div className="text-gray-900 text-hover-primary fs-6 fw-bolder">
                                        Tags
                                    </div>

                                    <div className="separator border-gray-200 mt-2 mb-4"></div>

                                    {/*begin::Options*/}
                                    <div className="">
                                        <div className="">
                                            {c_tag.map((value, index) => (
                                                <label
                                                    key={index}
                                                    className="form-check form-check-sm form-check-custom form-check-solid mb-3"
                                                >
                                                    <input
                                                        className="form-check-input"
                                                        name="company[]"
                                                        type="checkbox"
                                                        value={value}
                                                    />

                                                    <span className="form-check-label">
                                                        {value}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    {/*end::Options*/}
                                </div>
                                {/*end::company options*/}
                            </div>

                            <div className="col">
                                {/*begin::company options*/}
                                <div className="min-w-150px">
                                    <div className="text-gray-900 text-hover-primary fs-6 fw-bolder">
                                        Statuses
                                    </div>

                                    <div className="separator border-gray-200 mt-2 mb-4"></div>

                                    {/*begin::Options*/}
                                    <div className="">
                                        {c_statuses.map((value, index) => (
                                            <label
                                                key={index}
                                                className="form-check form-check-sm form-check-custom form-check-solid mb-3"
                                            >
                                                <input
                                                    className="form-check-input"
                                                    name="statuses[]"
                                                    type="checkbox"
                                                    value={value}
                                                />

                                                <span className="form-check-label">{value}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {/*end::Options*/}
                                </div>
                                {/*end::company options*/}
                            </div>
                        </div>

                        <div className="separator border-gray-200 mt-2 mb-4"></div>

                        {/*begin::Actions*/}
                        <div className="d-flex justify-content-end">
                            <button
                                type="reset"
                                className="btn btn-sm btn-light btn-active-light-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                Reset
                            </button>
                        </div>
                        {/*end::Actions*/}
                    </div>
                    {/*end::Form*/}
                </div>
            )}
            {/*end::Company Menu*/}
        </div>
    )
}

export default FiltersMenu
