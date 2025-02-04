"use client"
import { getAccessToken } from "@/utils/common"
import { CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"

interface AuthGuardProps {
    children: ReactNode
}

const AuthGuard = (props: AuthGuardProps) => {
    const { data } = useSession()
    console.log("🚀 ~ AuthGuard ~ data:", data)
    const { children } = props
    const router = useRouter()
    const path = usePathname()

    // eslint-disable-next-line
    const [authenticated, setAuthenticated] = useState(false)

    const checkToken = async () => {
        try {
            if (data && data.user) {
                console.log("true")
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
                console.log("false")
                router.push(`/login?${CONFIG.PARAMS.REDIRECT_URL_PARAM}=${path}`)
            }
            // const expTime = getAccessToken()
            // if (expTime) {
            //     setAuthenticated(true)
            // } else {
            //     setAuthenticated(false)
            //     router.push(`/login?${CONFIG.PARAMS.REDIRECT_URL_PARAM}=${path}`)
            // }
        } catch (error) {
            handleError(error)
            router.push(`/login?${CONFIG.PARAMS.REDIRECT_URL_PARAM}=${path}`)
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
