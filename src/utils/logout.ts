import { ErrorType } from "@/types/common/error"
import { signOut } from "aws-amplify/auth"
import { deleteCookie, getCookies } from "cookies-next"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import toast from "react-hot-toast"
import { CONFIG } from "./constants"
import { removeIsAuthenticated } from "./helpers"

export const logout = async (router: AppRouterInstance, redirectPath = "/") => {
    try {
        removeIsAuthenticated()
        const cookies = getCookies()
        await signOut({ global: true })
        Object.entries(cookies).forEach((entry) => deleteCookie(entry[0]))
        router.push(`/login?${CONFIG.PARAMS.REDIRECT_URL_PARAM}=${redirectPath}`)
    } catch (error) {
        const { message } = error as ErrorType
        if (message) {
            toast(message, CONFIG.TOASTER_OPTIONS.ERROR)
        } else {
            toast(CONFIG.MESSAGES.GENERIC_ERROR, CONFIG.TOASTER_OPTIONS.ERROR)
        }
    }
}
