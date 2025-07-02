"use client"
import { ALERT_ICON_TYPE } from "@/utils/Constants"
import { showSweetAlertWithRedirect } from "@/utils/Helpers"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

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
