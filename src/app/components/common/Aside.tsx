"use client"
import { useAppContext } from "@/app/context/AppContext"
import { SidebarItemsType } from "@/types/components/Aside"
import { Sidebar } from "react-pro-sidebar"
import RenderMenuItem from "./RenderMenuItem"
import { useEffect, useState } from "react"
import Offcanvas from "react-bootstrap/Offcanvas"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { CONFIG } from "@/utils/Constants"
import BaseStaticSelect from "../input/BaseStaticSelect"
import { roadmapOptions } from "@/fixtures/NavbarMenu"
import { Option } from "@/types/components/ReactSelect"
import TextInputField from "../input/TextInput"
import { FlexMenuListCheckbox } from "./Navbar"
import Select from "react-select"

const Aside = () => {
    const [isMobileView, setIsMobileView] = useState<boolean>(false)
    const { sidebarCollapse, setSidebarCollapse, show, setShow } = useAppContext()
    const pathname = usePathname()
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
    /**
     * @typedef {Object} SidebarItem
     * @property {string} label - The display name of the menu item.
     * @property {string} [href] - The URL path this menu item links to (if not a submenu).
     * @property {string} [className] - Optional CSS classes for styling the link.
     * @property {SidebarItem[]} [sidebarItems] - An optional array of submenu items for dropdown menus.
     */

    /**
     * Array representing the sidebar menu items and structure.
     * Each item can be a simple link or contain a submenu with nested links.
     *
     * @type {SidebarItem[]}
     * @example
     * const sidebarItems = [
     *   { label: "Home", href: "/" },
     *   { label: "Profile", href: "/profile" },
     *   {
     *     label: "Auth",
     *     sidebarItems: [
     *       { label: "Login", href: "/login" },
     *       { label: "Signup", href: "/signup" },
     *     ],
     *   },
     * ];
     */
    const topSidebarItems: SidebarItemsType[] = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: "space_dashboard",
            collapsable: true,
        },
        {
            label: "Roadmaps",
            href: "/roadmaps",
            icon: "view_timeline",
            collapsable: true,
        },
        { label: "Pipeline", href: "/pipeline", icon: "insights", collapsable: true },
        {
            label: "Team",
            href: "/team",
            icon: "people",
            collapsable: true,
        },
        // {
        //     label: "Notes",
        //     href: "/notes",
        //     icon: "notes",
        //     collapsable: true,
        // },
        // {
        //     label: "Talendar",
        //     href: "/talendar",
        //     icon: "calendar_today",
        //     collapsable: true,
        // },
        // {
        //     label: "Live Feed",
        //     href: "/live-feed",
        //     icon: "game",
        //     collapsable: true,
        // },
        // {
        //     label: "Amp 2",
        //     href: "/amp-2",
        //     icon: "amp",
        //     collapsable: true,
        // },
    ]

    const bottomSidebarItems: SidebarItemsType[] = [
        { label: "Favorites", href: "", icon: "star" },
        { label: "Mirrored", href: "", icon: "tab_inactive" },
        { label: "Requests", href: "", icon: "bolt" },
        { label: "Assistants", href: "", icon: "sensor_occupied" },
    ]

    // const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow((prev) => !prev)

    const collapseSideBar = () => {
        setSidebarCollapse(false)
    }

    const isActive = (url: string | undefined) => {
        if (!url) return false

        return pathname === url
    }
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 991px)")

        const handleResize = () => {
            setIsMobileView(mediaQuery.matches)
        }

        handleResize()

        mediaQuery.addEventListener("change", handleResize)

        return () => {
            mediaQuery.removeEventListener("change", handleResize)
        }
    }, [])
    return (
        <Sidebar
            collapsed={sidebarCollapse}
            breakPoint="lg"
            collapsedWidth="85px"
            transitionDuration={500}
            className={`sidebar ${sidebarCollapse ? "" : "show"}`}
        >
            <div className="d-flex align-items-center justify-content-between positon-relative sidebar-logo">
                <Image
                    src="/images/logos/amp-logo.svg"
                    alt="Brand logo"
                    width={135}
                    height={55}
                    priority
                />
            </div>

            <div className="content-filteration mb-2">
                <div className="nav-left-bar  gap-2 mx-4 d-flex flex-column gap-2 ">
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

                    <div className="filter-dropdown">
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
                    </div>

                    <div className="cat-filter-btn d-flex justify-content-between">
                        <button
                            className={`${isCatActive ? "active" : ""}`}
                            onClick={() => {
                                setIsCatActive((prev) => !prev)
                                collapseSideBar()
                            }}
                        >
                            ML
                        </button>

                        <button
                            className={`d-flex justify-content-center align-items-center ${
                                isTimerActive ? "active" : ""
                            }`}
                            onClick={() => {
                                setIsTimerActive((prev) => !prev)
                                collapseSideBar()
                            }}
                        >
                            <span
                                className="material-symbols-outlined"
                                style={{ color: "#a1a5b7", fontSize: "22px" }}
                            >
                                timer
                            </span>
                        </button>
                    </div>

                    {pathname === CONFIG.PAGES.ROADMAPS && (
                        <>
                            <div className="cat-filter-btn d-flex justify-content-between">
                                <button
                                    className={`hr-btn  ${
                                        layout === CONFIG.LAYOUT.HORIZONTAL ? "hr-btn-active " : ""
                                    }`}
                                    onClick={() => {
                                        setLayout && setLayout(CONFIG.LAYOUT.HORIZONTAL)
                                        collapseSideBar()
                                    }}
                                >
                                    Horizontal
                                </button>

                                <button
                                    className={`ve-btn flex-1 ${
                                        layout === CONFIG.LAYOUT.VERTICAL ? "ve-btn-active " : ""
                                    }`}
                                    onClick={() => {
                                        setLayout && setLayout(CONFIG.LAYOUT.VERTICAL)
                                        collapseSideBar()
                                    }}
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
                            <div className="cat-filter-btn d-flex ve-hr-selector-wrapper  gap-3 align-items-center">
                                <button
                                    className={`hr-btn ${
                                        layout === CONFIG.LAYOUT.COLUMNS ? "hr-btn-active" : ""
                                    }`}
                                    onClick={() => {
                                        setLayout && setLayout(CONFIG.LAYOUT.COLUMNS)
                                        collapseSideBar()
                                    }}
                                >
                                    Columns
                                </button>

                                <button
                                    className={`ve-btn ${
                                        layout === CONFIG.LAYOUT.TABLE ? "ve-btn-active" : ""
                                    }`}
                                    onClick={() => {
                                        setLayout && setLayout(CONFIG.LAYOUT.TABLE)
                                        collapseSideBar()
                                    }}
                                >
                                    Table
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div
                className="d-flex flex-column justify-content-between flex-grow-1"
                style={{ marginTop: "6px" }}
            >
                <RenderMenuItem
                    sidebarItems={topSidebarItems}
                    sidebarCollapse={sidebarCollapse}
                    collapseSideBar={collapseSideBar}
                    isMobileView={isMobileView}
                    isActive={isActive}
                />

                <RenderMenuItem
                    sidebarItems={bottomSidebarItems}
                    sidebarCollapse={sidebarCollapse}
                    handleShow={handleShow}
                    isDrawerBar={true}
                    isActive={isActive}
                />
            </div>

            <Offcanvas
                show={show || activeBottomMenu}
                onHide={handleClose}
                backdrop={false}
                className={`custom-offcanvas ${
                    sidebarCollapse ? "sidebar-collapsed" : "sidebar-open"
                }`}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you have
                    chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </Sidebar>
    )
}

export default Aside
