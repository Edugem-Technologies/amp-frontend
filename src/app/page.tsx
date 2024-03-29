"use client"
import { doGetUserByAccessToken } from "@/services/user"
import { User } from "@/types/auth/user"
import { UnAuthorizedAccessError } from "@/types/common/error"
import { config } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { logout } from "@/utils/logout"
import { getCookie } from "cookies-next"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CustomLayout from "./components/common/CustomLayout"

export default function Home() {
    const [user, setUser] = useState<User>()
    const router = useRouter()
    const path = usePathname()
    const accessToken = getCookie(config.AUTH.COOKIE_NAME) as string

    const getUser = async () => {
        try {
            const response = await doGetUserByAccessToken(accessToken)
            if (response.data) {
                setUser(response.data)
            }
        } catch (error) {
            const { status } = error as UnAuthorizedAccessError
            if (status && status === config.STATUS.UNAUTHORIZED) {
                logout(router, path)
            } else {
                handleError(error)
            }
        }
    }
    useEffect(() => {
        if (accessToken) getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <CustomLayout user={user}>
            <h1 className="text-center mt-4">Boiler plate code for NEXT 14</h1>
        </CustomLayout>
    )
}
