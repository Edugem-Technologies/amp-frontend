"use client"
import { AnyObject } from "@/types/common/helper"
import { removeAccessToken, setAccessToken } from "@/utils/common"
import { CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { Session } from "next-auth"
import { signOut, useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"

interface AuthGuardProps {
    children: ReactNode
}

const AuthGuard = (props: AuthGuardProps) => {
    const { children } = props
    const router = useRouter()
    const path = usePathname()
    const sessionData = useSession()
    console.log("useSession()", useSession())

    // eslint-disable-next-line
    const [authenticated, setAuthenticated] = useState(false)

    const checkToken = async () => {
        try {
            if (sessionData.status === "authenticated") {
                if ((sessionData?.data as Session & AnyObject)?.data?.data?.token) {
                    setAccessToken((sessionData?.data as Session & AnyObject)?.data?.data.token)
                    setAuthenticated(true)
                } else {
                    setAuthenticated(false)
                    removeAccessToken()
                    router.push(`/login?${CONFIG.PARAMS.REDIRECT_URL_PARAM}=${path}`)
                    throw (sessionData?.data as Session & AnyObject)?.data
                }
            } else if (sessionData.status === "unauthenticated") {
                setAuthenticated(false)
                removeAccessToken()
                router.push(`/login?${CONFIG.PARAMS.REDIRECT_URL_PARAM}=${path}`)
            }
        } catch (error) {
            handleError(error)
            router.push(`/login?${CONFIG.PARAMS.REDIRECT_URL_PARAM}=${path}`)
            // next auth sign out function to remove access token of next-auth
            signOut()
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
