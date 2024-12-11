"use client"
import { getAccessToken } from "@/utils/common"
import { useRouter } from "next/navigation"
import React, { ReactNode } from "react"

// this will not allow user to visit unauthenticated routes when user is logged in
const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter()
    const accessToken = getAccessToken()
    if (accessToken) {
        router.back()
    } else {
        return <>{children}</>
    }
}

export default Layout
