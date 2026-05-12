// btn-active-white
// btn-active-color-primary
import React from "react"

interface Props {
    isActive?: boolean
    btnType: string
}

const CardOptionsBtn = ({ isActive, btnType }: Props) => {
    console.log("btnType", btnType)
    const btnClassname = btnType === "primary" ? "btn-color-primary" : "btn-color-white"
    const activeBtnClassname =
        btnType === "primary" ? "btn-active-light-primary" : "btn-active-white"
    return (
        <button
            type="button"
            className={`btn btn-sm btn-icon border-0 me-n3 show menu-dropdown ${btnClassname} ${
                isActive ? activeBtnClassname : ""
            }`}
        >
            <span className="svg-icon svg-icon-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                >
                    <g stroke="none" fill="none">
                        <rect x="5" y="5" width="5" height="5" rx="1" fill="#000000" />
                        <rect
                            x="14"
                            y="5"
                            width="5"
                            height="5"
                            rx="1"
                            fill="#000000"
                            opacity="0.3"
                        />
                        <rect
                            x="5"
                            y="14"
                            width="5"
                            height="5"
                            rx="1"
                            fill="#000000"
                            opacity="0.3"
                        />
                        <rect
                            x="14"
                            y="14"
                            width="5"
                            height="5"
                            rx="1"
                            fill="#000000"
                            opacity="0.3"
                        />
                    </g>
                </svg>
            </span>
        </button>
    )
}

export default CardOptionsBtn
