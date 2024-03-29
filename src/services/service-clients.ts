import { config } from "@/utils/constants"

const tryJson = async (res: Response) => {
    try {
        return await res.json()
    } catch (_error) {
        return undefined
    }
}

const setHeaders = (token: string): { [key: string]: string } => {
    const headers = {
        Authorization: "Bearer " + token,
    }
    return headers
}

export const fetchPost = async (url: URL, data: object, token: string) => {
    return await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: setHeaders(token),
    }).then(async (resp) => {
        if (resp.status === config.STATUS.UNAUTHORIZED) {
            throw {
                status: config.STATUS.UNAUTHORIZED,
                message: config.MESSAGES.ACCESS_TOKEN_EXPIRED,
            }
        }
        if (!resp.ok) {
            const body = await tryJson(resp)
            if (body) {
                if (body.message) {
                    throw body
                }
            }
            throw new Error("Something went wrong")
        }
        return await resp.json()
    })
}

export const fetchPostFormData = async (url: URL, data: FormData, token: string) => {
    return await fetch(url, {
        method: "POST",
        headers: setHeaders(token),
        body: data,
    }).then(async (resp) => {
        if (resp.status === config.STATUS.UNAUTHORIZED) {
            throw {
                status: config.STATUS.UNAUTHORIZED,
                message: config.MESSAGES.ACCESS_TOKEN_EXPIRED,
            }
        }
        if (!resp.ok) {
            const body = await tryJson(resp)
            if (body) {
                if (body.message) {
                    throw body
                }
            }
            throw new Error("Something went wrong")
        }
        return await resp.json()
    })
}

export const fetchGet = async (url: URL, accessToken?: string) => {
    return await fetch(url, {
        method: "GET",
        headers: accessToken ? setHeaders(accessToken) : undefined,
    }).then(async (resp) => {
        if (resp.status === config.STATUS.UNAUTHORIZED) {
            throw {
                status: config.STATUS.UNAUTHORIZED,
                message: config.MESSAGES.ACCESS_TOKEN_EXPIRED,
            }
        }
        return await resp.json()
    })
}
