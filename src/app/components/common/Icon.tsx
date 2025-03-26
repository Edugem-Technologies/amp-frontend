import React from "react"
interface IconType {
    iconName: string
    width?: number
    height?: number
    className?: string
}

const Icon: React.FC<IconType> = ({ iconName, width = 13, height = 13, className = "" }) => {
    return (
        <img
            className={className}
            src={`/assets/media/icons/custom/${iconName}.svg`}
            width={width}
            height={height}
            alt={iconName}
        />
    )
}

export default Icon
