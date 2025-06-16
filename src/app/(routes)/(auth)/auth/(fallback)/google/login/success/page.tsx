"use client"
import { FetchHelper } from "@/services/fetch-helper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { showSweetAlertWithRedirect } from "@/utils/helpers"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect } from "react"

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const message = searchParams.get(`message`)
    const getUserDetails = async () => {
        try {
            const response = await FetchHelper.get(CONFIG.API_ENDPOINTS.GET_USER_DETAILS)
            if (response?.status) {
                console.log("response", response)
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
