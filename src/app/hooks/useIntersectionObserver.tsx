import { useState, useEffect, MutableRefObject } from "react"

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
