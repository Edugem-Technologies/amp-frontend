"use client"
import { useAppContext } from "@/app/context"
import { useMediaQuery } from "@/app/hooks/useMediaQuery"
import useScroll from "@/app/hooks/useScroll"
import Link from "next/link"

const Navbar = () => {
    const position = useScroll()
    const isMatched = useMediaQuery("(max-width: 576px)")
    const { setSidebarCollapse, sidebarCollapse } = useAppContext()

    return (
        <nav
            className={`navbar d-flex align-items-center ${position > 120 ? "shadow-sm " : ""}${
                isMatched ? "justify-content-end " : "justify-content-center"
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
            <div className="nav-link">
                <Link href={"/"} className="text-decoration-none">
                    Home
                </Link>
            </div>
            <div className="nav-link">
                <Link href={"/components"} className="text-decoration-none">
                    Components
                </Link>
            </div>
            <div className="nav-link">
                <Link href={"/profile"} className="text-decoration-none">
                    Profile
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
