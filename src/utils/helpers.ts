import { CheckValidPhoneNumberArgsTyps } from "@/types/common/helper"
import { isValidNumber, parse } from "libphonenumber-js"

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
