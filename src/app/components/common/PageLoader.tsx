"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const BODY_CLASSES =
    "page-loading-enabled page-loading header-fixed header-tablet-and-mobile-fixed aside-enabled aside-fixed"

export default function PageLoader() {
    const [loading, setLoading] = useState(true)
    const pathname = usePathname()

    useEffect(() => {
        setLoading(true)

        document.body.classList.add(...BODY_CLASSES.split(" "))

        const timer = setTimeout(() => {
            setLoading(false)
            document.body.classList.remove(...BODY_CLASSES.split(" "))
        }, 1000)

        return () => {
            clearTimeout(timer)
            document.body.classList.remove(...BODY_CLASSES.split(" "))
        }
    }, [pathname])

    if (!loading) return null

    return (
        <div className={BODY_CLASSES}>
            <div className="page-loader flex-column">
                <div className="d-flex align-items-center mt-5">
                    <span className="spinner-border text-primary"></span>
                    <span className="text-muted fs-6 fw-bold ms-5">Loading...</span>
                </div>
            </div>
        </div>
    )
}
