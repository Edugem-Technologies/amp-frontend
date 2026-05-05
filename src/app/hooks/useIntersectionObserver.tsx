import { useState, useEffect, MutableRefObject } from "react"

/**
 * Custom hook to determine if an element is intersecting with the viewport using the Intersection Observer API.
 *
 * @param {MutableRefObject<HTMLElement | null>} ref - A ref object pointing to the target HTML element to observe.
 * @param {IntersectionObserverInit} [options] - Optional configuration for the Intersection Observer.
 * @returns {boolean} - A boolean indicating whether the element is currently intersecting with the viewport.
 */
export default function useIntersectionObserver(
    ref: MutableRefObject<HTMLElement | null>,
    options?: IntersectionObserverInit,
) {
    const [intersecting, setIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting)
        }, options)

        if (ref?.current) {
            observer.observe(ref.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [ref, options])

    return intersecting
}
