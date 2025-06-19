import { ALERT_ICON_TYPE } from "./constants"
import { removeUnderscoreFromLabel, showSweetAlert } from "./helpers"

/**
 * Iterates over an object and constructs a string containing error messages.
 *
 * The function recursively processes nested objects and arrays, and formats
 * the messages by capitalizing the key and appending the corresponding message.
 *
 * @param {Record<string, any>} obj - The object to iterate over.
 * @returns {string} A string containing the concatenated error messages.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function iterateObject(obj: Record<string, any>): string {
    let errorMessage: string = ""
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key]
            if (Array.isArray(value)) {
                value.forEach((msg) => {
                    const label = key !== "_schema" ? removeUnderscoreFromLabel(key) + ": " : ""
                    if (typeof msg === "string") {
                        errorMessage += `${label} ${msg}` + "\n"
                    } else if (Array.isArray(msg) && typeof msg[0] === "string") {
                        errorMessage += `${label} ${msg[0]}` + "\n"
                    } else if (typeof msg === "object") {
                        errorMessage += iterateObject(msg)
                    }
                })
            } else if (typeof value === "object") {
                errorMessage += iterateObject(value)
            } else if (typeof value === "string") {
                errorMessage += value + "\n"
            }
        }
    }
    return errorMessage
}

/**
 *	Shows a toast containing the error message
 *
 * @param {*} error
 */
export const handleError = (error: unknown) => {
    // toast.dismiss()
    // For showing toaster instead of sweetalert you can uncomment below code related to toaster.
    if (typeof error === "string") {
        // toast(error, CONFIG.TOASTER_OPTIONS.ERROR)
        showSweetAlert({
            icon: ALERT_ICON_TYPE.error,
            text: error,
        })
    } else if (typeof error === "object" && (error as { message: string }).message) {
        // toast((error as { message: string })?.message, CONFIG.TOASTER_OPTIONS.ERROR)
        showSweetAlert({
            icon: ALERT_ICON_TYPE.error,
            text: (error as { message: string })?.message,
        })
    } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as Record<string, any>
        const message = iterateObject(_error)
        if (message) {
            // toast(message, CONFIG.TOASTER_OPTIONS.ERROR)
            showSweetAlert({
                icon: ALERT_ICON_TYPE.error,
                text: message,
            })
            console.error(message)
        } else {
            // toast(CONFIG.MESSAGES.GENERIC_ERROR, CONFIG.TOASTER_OPTIONS.ERROR)
            showSweetAlert({
                icon: ALERT_ICON_TYPE.error,
                text: message,
            })

            console.error("Something went wrong")
        }
    }
}
