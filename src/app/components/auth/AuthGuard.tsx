"use client"
import { CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { getIsAuthenticated, removeIsAuthenticated } from "@/utils/helpers"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"

interface AuthGuardProps {
    children: ReactNode
}

const AuthGuard = (props: AuthGuardProps) => {
    const { children } = props
    const router = useRouter()
    const path = usePathname()
    const [authenticated, setAuthenticated] = useState(false)
    const checkToken = async () => {
        try {
            const isAuthenticated = getIsAuthenticated()
            if (isAuthenticated) {
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
                removeIsAuthenticated()
                router.push(`/auth/login?${CONFIG.PARAMS.REDIRECT_URL_PARAM}=${path}`)
            }
        } catch (error) {
            handleError(error)
            removeIsAuthenticated()
            router.push(`/auth/login?${CONFIG.PARAMS.REDIRECT_URL_PARAM}=${path}`)
        }
    }
    useEffect(() => {
        checkToken()
    })

    if (authenticated) {
        return <>{children}</>
    } else {
        return null
    }
}

export default AuthGuard
