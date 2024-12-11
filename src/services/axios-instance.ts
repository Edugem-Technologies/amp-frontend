import { getAccessToken } from "@/utils/common"
import { CONFIG, OPEN_ENDPOINTS } from "@/utils/constants"
import axios from "axios"

/**
 * Axios instance with custom interceptors for handling authorization and response data.
 * @type {import("axios").AxiosInstance}
 */
export const axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
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
axiosInstance.interceptors.response.use((response) => {
    if (response.status === CONFIG.STATUS_CODES.NO_CONTENT) {
        return null
    } else return response.data
})
