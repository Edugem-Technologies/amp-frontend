import { ErrorType } from "@/types/common/error"
import { signOut } from "aws-amplify/auth"
import { deleteCookie, getCookies } from "cookies-next"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import toast from "react-hot-toast"
import { config } from "./constants"

export const logout = async (router: AppRouterInstance, redirectPath = "/") => {
	try {
		deleteCookie(config.AUTH.COOKIE_NAME)
		const cookies = getCookies()
		await signOut({ global: true })
		Object.entries(cookies).forEach((entry) => deleteCookie(entry[0]))
		router.push(`/login?${config.PARAMS.REDIRECT_URL_PARAM}=${redirectPath}`)
	} catch (error) {
		const { message } = error as ErrorType
		if (message) {
			toast(message, config.TOASTER_OPTIONS.ERROR)
		} else {
			toast(config.MESSAGES.GENERIC_ERROR, config.TOASTER_OPTIONS.ERROR)
		}
	}
}
