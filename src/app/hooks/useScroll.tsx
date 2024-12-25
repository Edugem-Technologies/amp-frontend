import { useState, useEffect } from "react"

/**
 * Custom hook to track the vertical scroll position of the window.
 *
 * This hook listens to the `scroll` event and updates the state with the current vertical scroll position (`window.scrollY`).
 *
 * @returns {number} The current vertical scroll position of the window in pixels.

 */
export default function useScroll() {
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return scrollPosition
}
