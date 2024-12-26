"use client"
import AuthGuard from "@/app/components/auth/AuthGuard"
import Aside from "@/app/components/common/Aside"
import Footer from "@/app/components/common/Footer"
import Navbar from "@/app/components/common/Navbar"
import React, { ReactNode } from "react"

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <AuthGuard>
            <div className="main-grid">
                <Navbar />
                <Aside />
                <main className="main-content">{children}</main>
                <Footer />
            </div>
        </AuthGuard>
    )
}

export default Layout
