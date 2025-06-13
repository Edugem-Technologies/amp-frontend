"use client"
import { useAppContext } from "@/app/(routes)/context/AppContext"
import useScroll from "@/app/hooks/useScroll"
import UserDropdown from "./UserDropdown"

const Navbar = () => {
    const position = useScroll()
    const { setSidebarCollapse, sidebarCollapse } = useAppContext()

    return (
        <nav
            className={`navbar d-flex justify-content-end align-items-center ${
                position > 120 ? "shadow-sm " : ""
            }`}
        >
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
            <button
                className={`btn btn-sm shadow-sm me-auto ms-3 p-0 sidebar-toggle-button-sm ${
                    sidebarCollapse ? "rotate-180" : ""
                }`}
                onClick={() => setSidebarCollapse((prev) => !prev)}
            >
                <span className="svg-icon svg-icon-2">
                    <img src="/icons/list.svg" alt="" width={20} />
                </span>
            </button>
            <UserDropdown />
        </nav>
    )
}

export default Navbar
