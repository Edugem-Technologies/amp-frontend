import React from "react"

type Props = {
    value: number
    color?: string
    height?: number
    width?: string
    backgroundColor?: string
}

const ProgressLine: React.FC<Props> = ({
    value,
    color = "#28C76F",
    height = 8,
    width = "100%",
    backgroundColor = "#E9ECEF",
}) => {
    return (
        <div className="progress-line" style={{ height, width, backgroundColor }}>
            <div
                className="progress-line__fill"
                style={{
                    width: `${value}%`,
                    backgroundColor: color,
                }}
            />
        </div>
    )
}

export default ProgressLine
