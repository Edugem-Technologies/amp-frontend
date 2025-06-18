"use client"
import { ALERT_ICON_TYPE } from "@/utils/constants"
import { showSweetAlertWithRedirect } from "@/utils/helpers"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect } from "react"

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const message = searchParams.get(`message`)
    useEffect(() => {
        if (message) {
            showSweetAlertWithRedirect({
                icon: ALERT_ICON_TYPE.error,
                text: message,
                router,
                url: "/auth/login",
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])
    return <div></div>
}

export default Page
