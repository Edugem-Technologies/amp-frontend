"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { iterateObject } from "@/utils/handle-error"
import { axiosInstance } from "./axios-instance"
import { CONFIG } from "@/utils/constants"

export type Params = Record<string, any>

const parseResponse = async (response: Response) => {
    if (response.status == CONFIG.STATUS_CODES.NO_CONTENT) {
        return null
    } else if (!response.ok) {
        const json = await response.json()
        throw new Error(parseResponseError(json))
    }
    try {
        return await response.json()
    } catch (error) {
        return null
    }
}
/**
 * Extracts and constructs an error message from a response object.
 *
 * This function iterates over the response object and constructs an error message.
 *
 * @param response - The response object containing error information.
 * @returns The constructed error message.
 */
export const parseResponseError = (response: Response) => {
    const errorMessage = iterateObject(response)
    return errorMessage
}

/**
 * Appends query parameters to a URL.
 *
 * This function creates a new URL object based on the provided URL and appends the given
 * query parameters. Existing query parameters are cleared before appending the new ones.
 *
 * @param url - The base URL to which the parameters will be appended.
 * @param params - An optional object containing key-value pairs of parameters to append.
 * @returns A new URL object with the appended query parameters.
 */
const appendParams = (url: URL, params?: Record<string, any>): URL => {
    const newUrl = new URL(url.href)
    if (params && Object.keys(params).length) {
        newUrl.searchParams.forEach((_, key) => {
            newUrl.searchParams.delete(key)
        })
        Object.entries(params).forEach(([key, value]) => {
            if (typeof value === "object") {
                newUrl.searchParams.set(key, JSON.stringify(value))
            } else {
                newUrl.searchParams.set(key, value)
            }
        })
    }
    return newUrl
}

/**
 * Helper object for making various HTTP requests with automatic token refreshing.
 */
export const FetchHelper = {
    /**
     * Performs a GET request.
     * @async
     * @function get
     * @memberof FetchHelper
     * @param {URL} url The URL to fetch.
     * @param {Params} [params] Optional parameters to append to the URL query string.
     * @returns {Promise<any>} A promise resolving to the response data.
     */
    get: async (url: URL, params?: Params): Promise<any> => {
        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "GET" })
    },
    /**
     * Performs a POST request.
     * @async
     * @function post
     * @memberof FetchHelper
     * @param {URL} url The URL to fetch.
     * @param {object} data The data to send in the request body.
     * @param {Params} [params] Optional parameters to append to the URL query string.
     * @returns {Promise<any>} A promise resolving to the response data.
     */
    post: async (url: URL, data: object, params?: Params): Promise<any> => {
        console.log("🚀 ~ post: ~ url:", url)
        console.log("🚀 ~ post: ~ data:", data)

        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "POST", data })
    },
    /**
     * Performs a PUT request.
     * @async
     * @function put
     * @memberof FetchHelper
     * @param {URL} url The URL to fetch.
     * @param {object} data The data to send in the request body.
     * @param {Params} [params] Optional parameters to append to the URL query string.
     * @returns {Promise<any>} A promise resolving to the response data.
     */
    put: async (url: URL, data: object, params?: Params): Promise<any> => {
        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "PUT", data })
    },
    /**
     * Performs a PATCH request.
     * @async
     * @function patch
     * @memberof FetchHelper
     * @param {URL} url The URL to fetch.
     * @param {object} data The data to send in the request body.
     * @param {Params} [params] Optional parameters to append to the URL query string.
     * @returns {Promise<any>} A promise resolving to the response data.
     */
    patch: async (url: URL, data: object, params?: Params): Promise<any> => {
        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "PATCH", data })
    },
    /**
     * Performs a DELETE request.
     * @async
     * @function delete
     * @memberof FetchHelper
     * @param {URL} url The URL to fetch.
     * @param {Params} [params] Optional parameters to append to the URL query string.
     * @returns {Promise<any>} A promise resolving to the response data.
     */
    delete: async (url: URL, params?: Params): Promise<any> => {
        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "DELETE" })
    },

    /**
     * Uploads file data using a PUT request.
     * @async
     * @function putFileData
     * @memberof FetchHelper
     * @param {URL} url The URL to upload the file to.
     * @param {any} data The data to send in the request body (file content).
     * @param {string} contentType The content type of the file data.
     * @returns {Promise<any>} A promise resolving to the parsed response data.
     */
    putFileData: async (url: URL, data: any, contentType: string) => {
        return await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": contentType,
            },
            body: data,
        }).then(parseResponse)
        // no need for catch here as we don't want to swallow errors
    },
    /**
     * Performs a GET request and returns the response as a Blob.
     * Useful for downloading files or binary data from the server.
     *
     * @async
     * @function getBlobResponse
     * @memberof FetchHelper
     * @param {URL} url - The URL to fetch.
     * @param {Params} [params] - Optional parameters to append to the URL query string.
     * @returns {Promise<Blob>} A promise resolving to the response Blob.
     *
     * @example
     * const blob = await FetchHelper.getBlobResponse(new URL('/api/file'), { id: 123 });
     * // Use blob to create a download link or process binary data
     */
    getBlobResponse: async (url: URL, params?: Params): Promise<Blob> => {
        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "GET", responseType: "blob" })
    },
}
