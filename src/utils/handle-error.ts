import { ErrorType } from "@/types/common/error"
import toast from "react-hot-toast"
import { config } from "./constants"
/**
 *	@description shows a toast containing the error message
 *
 * @param {*} error
 */
export const handleError = (error: any) => {	
	if (typeof error === "string") {
		toast(error, config.TOASTER_OPTIONS.ERROR)
	} else {
		const { message } = error as ErrorType
		if (message) {
			toast(message, config.TOASTER_OPTIONS.ERROR)
		} else {
			toast(config.MESSAGES.GENERIC_ERROR, config.TOASTER_OPTIONS.ERROR)
		}
	}
}
