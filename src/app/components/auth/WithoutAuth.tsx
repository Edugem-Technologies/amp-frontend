import { getAccessToken } from "@/utils/common"
import { NextPage } from "next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * Enhances a Next.js page component to prevent access for authenticated users.
 * @example Preventing authenticated users from accessing login page
 * @param WrappedComponent - The Next.js page component to be wrapped.
 * @returns A component that prevents access for authenticated users.
 */
const WithoutAuth = <P extends object>(WrappedComponent: NextPage<P>) => {
    const NonAuthComponent = (props: P) => {
        const router = useRouter()
        const [authenticated, setAuthenticated] = useState(false)
        const [accessToken, setAccessToken] = useState("")
        useEffect(() => {
            const accessToken = getAccessToken()
            if (accessToken) {
                setAuthenticated(true)
                setAccessToken(accessToken)
            } else {
                setAuthenticated(false)
            }
        }, [])

        if (authenticated && accessToken.length) {
            return router.push("/")
        } else if (!authenticated) {
            return <WrappedComponent {...(props as P)} />
        }
        return null
    }
    return NonAuthComponent
}

export default WithoutAuth
