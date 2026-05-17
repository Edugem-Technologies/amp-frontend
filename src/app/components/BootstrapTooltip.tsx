"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import type { Tooltip as BootstrapTooltipType } from "bootstrap"

export default function BootstrapTooltip() {
    const pathname = usePathname()

    useEffect(() => {
        let tooltipInstances: BootstrapTooltipType[] = []

        const initTooltips = async () => {
            const bootstrap = await import("bootstrap")
            const Tooltip = bootstrap.Tooltip

            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')

            tooltipInstances = Array.from(tooltipTriggerList).map((el) => {
                return new Tooltip(el, {
                    trigger: "hover",
                })
            })
        }

        initTooltips()

        return () => {
            tooltipInstances.forEach((tooltip) => {
                tooltip.dispose()
            })
        }
    }, [pathname])

    return null
}
