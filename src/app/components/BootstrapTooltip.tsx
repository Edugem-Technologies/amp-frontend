"use client"

import { useEffect } from "react"
import { Tooltip } from "bootstrap"

export default function BootstrapTooltip() {
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')

        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new Tooltip(tooltipTriggerEl)
        })
    }, [])

    return null
}
