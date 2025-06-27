import { SidebarItemsType } from "@/types/components/aside"
import Link from "next/link"
import { Sidebar } from "react-pro-sidebar"
import RenderMenuItem from "./RenderMenuItem"
import { useAppContext } from "@/app/context/AppContext"

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
    const sidebarItems: SidebarItemsType[] = [
        { label: "Home", href: "/", icon: "/icons/sample.svg" },
        { label: "Profile", href: "/profile", icon: "/icons/sample.svg" },
        { label: "Users", href: "/users", icon: "/icons/sample.svg" },
        { label: "File Upload", href: "/file-upload", icon: "/icons/sample.svg" },
        { label: "Roles", href: "/roles", icon: "/icons/sample.svg" },
        { label: "Reports", href: "/reports", icon: "/icons/sample.svg" },
        {
            label: "Auth",
            icon: "/icons/sample.svg",
            sidebarItems: [
                { label: "Login", href: "/login" },
                { label: "Signup", href: "/signup" },
            ],
        },
    ]
    return (
        <Sidebar
            collapsed={sidebarCollapse}
            breakPoint="lg"
            collapsedWidth="85px"
            transitionDuration={500}
            className={`sidebar ${sidebarCollapse ? "" : "show"}`}
        >
            <div
                className="d-flex align-items-center justify-content-between positon-relative sidebar-logo"
                id="kt_app_sidebar_logo"
            >
                <Link prefetch={false} legacyBehavior href="/">
                    <a role="button" className="m-2">
                        {sidebarCollapse ? (
                            <img
                                alt="Logo"
                                src="/images/logos/favicon/favicon.ico"
                                className="h-30px"
                            />
                        ) : (
                            <img
                                alt="Logo"
                                src="/images/logos/logo.svg"
                                className="h-40px app-sidebar-logo-default"
                            />
                        )}
                    </a>
                </Link>
            </div>
            <RenderMenuItem sidebarItems={sidebarItems} sidebarCollapse={sidebarCollapse} />
        </Sidebar>
    )
}

export default Aside
