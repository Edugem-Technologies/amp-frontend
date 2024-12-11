import { CONFIG } from "./constants"

export const getAccessToken = () => {
    if (typeof window !== "undefined" && localStorage) {
        const accessToken = localStorage.getItem(CONFIG.LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN)
        return accessToken
    }
    return null
}

export const setAccessToken = (token: string) => {
    if (typeof window !== "undefined" && localStorage) {
        const accessToken = localStorage.setItem(CONFIG.LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN, token)
        return accessToken
    }
    return null
}

export const removeAccessToken = () => {
    if (typeof window !== "undefined" && localStorage) {
        localStorage.removeItem(CONFIG.LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN)
    }
}
