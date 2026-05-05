import { useState, useEffect } from "react"

/**
 * Custom hook to track whether a specified media query matches.
 *
 * @param {string} query - The media query to evaluate.
 * @returns {boolean} A boolean indicating whether the media query matches.
 */
export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia(query)
        const handleChange = () => {
            console.log(mediaQuery.matches)
            setMatches(mediaQuery.matches)
        }

        setMatches(mediaQuery.matches)
        mediaQuery.addEventListener("change", handleChange)

        return () => {
            mediaQuery.removeEventListener("change", handleChange)
        }
    }, [query])

    return matches
}
