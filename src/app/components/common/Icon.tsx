import { IconType } from "@/types/common/Icon"
import React from "react"

const Icon: React.FC<IconType> = ({
    iconName,
    width = 13,
    height = 13,
    className = "",
    ...props
}) => {
    return (
        <img
            className={className}
            src={`/assets/media/icons/custom/${iconName}.svg`}
            width={width}
            height={height}
            alt={iconName}
            {...props}
        />
    )
}

export default Icon
