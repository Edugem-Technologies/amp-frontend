import { CheckValidPhoneNumberArgsTyps } from "@/types/common/helper"
import { isValidNumber, parse } from "libphonenumber-js"
import Swal, { SweetAlertIcon, SweetAlertOptions } from "sweetalert2"
import { ALERT_ICON_TYPE, CONFIG } from "./constants"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

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
const getSwalText = (text: string) => {
    return `<span>${text} <br><br> ${CONFIG.MESSAGES.THIS_CAN_NOT_BE_UNDONE}</span>`
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
}: {
    text: string
    icon: SweetAlertIcon
    cancelButtonText?: string
    subtitle?: boolean
}) => {
    return Swal.fire({
        heightAuto: false,
        html:
            icon === ALERT_ICON_TYPE.warning
                ? subtitle
                    ? getSwalText(text)
                    : `<span>${text}</span>`
                : null,
        iconColor: icon === ALERT_ICON_TYPE.warning && "red",
        icon, // Set icon based on type
        title: (icon === "success" || icon === "error") && text,
        showConfirmButton: icon === ALERT_ICON_TYPE.warning,
        confirmButtonText: subtitle
            ? CONFIG.SWEETALERT_DELETE_OPTION.confirmButtonText
            : CONFIG.SWEETALERT_DELETE_OPTION.confirmButtonTextSecondary,
        showCancelButton: icon === ALERT_ICON_TYPE.warning, // Only show cancel button for warnings
        cancelButtonText: cancelButtonText || CONFIG.SWEETALERT_DELETE_OPTION.cancelButtonText,
        timer: (icon === "success" || icon === "error") && CONFIG.SWEETALERT_SUCCESS_OPTION.timer,
        customClass: {
            /* you can add custom classes to different component of sweetalert.
             * To check, please visit {@link https://sweetalert2.github.io/#customClass}
             */
            actions: "d-flex flex-row-reverse",
            cancelButton: "btn custom-swal-cancel-button",
            confirmButton: "btn custom-swal-confirm-button",
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
