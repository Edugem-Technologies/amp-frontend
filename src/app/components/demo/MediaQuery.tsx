"use client"
import { useMediaQuery } from "@/app/hooks/useMediaQuery"

const MediaQuery = () => {
    const matched = useMediaQuery("(max-width: 767px)")
    return (
        <div>
            <h2>useMediaQuery hook</h2>
            <p className="m-0">Resize your screen to 767px to see the hidden text.</p>
            {matched && <strong>Hey! You found the hidden text.</strong>}
        </div>
    )
}

export default MediaQuery
