import { getLocalItem } from "@/utils/helpers"
import { useState, useEffect } from "react"

export function useLocalStorageEffect(source: string) {
    const [localData, setLocalData] = useState("")

    useEffect(() => {
        const getLocalData = () => {
            const userId: string = getLocalItem(source) || ""
            setLocalData(userId)
        }

        if (typeof window !== "undefined") {
            if (document.readyState === "complete") {
                getLocalData()
            } else {
                window.addEventListener("load", getLocalData)
                return () => window.removeEventListener("load", getLocalData)
            }
        }
        // eslint-disable-next-line
    }, [])

    return localData
}
