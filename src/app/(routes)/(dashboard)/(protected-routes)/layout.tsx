"use client"
import AuthGuard from "@/app/components/auth/AuthGuard"
import { SessionProvider } from "next-auth/react"
import React, { ReactNode } from "react"

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <SessionProvider>
            <AuthGuard>{children}</AuthGuard>
        </SessionProvider>
    )
}

export default Layout
