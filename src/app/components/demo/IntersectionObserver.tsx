"use client"
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver"
import { useRef } from "react"

const IntersectionObserver = () => {
    const ref = useRef<HTMLParagraphElement | null>(null)
    const isInView = useIntersectionObserver(ref, { threshold: 0, rootMargin: "-60px" })
    return (
        <div>
            <h2>IntersectionObserver</h2>
            <p ref={ref} className={`m-0 ${isInView ? "text-danger" : ""}`}>
                This text turns to red when it is about to be visible on the screen
            </p>
        </div>
    )
}

export default IntersectionObserver
