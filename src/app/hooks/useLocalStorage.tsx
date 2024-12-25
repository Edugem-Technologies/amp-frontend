import { Any } from "@/types/common/helper"
import { useState } from "react"

/**
 * Custom hook to manage and synchronize state with local storage.
 *
 * @param {string} key - The key to use in local storage.
 * @param {Any} initialValue - The initial value to use if the key doesn't exist in local storage.
 * @returns {[Any, (value: Any) => void]} A stateful value and a function to update it.
 */
export default function useLocalStorage(
    key: string,
    initialValue: Any,
): [Any, (value: Any) => void] {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(error)
            return initialValue
        }
    })

    const setValue = (value: Any) => {
        try {
            setStoredValue(value)
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error(error)
        }
    }

    return [storedValue, setValue]
}
