import { Any, AnyObject, CheckValidPhoneNumberArgsTyps } from "@/types/common/helper"
import { isValidNumber, parse } from "libphonenumber-js"
import Swal, { SweetAlertIcon, SweetAlertOptions } from "sweetalert2"
import { ALERT_ICON_TYPE, CONFIG, MAX_INT_LIMIT } from "./constants"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import crypto from "crypto-js"
import { handleError } from "./handle-error"
import { Role, UserDetails } from "@/types/data/loginData"

/**
 * Generates an array of numbers from 1 to the specified length.
 *
 * @param {number} length - The length of the array to generate.
 * @returns {number[]} An array containing numbers from 1 up to the specified length.
 *
 * @example
 * Returns [1, 2, 3, 4, 5]
 * getArray(5);
 *
 * @example
 *  Returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * getArray(10);
 */
export const getArray = (length: number) => {
    return Array.from({ length }, (_, i) => i + 1)
}

export const checkValidPhoneNumber = ({ country, data }: CheckValidPhoneNumberArgsTyps) => {
    let isValid = true
    if (country && typeof data === "string" && data?.trim().length) {
        const phoneNumber = data.startsWith("+") ? data : `+${data}`
        const parsedNumber = parse(phoneNumber)
        isValid = isValidNumber(parsedNumber)
    }
    return isValid
}
const getSwalText = ({ text, subtitleText }: { text: string; subtitleText?: string }) => {
    return `<span>${text} <br><br> ${subtitleText ?? CONFIG.MESSAGES.THIS_CAN_NOT_BE_UNDONE}</span>`
}

/**
 * Displays a SweetAlert modal with customizable options for text, icon, buttons, and styles.
 *
 * @param {Object} params - The configuration for the SweetAlert modal.
 * @param {string} params.text - The main text to display in the alert.
 * @param {SweetAlertIcon} params.icon - The type of alert icon (e.g., "success", "error", "warning", etc.).
 * @param {string} [params.cancelButtonText] - Custom text for the cancel button. Defaults to a predefined value.
 * @param {boolean} [params.subtitle=true] - Indicates if a subtitle should be shown with the warning icon.
 *
 * @returns {Promise<SweetAlertResult>} A promise that resolves when the alert is closed or dismissed.
 *
 * @example
 * // Example usage:
 * showSweetAlert({
 *   text: "Are you sure you want to delete this item?",
 *   icon: "warning",
 *   cancelButtonText: "No, cancel",
 *   subtitle: false,
 * });
 *
 * @see {@link https://sweetalert2.github.io/} for more information about SweetAlert2.
 */
export const showSweetAlert = ({
    text,
    icon,
    cancelButtonText,
    subtitle = true,
    subtitleText = "",
    customConfirmButtonClass,
    ...props
}: SweetAlertOptions & {
    text: string
    icon: SweetAlertIcon
    cancelButtonText?: string
    subtitle?: boolean
    subtitleText?: string
    customConfirmButtonClass?: string
}) => {
    return Swal.fire({
        heightAuto: false,
        html:
            icon === ALERT_ICON_TYPE.warning
                ? subtitle
                    ? getSwalText({ text, subtitleText })
                    : `<span>${text}</span>`
                : null,
        iconColor: icon === ALERT_ICON_TYPE.warning && "red",
        icon, // Set icon based on type
        title: (icon === "success" || icon === "error") && text,
        showConfirmButton: props?.showConfirmButton ?? icon === ALERT_ICON_TYPE.warning,
        confirmButtonText: props?.confirmButtonText
            ? props.confirmButtonText
            : subtitle
              ? CONFIG.SWEETALERT_DELETE_OPTION.confirmButtonText
              : CONFIG.SWEETALERT_DELETE_OPTION.confirmButtonTextSecondary,
        showCancelButton: icon === ALERT_ICON_TYPE.warning, // Only show cancel button for warnings
        cancelButtonText: cancelButtonText || CONFIG.SWEETALERT_DELETE_OPTION.cancelButtonText,
        timer:
            props.timer ??
            ((icon === "success" || icon === "error") && CONFIG.SWEETALERT_SUCCESS_OPTION.timer),
        customClass: {
            /* you can add custom classes to different component of sweetalert.
             * To check, please visit {@link https://sweetalert2.github.io/#customClass}
             */
            actions: "d-flex flex-row-reverse",
            cancelButton: "btn button-3d-effect btn-secondary custom-swal-cancel-button",
            confirmButton: `btn button-3d-effect btn-danger custom-swal-confirm-button ${customConfirmButtonClass}`,
            title: "swal2-title",
        },
    } as SweetAlertOptions)
}

/**
 * Displays a SweetAlert modal and redirects the user to a specified URL after the alert.
 *
 * @param {Object} args - The configuration for the alert and redirect.
 * @param {string} args.message - The main message to display in the alert.
 * @param {SweetAlertIcon} args.icon - The type of alert icon (e.g., "success", "error", "warning", etc.).
 * @param {AppRouterInstance} args.router - The Next.js router instance for navigation.
 * @param {string} args.url - The URL to redirect the user to after the alert.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * showSweetAlertWithRedirect({
 *   message: "Operation completed successfully!",
 *   icon: "success",
 *   router: useRouter(),
 *   url: "/dashboard",
 * });
 */
export const showSweetAlertWithRedirect = (args: {
    text: string
    icon: SweetAlertIcon
    router: AppRouterInstance
    url: string
}) => {
    showSweetAlert({ icon: args.icon, text: args.text })
    args.router.push(args.url)
}

export const generateRandomColors = (index?: number) => {
    if (typeof index === "undefined") {
        index = Math.floor(Math.random() * CONFIG.COLOR_ARRAY.colorArray.length)
    }
    if (index >= CONFIG.COLOR_ARRAY.colorArray.length) {
        index = index % CONFIG.COLOR_ARRAY.colorArray.length
    }
    return CONFIG.COLOR_ARRAY.colorArray[index]
}

export const getLocalItem = (item: string) => {
    return localStorage.getItem(item)
}

export const hasAccessPermission = ({
    userPermissions,
    requiredPermissions,
}: {
    requiredPermissions?: string[]
    userPermissions: string[]
}) => {
    if (userPermissions?.length && requiredPermissions?.length) {
        const result = requiredPermissions.some((permission) =>
            userPermissions.includes(permission),
        )
        return result
    }
    return false
}

export const validateURLValue = (value: Any) => {
    if (value && value.trim().length > 0) {
        return value?.match(
            /^(https?|ftps?):\/\/(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
        )
    }
    return true
}

export const validateMaxIntValue = (value: Any) => {
    if (value && value?.trim().length > 0) {
        if (parseInt(value) > MAX_INT_LIMIT) {
            return false
        }
        return true
    }
    return true
}

export function getValueOrNull(value: Any) {
    if (value === null || value === undefined) {
        return null
    }

    if (typeof value === "object") {
        return value.value ? value.value : null
    }

    if (value === 0) {
        return value.toString()
    }

    return value ? value : null
}

/**
 * Returns a new array containing only unique string values from the input array.
 *
 * @param {Array<string>} array - The input array containing string values.
 * @returns {Array<string>} A new array with duplicate string values removed, preserving the order of first occurrences.
 *
 * @example
 * // Example usage:
 * const values = ["a", "b", "a", "c", "b"];
 * const uniqueValues = getUniqueValueFromArray(values);
 * console.log(uniqueValues); // Output: ["a", "b", "c"]
 */
export const getUniqueValueFromArray = (array: string[]) => {
    return Array.from(new Set(array))
}

export const encrypt = (text: string) => {
    if (text && text.length > 0 && process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY) {
        const cipherText = crypto.AES.encrypt(
            text,
            process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY,
        ).toString()
        return cipherText
    }
    return null
}

export const decrypt = (encryptedText: string | null) => {
    if (encryptedText && encryptedText.length > 0 && process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY) {
        try {
            const bytes = crypto.AES.decrypt(
                encryptedText,
                process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY,
            )
            const plainText = bytes.toString(crypto.enc.Utf8)
            return plainText
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e)
            return null
        }
    }
    return null
}

export const setLocalStorageData = (variableName: string, data: Any) => {
    if (typeof data === "string") {
        localStorage.setItem(variableName, data)
    } else {
        localStorage.setItem(variableName, JSON.stringify(data))
    }
}

export const getLocalStorageData = (variableName: string) => {
    const localStorageData = localStorage.getItem(variableName)
    if (localStorageData) {
        return JSON.parse(localStorageData)
    } else {
        return null
    }
}

export const setEncryptedLocalStorageData = (variableName: string, data: Any) => {
    let encryptedData
    if (typeof data === "string") {
        encryptedData = encrypt(data)
    } else {
        encryptedData = encrypt(JSON.stringify(data))
    }
    if (encryptedData) {
        setLocalStorageData(variableName, encryptedData)
    }
}

export const getDecryptedLocalStorageData = (variableName: string) => {
    const encryptedData = localStorage.getItem(variableName)
    if (encryptedData) {
        const decryptedData = decrypt(encryptedData)
        if (decryptedData) {
            return JSON.parse(decryptedData)
        }
    } else {
        return null
    }
}

/**
 * Converts a given text to title case, ensuring correct capitalization rules.
 * Small words like "of", "and", "in", etc., remain lowercase unless they are the first or last word.
 *
 * @param {string} text - The text to be formatted to title case.
 * @returns {string} The formatted text in title case.
 *
 * @example
 * // Returns "The Quick Brown Fox Jumps Over the Lazy Dog"
 * formatTextToTitleCase("the quick brown fox jumps over the lazy dog");
 *
 * @example
 * // Returns "Type of Supplier"
 * formatTextToTitleCase("type of supplier");
 *
 * @example
 * // Returns "A Room in the Castle"
 * formatTextToTitleCase("a room in the castle");
 */
export function formatTextToTitleCase(text: string): string {
    if (!text) return ""

    const exceptions = ["of", "and", "in", "on", "at", "to", "for", "with", "a", "an", "the"]
    return text
        .split(" ") // Splits on spaces
        .map((word, index, words) => {
            // Capitalize the word if it's the first, last, or not an exception
            if (index === 0 || index === words.length - 1 || !exceptions.includes(word)) {
                return (word?.[0]?.toUpperCase() ?? "") + (word?.slice(1) ?? "")
            }
            return word // Keep the word in lowercase if it's an exception
        })
        .join(" ")
}

/**
 * Stores user login details in local storage with encryption and updates user permissions.
 *
 * @param params - The parameters for setting login details.
 * @param params.permissions - An array of permission strings to be stored.
 * @param params.roles - An array of user roles.
 * @param params.userDetails - The user details object.
 * @param params.setUserPermissions - Callback to update user permissions in the application state.
 *
 * @remarks
 * - Permissions and user data are encrypted before being stored in local storage.
 * - The user's roles are converted to a comma-separated string and included in the stored user data.
 * - Any errors encountered during the process are handled by the `handleError` function.
 */
export const setLoginDetailsToLocalStorage = ({
    permissions,
    roles,
    userDetails,
    setUserPermissions,
}: {
    permissions: string[]
    roles: Role[]
    userDetails: UserDetails
    setUserPermissions: (permissions: string[]) => void
}) => {
    try {
        setEncryptedLocalStorageData(CONFIG.LOCAL_STORAGE_VARIABLES.PERMISSIONS, permissions)
        const roleData = getUniqueValueFromArray(roles.map((role: Role) => role.name)).join(", ")
        const userData = { ...userDetails, role: roleData }
        setEncryptedLocalStorageData(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DATA, userData)
        setUserPermissions(permissions)
    } catch (error) {
        handleError(error)
    }
}

/**
 * Capitalizes the first letter of a given text and converts the rest to lowercase.
 *
 * @param {string} text - The text to be formatted.
 * @returns {string} The formatted text with the first letter capitalized.
 */
export const formatTextToCapitalized = (text: string | undefined) => {
    return (text?.[0]?.toUpperCase() ?? "") + (text?.slice(1)?.toLowerCase() ?? "")
}

export const getOptionFromEnum = (enumObject: AnyObject, isFormatTextToCapital = true) => {
    return Object.keys(enumObject).map((key) => ({
        label: isFormatTextToCapital ? formatTextToCapitalized(key) : key,
        value: enumObject[key],
        data: {
            label: isFormatTextToCapital ? formatTextToCapitalized(key) : key,
            value: enumObject[key],
        },
    }))
}
