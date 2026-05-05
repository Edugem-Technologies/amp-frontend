"use client"
import useScroll from "@/app/hooks/useScroll"

const Scroll = () => {
    const position = useScroll()
    return (
        <div>
            <h2>useScroll hook</h2>
            <p className="m-0">Scroll position is: {position}</p>
        </div>
    )
}

export default Scroll
