"use client"
import { FetchHelper } from "@/services/fetch-helper"
import { setAccessToken } from "@/utils/common"
import { config } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const GoogleIdpCallback = () => {
    const router = useRouter()
    const searchParams =
        typeof window !== "undefined"
            ? new URLSearchParams(window.location.href.split("#")[1])
            : new URLSearchParams()
    const accessToken = searchParams.get("access_token") || ""

    const doVerifyUser = async () => {
        try {
            const response = await FetchHelper.post(config.API_ENDPOINTS.VERIFY_GOOGLE_USER, {
                access_token: accessToken,
            })
            if (response && response.status) {
                setAccessToken(response.data.token)
                router.push("/")
            }
        } catch (error) {
            handleError(error)
        }
    }
    useEffect(() => {
        if (accessToken) {
            doVerifyUser()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])
    return (
        <section className="text-center">
            <h1>Please wait while we verify your account...</h1>
        </section>
    )
}

export default GoogleIdpCallback
