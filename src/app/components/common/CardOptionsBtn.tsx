import React from "react"

const CardOptionsBtn = ({ btnClass }: { btnClass: string }) => {
    return (
        <button type="button" className={`card-options-btn btn ${btnClass}`}>
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
