import { FetchHelper } from "@/services/fetch-helper"
import { User } from "@/types/auth/User"
import { FileUpload, uploadedFileType } from "@/types/common/FileUpload"
import { Any, AnyObject, CheckValidPhoneNumberArgsTyps } from "@/types/common/helper"
import { Role } from "@/types/data/loginData"
import crypto from "crypto-js"
import { isValidNumber, parse } from "libphonenumber-js"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Swal, { SweetAlertIcon, SweetAlertOptions } from "sweetalert2"
import { ALERT_ICON_TYPE, CONFIG, MAX_INT_LIMIT } from "./constants"
import { handleError } from "./handle-error"

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

/**
 * Encrypts a plaintext string using AES encryption and a secret key.
 *
 * This function uses the AES algorithm to encrypt the provided text with the secret key
 * specified in the NEXT_PUBLIC_CRYPTO_SECRET_KEY environment variable. The result is a
 * base64-encoded ciphertext string suitable for storage or transmission.
 *
 * @param {string} text - The plaintext string to encrypt.
 * @returns {string | null} The encrypted ciphertext as a string, or null if encryption fails or input is invalid.
 *
 * @example
 * const encrypted = encrypt('mySecret');
 * console.log(encrypted); // Output: (encrypted string)
 */
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

/**
 * Deterministically hashes the text for use as a localStorage key.
 * This ensures the same input always produces the same output.
 */
/**
 * Generates a deterministic, secure key for localStorage using HMAC-SHA256.
 * This ensures the same input always produces the same output, and the key is not easily guessable.
 *
 * @param {string} text - The original key or variable name.
 * @returns {string | null} The hashed key string, or null if input/secret is invalid.
 */
export const generateSecureKey = (text: string) => {
    if (text && text.length > 0 && process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY) {
        // Use HMAC-SHA256 for deterministic key hashing
        return crypto.HmacSHA256(text, process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY).toString()
    }
    return null
}

/**
 * Decrypts an AES-encrypted string using the configured secret key.
 *
 * This function attempts to decrypt the provided encrypted text using AES decryption
 * and the secret key specified in the NEXT_PUBLIC_CRYPTO_SECRET_KEY environment variable.
 * If decryption is successful, the plaintext string is returned. If decryption fails
 * or the input is invalid, null is returned.
 *
 * @param {string | null} encryptedText - The AES-encrypted string to decrypt.
 * @returns {string | null} The decrypted plaintext string, or null if decryption fails or input is invalid.
 *
 * @example
 * const encrypted = encrypt('mySecret');
 * const decrypted = decrypt(encrypted);
 * console.log(decrypted); // Output: 'mySecret'
 */
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

/**
 * Encrypts and stores data in localStorage under a deterministically hashed key.
 *
 * This function:
 * 1. Serializes the provided data to a JSON string.
 * 2. Encrypts the JSON string using a secret key.
 * 3. Hashes the variable name deterministically to generate a secure storage key.
 * 4. Stores the encrypted data in localStorage under the hashed key.
 *
 * @param {string} variableName - The original name of the variable to use as the storage key.
 * @param {any} data - The data to be encrypted and stored (will be JSON-stringified).
 *
 * @example
 * setEncryptedLocalStorageData('user', { name: 'Alice', age: 30 });
 */
export const setEncryptedLocalStorageData = (variableName: string, data: Any) => {
    const encryptedData = encrypt(JSON.stringify(data))
    const encryptedVariableName = generateSecureKey(variableName)
    if (encryptedData && encryptedVariableName) {
        localStorage.setItem(encryptedVariableName, encryptedData)
    }
}

/**
 * Retrieves and decrypts data from localStorage for a given variable name.
 *
 * This function:
 * 1. Hashes the provided variable name deterministically to get the encrypted key.
 * 2. Retrieves the encrypted data from localStorage using the hashed key.
 * 3. Decrypts the retrieved data.
 * 4. Parses the decrypted data as JSON and returns it.
 *
 * @param {string} variableName - The original name of the variable to retrieve from localStorage.
 * @returns {any | null} The decrypted and parsed data from localStorage, or null if not found or on error.
 *
 * @example
 * const userData = getDecryptedLocalStorageData('user');
 * if (userData) {
 *   // Use userData
 * }
 */
export const getDecryptedLocalStorageData = (variableName: string) => {
    const encryptedVariableName = generateSecureKey(variableName)
    if (!encryptedVariableName) return null

    const encryptedData = localStorage.getItem(encryptedVariableName)

    const decryptedData = decrypt(encryptedData)
    if (!decryptedData) return null

    try {
        return JSON.parse(decryptedData)
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to parse decrypted localStorage data:", e)
        return null
    }
}

/**
 * Encrypts and stores data in sessionStorage under a deterministically hashed key.
 *
 * This function:
 * 1. Serializes the provided data to a JSON string.
 * 2. Encrypts the JSON string using a secret key.
 * 3. Hashes the variable name deterministically to generate a secure storage key.
 * 4. Stores the encrypted data in sessionStorage under the hashed key.
 *
 * @param {string} variableName - The original name of the variable to use as the storage key.
 * @param {any} data - The data to be encrypted and stored (will be JSON-stringified).
 *
 * @example
 * setEncryptedSessionStorageData('sessionUser', { name: 'Bob', age: 25 });
 */
export const setEncryptedSessionStorageData = (variableName: string, data: Any) => {
    const encryptedData = encrypt(JSON.stringify(data))
    const encryptedVariableName = generateSecureKey(variableName)
    if (encryptedData && encryptedVariableName) {
        sessionStorage.setItem(encryptedVariableName, encryptedData)
    }
}

/**
 * Retrieves and decrypts data from sessionStorage using a securely generated key.
 *
 * This function:
 * 1. Generates a secure, deterministic key from the provided variable name.
 * 2. Retrieves the encrypted data from sessionStorage using the secure key.
 * 3. Decrypts the data.
 * 4. Parses the decrypted data as JSON and returns the result.
 *
 * @param {string} variableName - The original name of the variable to retrieve from sessionStorage.
 * @returns {any | null} The decrypted and parsed data from sessionStorage, or null if not found or on error.
 *
 * @example
 * const sessionData = getDecryptedSessionStorageData('sessionUser');
 * if (sessionData) {
 *   // Use sessionData
 * }
 */
export const getDecryptedSessionStorageData = (variableName: string) => {
    const encryptedVariableName = generateSecureKey(variableName)
    if (!encryptedVariableName) return null

    const encryptedData = sessionStorage.getItem(encryptedVariableName)

    const decryptedData = decrypt(encryptedData)
    if (!decryptedData) return null

    try {
        return JSON.parse(decryptedData)
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to parse decrypted sessionStorage data:", e)
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
export const setLoginDetailsToLocalStorage = async ({
    permissions,
    roles,
    userDetails,
    setUserPermissions,
}: {
    permissions: string[]
    roles: Role[]
    userDetails: User
    setUserPermissions: (permissions: string[]) => void
}) => {
    try {
        setEncryptedLocalStorageData(CONFIG.LOCAL_STORAGE_VARIABLES.PERMISSIONS, permissions)
        const roleData = getUniqueValueFromArray(roles.map((role: Role) => role.name)).join(", ")
        const userData = { ...userDetails, role: roleData }
        setEncryptedLocalStorageData(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DATA, userData)
        setUserPermissions(permissions)
        setIsAuthenticated()
        if (userDetails?.document?.length) {
            const profileImageURL = await getFileUrl(userDetails?.document[0])
            setEncryptedSessionStorageData(
                CONFIG.SESSION_STORAGE_VARIABLES.PROFILE_IMAGE_URL,
                profileImageURL,
            )
        }
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

/**
 * Validates a phone number by combining the country code and phone number.
 *
 * @param data - An object containing the phone country code and phone number.
 * @param data.phone_country_code - The country code part of the phone number.
 * @param data.phone_number - The phone number part.
 *
 * @returns boolean - Returns true if the combined phone number is valid, otherwise false.
 */
export const checkIsPhoneNumberValid = (data: {
    phone_country_code: string | null
    phone_number: string | null
}) => {
    if (
        (data.phone_country_code?.length === 0 && data.phone_number?.length === 0) ||
        (!data.phone_country_code && !data.phone_number)
    ) {
        return true
    } else if (data.phone_country_code && data.phone_country_code) {
        const number = `${data.phone_country_code}${data.phone_number}`
        const parsedNumber = parse(number)
        const isValid = isValidNumber(parsedNumber)
        return isValid
    } else if (!data.phone_country_code) {
        return false
    }
    return true
}

/**
 * Transforms a given string by removing underscores and capitalizing first letter of each word.
 *
 * This function takes a string where words are separated by underscores,
 * splits the string into individual words, capitalizes first letter each word, and then
 * joins them back into a single string with spaces between the words.
 *
 * Example:
 * ```
 * const result = removeUnderscoreFromLabel('hello_world_example');
 * console.log(result); // Outputs: "Hello World Example"
 * ```
 *
 * @param {string} text - The input string with underscores that need to be removed and words that need to be capitalized.
 * @returns {string} The transformed string with underscores removed and each word capitalized.
 */
export const removeUnderscoreFromLabel = (text: string) => {
    return text
        ?.split("_")
        ?.map((item) => formatTextToCapitalized(item))
        ?.join(" ")
}

export const getIsAuthenticated = () => {
    if (typeof window !== "undefined" && localStorage) {
        const isAuthenticated = getDecryptedLocalStorageData(
            CONFIG.LOCAL_STORAGE_VARIABLES.IS_AUTHENTICATED,
        )
        return isAuthenticated
    }
    getDecryptedLocalStorageData(CONFIG.LOCAL_STORAGE_VARIABLES.IS_AUTHENTICATED)
    return null
}

export const setIsAuthenticated = () => {
    if (typeof window !== "undefined" && localStorage) {
        setEncryptedLocalStorageData(CONFIG.LOCAL_STORAGE_VARIABLES.IS_AUTHENTICATED, true)
    }
}

export const removeIsAuthenticated = () => {
    if (typeof window !== "undefined" && localStorage) {
        localStorage.clear()
    }
}

/**
 * Calculates the specified percentage of a given value.
 *
 * @param {number} value - The base value to calculate the percentage from.
 * @param {number} percentage - The percentage to calculate.
 * @returns {number} The result of value multiplied by the percentage divided by 100.
 *
 * @example
 * calculatePercentage(200, 10); // returns 20
 */
export const calculatePercentage = (value: number, percentage: number) => {
    return value * (percentage / 100)
}

/**
 * Constructs a resized image URL based on the provided image object and size.
 *
 * @param {AnyObject | null} [image] - The image object containing the resizer URL and path.
 * @param {string} [size] - The desired size string (e.g., "200x200") to be appended to the URL.
 * @returns {string} The constructed image URL if both image and size are provided, otherwise an empty string.
 *
 * @example
 * const image = { resizer_url: "https://img.example.com/", path: "/photo.jpg" };
 * const url = getImageUrl(image, "200x200");
 * // url: "https://img.example.com/200x200/photo.jpg"
 */
export const getImageUrl = (image?: AnyObject | null, size?: string) => {
    if (image && size) {
        const imageUrl = image?.resizer_url + size + image?.path
        return imageUrl
    }
    return ""
}

/**
 * Returns a resized image URL based on the original image dimensions and the requested size.
 * If the calculated 40% of the original image's pixel area is greater than the requested size's pixel area,
 * it uses the 40% scaled size; otherwise, it uses the requested size.
 *
 * @param {AnyObject} imageSource - The image object containing at least `width`, `height`, `resizer_url`, and `path`.
 * @param {string} size - The desired size in the format "WIDTHxHEIGHT" (e.g., "200x200").
 * @returns {string} The URL of the resized image.
 *
 * @example
 * const image = { width: 1000, height: 800, resizer_url: "https://img.example.com/", path: "/photo.jpg" };
 * const url = getResizedImage(image, "200x200");
 * // Returns a URL with either the 40% scaled size or the requested size, depending on pixel area.
 */
export const getResizedImage = (imageSource: AnyObject, size: string) => {
    const originalImageNewWidth = Math.floor(calculatePercentage(imageSource.width, 40))
    const originalImageNewHeight = Math.floor(calculatePercentage(imageSource.height, 40))

    const originalImageNewRenderedSize = `${originalImageNewWidth}x${originalImageNewHeight}`

    const resizeImageWidth = Number(size.split("x")?.[0])
    const resizeImageHeight = Number(size.split("x")?.[1])

    const originalImageNewPixel = originalImageNewWidth * originalImageNewHeight
    const resizeImageNewPixel = resizeImageWidth * resizeImageHeight

    if (originalImageNewPixel > resizeImageNewPixel) {
        return getImageUrl(imageSource, originalImageNewRenderedSize)
    } else {
        return getImageUrl(imageSource, size)
    }
}

/**
 * Transforms an array of string options into an array of objects with label, value, and data properties.
 *
 * @param {string[]} options - The array of string options to transform.
 * @returns {Array<{label: string, value: string, data: {label: string, value: string}}>}
 *   The transformed array of option objects.
 */
export const transformOptions = (options: string[]) => {
    return options.map((option) => ({
        label: option,
        value: option,
        data: {
            label: option,
            value: option,
        },
    }))
}

/**
 * Retrieves the key from an enum-like object that corresponds to the given value.
 *
 * @param {Object} params - The parameters object.
 * @param {Any} params.value - The value to search for within the enum object.
 * @param {AnyObject} params.enumObject - The enum-like object to search.
 * @returns {string | undefined} The key whose value matches the provided value, or undefined if not found.
 *
 * @example
 * const StatusEnum = { ACTIVE: 1, INACTIVE: 0 };
 * const key = getKeyFromEnumValue({ value: 1, enumObject: StatusEnum });
 * // key === "ACTIVE"
 */
export const getKeyFromEnumValue = ({
    value,
    enumObject,
}: {
    value: Any
    enumObject: AnyObject
}) => {
    return Object.keys(enumObject).find((k) => enumObject[k as keyof typeof enumObject] === value)
}

export const convertBytesToMb = (fileSizeBytes: number) => {
    const fileSizeMb = fileSizeBytes / (1024 * 1024) // Convert bytes to MB (1024 bytes/KB * 1024 KB/MB)
    return Number(fileSizeMb.toFixed(2))
}

export const convertBytesToKB = (fileSizeBytes: number) => {
    const fileSizeMb = fileSizeBytes / 1024 // Convert bytes to MB (1024 bytes/KB * 1024 KB/MB)
    return Number(fileSizeMb.toFixed(2))
}

/**
 * Convert a value in megabytes to gigabytes.
 *
 * @param {number} megabytes - The size in megabytes (MB) to be converted.
 * @returns {number} The size in gigabytes (GB).
 */
export const convertMbToGb = (megabytes: number) => {
    // There are 1024 megabytes in a gigabyte
    const MB_TO_GB_CONVERSION_FACTOR = 1024
    // Perform the conversion by dividing the megabytes by the conversion factor
    const gigabytes = megabytes / MB_TO_GB_CONVERSION_FACTOR
    return gigabytes
}

/**
 * Converts a given file size in megabytes (MB) to bytes.
 *
 * @param {number} fileSize - The file size in megabytes to be converted.
 * @returns {number} - The equivalent file size in bytes, rounded to two decimal places.
 */
export const convertMBToBytes = (fileSize: number): number => {
    const fileSizeinBytes = fileSize * (1024 * 1024)
    return Number(fileSizeinBytes.toFixed(2))
}

/**
 * Converts a given file size in kilobytes (KB) to bytes.
 *
 * @param {number} fileSize - The file size in kilobytes to be converted.
 * @returns {number} - The equivalent file size in bytes, rounded to two decimal places.
 */
export const convertKBToBytes = (fileSize: number): number => {
    const fileSizeinBytes = fileSize * 1024
    return Number(fileSizeinBytes.toFixed(2))
}

/**
 * Uploads a file to the server using a bulk upload API and handles retries on failure.
 *
 * @param {uploadedImageType} item - The file item to be uploaded. Contains details about the file.
 * @param {boolean} [isRetrying=false] - Flag to indicate if the function is being retried after a failure.
 * @returns {Promise<Object|null>} - A promise that resolves to an object containing upload details, or `null` if the operation fails.
 *
 * @typedef {Object} uploadedImageType
 * @property {File} file - The file object to be uploaded.
 *
 * @typedef {Object} ModuleTypeEnum
 * @property {string} PURCHASE_ORDER - Module type for purchase orders.
 *
 * @typedef {Object} ModuleTaskEnum
 * @property {string} CUSTOMER_PO_UPLOAD_DATA - Task for uploading customer purchase order data.
 *
 * @throws {Error} - Propagates the error if retries also fail.
 *
 * @example
 * const fileItem = { file: new File(["content"], "example.txt", { type: "text/plain" }) };
 * hitBulkUploadApi(fileItem)
 *   .then((result) => console.log(result))
 *   .catch((error) => console.error(error));
 */

export const hitBulkUploadApi = async ({
    item,
    isRetrying,
    moduleType,
    documentType,
    isDirectlyUpdateToBackend = true,
}: FileUpload & {
    item: uploadedFileType
}): Promise<Partial<uploadedFileType> | null | undefined> => {
    try {
        const payload = {
            module_type: moduleType,
            file_name: item.file.name,
            document_type: documentType,
        }
        const response = await FetchHelper.get(CONFIG.API_ENDPOINTS.GET_S3_UPLOAD_URL, payload)
        if (response?.data?.upload_url) {
            const uploadUrl = response.data.upload_url
            await FetchHelper.putFileData(new URL(uploadUrl), item.file, item.file.type)
            const updatedItemObject = {
                uuid: null,
                name: response?.data?.file_name,
                size: item.file.size,
                file_format: item.file.type,
                description: null,
                module_type: moduleType,
                type: documentType,
            }
            return isDirectlyUpdateToBackend
                ? updatedItemObject
                : {
                      ...updatedItemObject,
                      local_uuid: item?.local_uuid,
                  }
        }
    } catch (error) {
        if (isRetrying) {
            handleError(error)
        } else {
            return hitBulkUploadApi({
                item,
                isRetrying: true,
                moduleType,
                documentType,
                isDirectlyUpdateToBackend,
            })
        }
    }
}

/**
 * Handles the upload of multiple files sequentially by calling the `hitBulkUploadApi` function for each file.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array of uploaded file details.
 * If an error occurs, the function handles it and continues processing the remaining files.
 *
 * @throws {Error} - Propagates the error if it occurs during the file upload process.
 *
 * @example
 * handleUploadFile()
 *   .then((uploadedItems) => console.log(uploadedItems))
 *   .catch((error) => console.error("Upload failed:", error));
 */
export const handleUploadFile = async ({
    fileToUpload,
    moduleType,
    documentType,
    isDirectlyUpdateToBackend = true,
}: FileUpload & {
    fileToUpload: uploadedFileType[]
}) => {
    const items = []
    try {
        for (const item of fileToUpload) {
            const _item = await hitBulkUploadApi({
                documentType,
                item,
                moduleType,
                isRetrying: false,
                isDirectlyUpdateToBackend,
            })
            if (_item) {
                items.push(_item)
            }
        }
    } catch (error) {
        handleError(error)
    }
    return items
}

/**
 * Retrieves the download URL for a file from the server using its UUID.
 *
 * This function checks if the provided file object contains a `uuid` property and does not have a `local_uuid` property.
 * If so, it requests a signed S3 download URL from the backend API. If the API returns a valid download URL,
 * it is returned; otherwise, null is returned.
 *
 * @async
 * @function getFileUrl
 * @param {AnyObject} file - The file object, expected to have a `uuid` property for remote files.
 * @returns {Promise<string|null>} The download URL as a string if available, or null if not found or on error.
 *
 * @example
 * const url = await getFileUrl({ uuid: "abc-123" });
 * if (url) {
 *   // Use the download URL
 * }
 */
export const getFileUrl = async (file: AnyObject): Promise<string | null> => {
    try {
        if (typeof file === "object") {
            if (file?.uuid && !file?.local_uuid) {
                const response = await FetchHelper.get(CONFIG.API_ENDPOINTS.GET_S3_DOWNLOAD_URL, {
                    document_uuid: file?.uuid,
                })
                if (response?.data?.download_url) {
                    return response?.data?.download_url
                }
                return null
            }
            return null
        }
        return null
    } catch (error) {
        handleError(error)
        return null
    }
}
