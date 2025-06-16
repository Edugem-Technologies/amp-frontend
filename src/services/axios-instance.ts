import { getAccessToken } from "@/utils/common"
import { CONFIG, OPEN_ENDPOINTS } from "@/utils/constants"
import axios from "axios"
import { parseResponseError } from "./fetch-helper"
import { Any } from "@/types/common/helper"

/**
 * Axios instance with custom interceptors for handling authorization and response data.
 * @type {import("axios").AxiosInstance}
 */
export const axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
    },
})

/**
 * Axios request interceptor to add authorization header for secured endpoints.
 * @param {config} _config Axios request configuration object.
 * @returns {config} Updated Axios request configuration object with Authorization header.
 */
axiosInstance.interceptors.request.use((_config) => {
    if (!OPEN_ENDPOINTS.includes(_config.url as string)) {
        const accessToken = getAccessToken()
        _config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return _config
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
            status === CONFIG.STATUS_CODES.UNAUTHORIZED &&
            // This below condition is for the endpoints which are open and get unauthenticated status code for wrong credentials like login
            !OPEN_ENDPOINTS.includes(responseURL)
        ) {
            try {
                // TODO: will update it once implement refresh token/Login API
                // const data = await refreshToken()
                // axios.defaults.headers.common["Authorization"] = `Bearer ${data?.access_token}`
                const originalRequest = error.config
                // originalRequest.headers["Authorization"] = `Bearer ${data?.access_token}`
                return (await axios(originalRequest))?.data
            } catch (_refreshError) {
                const refreshError = _refreshError as Any
                throw {
                    error: new Error(parseResponseError(refreshError?.response?.data)),
                    status: refreshError?.response?.status,
                }
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
