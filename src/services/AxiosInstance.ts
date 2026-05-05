import { Any } from "@/types/common/Helper"
import { CONFIG, OPEN_ENDPOINTS } from "@/utils/Constants"
import { removeIsAuthenticated } from "@/utils/Helpers"
import axios from "axios"
import mem from "mem"
import { parseResponseError } from "./FetchHelper"

/**
 * Memoized function to refresh the authentication token.
 *
 * This function attempts to refresh the user's authentication token by making a GET request
 * to the refresh token endpoint defined in the configuration. If the refresh fails, it handles
 * the error by parsing the response, removing authentication state, and redirecting the user
 * to the login page after a short delay to allow any error messages to be displayed.
 *
 * The function is memoized using the `mem` library to prevent multiple simultaneous refresh
 * requests within a specified time window (`CONFIG.REFRESH_TOKEN_MEMOIZED_TIME`).
 *
 * @async
 * @function refreshToken
 * @returns {Promise<void>} Resolves if the token is refreshed successfully, otherwise throws an error object containing the parsed error and status code.
 * @throws {Object} Throws an object with `error` (parsed error message) and `status` (HTTP status code) if the refresh fails.
 */
const refreshToken = mem(
    async () => {
        try {
            const url = CONFIG.API_ENDPOINTS.REFRESH_TOKEN
            axios.defaults.withCredentials = true
            await axios.get(url.toString())
        } catch (_refreshError) {
            const refreshError = _refreshError as Any
            const generatedError = parseResponseError(refreshError.response.data as Response)
            removeIsAuthenticated()
            // need to add a delay to show the sweetalert before redirecting to login page
            setTimeout(() => {
                window.location.replace("/auth/login")
            }, 1000)
            throw { error: generatedError, status: refreshError.response.status }
        }
    },
    { maxAge: CONFIG.REFRESH_TOKEN_MEMOIZED_TIME },
)

/**
 * Axios instance with custom interceptors for handling authorization and response data.
 * @type {import("axios").AxiosInstance}
 */
export const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
    },
})

/**
 * Axios response interceptor to handle responses with no content or return response data.
 * @param {import("axios").AxiosResponse} response Axios response object.
 * @returns {Promise<null|any>} Null if response status is NO_CONTENT, otherwise response data.
 */
axiosInstance.interceptors.response.use(
    (response) => {
        if (response.status === CONFIG.STATUS_CODES.NO_CONTENT) {
            return null
        } else return response.data
    },
    async (error) => {
        const status = error?.response?.status
        const responseData = error?.response?.data
        const responseURL = error?.response?.request?.responseURL

        // Helper to throw parsed or generic error
        const throwParsedOrGenericError = (statusCode?: number) => {
            const parsedError = parseResponseError(responseData)
            throw {
                error: parsedError || CONFIG.MESSAGES.GENERIC_ERROR,
                status: statusCode || CONFIG.STATUS_CODES.SERVER_ERROR,
            }
        }

        if (status === CONFIG.STATUS_CODES.FORBIDDEN) {
            throwParsedOrGenericError(status)
        } else if (
            // If the response status is UNAUTHORIZED and the request URL is not in the list of open (public) endpoints,
            // attempt to refresh the token and retry the original request.
            status === CONFIG.STATUS_CODES.UNAUTHORIZED &&
            !OPEN_ENDPOINTS.includes(responseURL)
        ) {
            try {
                // After refreshing the token, retry the original request and return its data
                await refreshToken()
                const originalRequest = error.config // Store the original request configuration that failed due to unauthorized error
                await new Promise((resolve) => setTimeout(resolve, 200)) // Wait for 200ms before retrying the request (to allow new cookies to be set in browser)
                return (await axios(originalRequest))?.data // Retry the original request with the new token and return its response data
            } catch (_refreshError) {
                const refreshError = _refreshError as Any
                throw refreshError
            }
        } else if (status === CONFIG.STATUS_CODES.SERVER_ERROR) {
            throw {
                error: CONFIG.MESSAGES.GENERIC_ERROR,
                status,
            }
        } else {
            throwParsedOrGenericError(status)
        }
    },
)
