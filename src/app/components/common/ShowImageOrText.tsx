// import { getImageUrl } from "@/app/_utils/Helpers"
import React, { useEffect, useState } from "react"
import Icon from "./Icon"
// import { getResizedImage } from "@/app/_utils/Helpers"
export interface ShowImageOrTextWithBackgroundPropType {
    color: string
    text: string | undefined
    imageSource: string | null
    alt: string
    size: string
    className?: string
    customClassName?: string
    imageClassName?: string
    squareImage?: boolean
    small?: boolean
    textClassName?: string
    iconName?: string
    iconWidth?: number
    iconHeight?: number
    iconClassName?: string
}
const ShowImageOrTextWithBackground: React.FC<ShowImageOrTextWithBackgroundPropType> = ({
    color,
    text,
    imageSource,
    alt,
    size,
    className = "",
    customClassName = "",
    imageClassName = "",
    squareImage = false,
    small = false,
    textClassName = "",
    iconClassName,
    iconHeight,
    iconWidth,
    iconName,
}) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const bgColor = React.useMemo(() => color, [text])
    const [, setIsImageValid] = useState(true)
    const [image, setImage] = useState(imageSource)
    useEffect(() => {
        if (imageSource) {
            const img = imageSource
            setImage(img)
            setIsImageValid(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageSource])

    return (
        <div className={`${className} ${imageSource ? customClassName : ""}`}>
            {imageSource ? (
                <img
                    className={`object-fit-cover w-100 h-100 ${
                        squareImage && "rounded-3"
                    } ${imageClassName}`}
                    src={image || ""}
                    onError={() => {
                        setIsImageValid(false)
                    }}
                    alt={alt}
                />
            ) : (
                <span
                    className={`${small ? "show-text-with-background-sm" : ""} ${textClassName} ${
                        squareImage
                            ? "show-text-with-background-square rounded-3"
                            : "show-text-with-background"
                    } mx-auto`}
                    style={{
                        backgroundColor: bgColor,
                        width: size.split("x")?.[0] + "px",
                        height: size.split("x")?.[1] + "px",
                        maxHeight: "100%",
                        maxWidth: "100%",
                    }}
                >
                    {iconName ? (
                        <Icon
                            iconName={iconName}
                            height={iconHeight}
                            width={iconWidth}
                            className={iconClassName || ""}
                        />
                    ) : (
                        <span className="show-text">{text?.[0].toUpperCase()}</span>
                    )}
                </span>
            )}
        </div>
    )
}

export default ShowImageOrTextWithBackground
