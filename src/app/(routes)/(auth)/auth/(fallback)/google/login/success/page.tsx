"use client"
import { usePermissions } from "@/app/context/PermissionContext"
import { FetchHelper } from "@/services/fetch-helper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { setLoginDetailsToLocalStorage, showSweetAlertWithRedirect } from "@/utils/helpers"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

const Page = () => {
    const { setUserPermissions } = usePermissions()
    const router = useRouter()
    const searchParams = useSearchParams()
    const message = searchParams.get(`message`)
    const user_uuid = searchParams.get(`user_uuid`)
    const getUserDetails = async () => {
        try {
            const url = new URL(`${CONFIG.API_ENDPOINTS.BASE_USER}/${user_uuid}/details`)
            const response = await FetchHelper.get(url)
            if (response?.status) {
                setLoginDetailsToLocalStorage({
                    permissions: response.data.permissions,
                    roles: response.data.roles,
                    setUserPermissions,
                    userDetails: response.data,
                })
            }
        } catch (error) {
            handleError(error)
        }
    }
    useEffect(() => {
        if (message) {
            getUserDetails()
            showSweetAlertWithRedirect({
                icon: ALERT_ICON_TYPE.success,
                text: message,
                router,
                url: "/",
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])
    return <div></div>
}

export default Page
