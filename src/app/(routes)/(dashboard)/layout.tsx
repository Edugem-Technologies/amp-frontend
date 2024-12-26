"use client"
import AuthGuard from "@/app/components/auth/AuthGuard"
import Aside from "@/app/components/common/Aside"
import Navbar from "@/app/components/common/Navbar"
import React, { ReactNode } from "react"

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <AuthGuard>
            <div>
                <div className="d-flex">
                    <Aside />
                    <div className="flex-grow-1">
                        <Navbar />
                        {children}
                    </div>
                </div>
            </div>
            {children}
        </AuthGuard>
    )
}

export default Layout
