"use client"
import Aside from "@/app/components/common/Aside"
import Footer from "@/app/components/common/Footer"
import Navbar from "@/app/components/common/Navbar"
import { removeRecaptcha } from "@/utils/Helpers"
import React, { ReactNode, useEffect } from "react"

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Remove Google reCAPTCHA script when the protected routes mount.
    useEffect(() => {
        removeRecaptcha()
    }, [])
    return (
        <div className="main-grid">
            <Navbar />
            <Aside />
            <main className="main-content">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
