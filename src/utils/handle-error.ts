import toast from "react-hot-toast"
import { config } from "./constants"

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
                    if (typeof msg === "string") {
                        errorMessage += key[0].toUpperCase() + key.slice(1) + " " + msg + "\n"
                    } else if (Array.isArray(msg) && typeof msg[0] === "string") {
                        errorMessage += key[0].toUpperCase() + key.slice(1) + " " + msg[0] + "\n"
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
    if (typeof error === "string") {
        toast(error, config.TOASTER_OPTIONS.ERROR)
    } else if (typeof error === "object" && (error as { message: string }).message) {
        toast((error as { message: string })?.message, config.TOASTER_OPTIONS.ERROR)
    } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _error = error as Record<string, any>
        const message = iterateObject(_error)
        if (message) {
            toast(message, config.TOASTER_OPTIONS.ERROR)
            console.error(message)
        } else {
            toast(config.MESSAGES.GENERIC_ERROR, config.TOASTER_OPTIONS.ERROR)

            console.error("Something went wrong")
        }
    }
}
