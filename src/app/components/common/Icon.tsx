import { IconType } from "@/types/common/Icon"
import React from "react"

const Icon: React.FC<IconType> = ({
    iconName,
    width = 13,
    height = 13,
    className = "",
    iconPath = null,
    alt = null,
    ...props
}) => {
    return (
        <img
            className={className}
            src={iconPath ?? `/icons/${iconName}.svg`}
            width={width}
            height={height}
            alt={alt ?? iconName}
            {...props}
        />
    )
}

export default Icon
