"use client"
import HorizontalView from "@/app/components/common/HorizontalView"
import VerticalView from "@/app/components/common/VerticalView"
import { useAppContext } from "@/app/context/AppContext"
import { FENCES_FIXTURE } from "@/fixtures/GlobalData"
import { CONFIG } from "@/utils/Constants"
import { useEffect } from "react"

export default function Page() {
    const { layout, setLayout } = useAppContext()
    useEffect(() => {
        setLayout && setLayout(CONFIG.LAYOUT.HORIZONTAL)
    }, [])

    return (
        <div className="container-fluid main-dashboard-container container-wrapper">
            {layout === CONFIG.LAYOUT.VERTICAL && <VerticalView data={FENCES_FIXTURE} />}
            {layout === CONFIG.LAYOUT.HORIZONTAL && <HorizontalView data={FENCES_FIXTURE} />}
        </div>
    )
}
