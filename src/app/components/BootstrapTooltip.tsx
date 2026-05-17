"use client"

import { useEffect } from "react"

export default function BootstrapTooltip() {
    useEffect(() => {
        const loadTooltip = async () => {
            const { Tooltip } = await import("bootstrap")

            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')

            tooltipTriggerList.forEach((tooltipTriggerEl) => {
                new Tooltip(tooltipTriggerEl)
            })
        }

        loadTooltip()
    }, [])

    return null
}
