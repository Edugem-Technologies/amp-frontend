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

export function sliceWithEllipsis(name: string | undefined | null, sliceLimit: number): string {
    const slicedName = name?.slice(0, sliceLimit) || ""
    const ellipsis = name?.length && name.length > sliceLimit ? "  ..." : ""
    return slicedName ? slicedName + ellipsis : ""
}
