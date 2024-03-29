"use client"

import { doGetUserByAccessToken } from "@/services/user"
import { config } from "@/utils/constants"
import { logout } from "@/utils/logout"
import { getCookie } from "cookies-next"
import { NextPage } from "next"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const WithAuth = <P extends object>(WrappedComponent: NextPage<P>) => {
    const AuthComponent: NextPage = (props) => {
        const [authenticated, setAuthenticated] = useState(false)
        const [user, setUser] = useState()
        const router = useRouter()
        const path = usePathname()

        useEffect(() => {
            const fetchUser = async () => {
                // get access token from cookie
                const accessToken = getCookie(config.AUTH.COOKIE_NAME) as string
                if (accessToken && accessToken.length) {
                    try {
                        // check whether a user exists or not for this access token
                        const response = await doGetUserByAccessToken(accessToken)
                        // if exists, authentication is successful
                        if (response.status && response.data) {
                            setAuthenticated(true)
                            setUser(response.data)
                            // else delete the cookie and redirect user to login page
                            // deleting access token is important because in WithoutAuth component
                            // we are not validating access token, we just check if the access token
                            // exists or not
                        } else {
                            logout(router, path)
                        }
                    } catch (error) {
                        // if any other error occurs
                        // logout the user
                        logout(router, path)
                    }
                } else {
                    // if no access token found, user is not authenticated
                    router.replace(`/login?${config.PARAMS.REDIRECT_URL_PARAM}=${path}`)
                }
            }

            fetchUser()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        if (!authenticated) {
            // Render nothing while authentication is in progress
            return null
        }

        return <WrappedComponent {...(props as P)} user={user} />
    }

    return AuthComponent
}

export default WithAuth
