"use client"
import AuthGuard from "@/app/components/auth/AuthGuard"
import React, { ReactNode } from "react"

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <AuthGuard>{children}</AuthGuard>
}

export default Layout
