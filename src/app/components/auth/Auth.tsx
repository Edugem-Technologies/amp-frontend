"use clint"

import { doGetUserByAccessToken } from "@/services/user"
import { WithAuthPropType } from "@/types/auth/user"
import { config } from "@/utils/constants"
import { deleteCookie, getCookie } from "cookies-next"
import { NextPage } from "next"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const WithAuth = <P extends object>(WrappedComponent: NextPage<P & WithAuthPropType>) => {
    const AuthComponent: NextPage<P & WithAuthPropType> = (props) => {
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
                            deleteCookie(config.AUTH.COOKIE_NAME)
                            router.push(`/login?${config.PARAMS.REDIRECT_URL_PARAM}=${path}`)
                        }
                    } catch (error) {
                        // if any other error occurs
                        // logout the user and redirect to login page
                        deleteCookie(config.AUTH.COOKIE_NAME)
                        router.push(`/login?${config.PARAMS.REDIRECT_URL_PARAM}=${path}`)
                    }
                } else {
                    // if no access token found, user is not authenticated
                    // redirect to login page
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

        return <WrappedComponent {...props} user={user} />
    }

    return AuthComponent
}

export default WithAuth
