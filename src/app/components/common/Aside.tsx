"use client"
import { useAppContext } from "@/app/context/AppContext"
import { SidebarItemsType } from "@/types/components/Aside"
import { Sidebar } from "react-pro-sidebar"
import RenderMenuItem from "./RenderMenuItem"
import { useState } from "react"
import Offcanvas from "react-bootstrap/Offcanvas"
import Image from "next/image"

const Aside = () => {
    const { sidebarCollapse } = useAppContext()

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
        { label: "Dashboard", href: "/dashboard", icon: "/icons/sidenav-icons/dashboard.svg" },
        { label: "Roadmaps", href: "/roadmaps", icon: "/icons/sidenav-icons/timeline.svg" },
        { label: "Pipeline", href: "/pipeline", icon: "/icons/sidenav-icons/pipeline.svg" },
        { label: "Team", href: "/team", icon: "/icons/sidenav-icons/user-group.svg" },
    ]

    const bottomSidebarItems: SidebarItemsType[] = [
        { label: "Favorites", href: "", icon: "/icons/sidenav-icons/star-dark.svg" },
        { label: "Mirrored", href: "", icon: "/icons/sidenav-icons/copy.svg" },
        { label: "Requests", href: "", icon: "/icons/sidenav-icons/bolt-dark.svg" },
        { label: "Assistants", href: "", icon: "/icons/sidenav-icons/sensor_occupied.svg" },
    ]

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow((prev) => !prev)

    return (
        <Sidebar
            collapsed={sidebarCollapse}
            breakPoint="lg"
            collapsedWidth="85px"
            transitionDuration={500}
            className={`sidebar ${sidebarCollapse ? "" : "show"}`}
        >
            <div
                className="mt-2  mb-2 d-flex align-items-center justify-content-between positon-relative sidebar-logo"
                id="kt_app_sidebar_logo"
            >
                <Image
                    src="/images/logos/brand-logo-primary.svg"
                    alt="Brand logo"
                    width={130}
                    height={50}
                    priority
                />
            </div>

            <div className="d-flex flex-column justify-content-between flex-grow-1 mb-10">
                <RenderMenuItem sidebarItems={topSidebarItems} sidebarCollapse={sidebarCollapse} />

                <RenderMenuItem
                    sidebarItems={bottomSidebarItems}
                    sidebarCollapse={sidebarCollapse}
                    handleShow={handleShow}
                    isDrawerBar={true}
                />
            </div>

            {/* drawer nav */}
            <Offcanvas show={show} onHide={handleClose}>
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
