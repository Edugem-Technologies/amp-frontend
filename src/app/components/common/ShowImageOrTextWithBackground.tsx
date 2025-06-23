import { ShowImageOrTextWithBackgroundPropType } from "@/types/common/ShowImageOrTextWithBackground"
import { getImageUrl, getResizedImage } from "@/utils/helpers"
import React, { useEffect, useState } from "react"
import Icon from "./Icon"

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
    const [isImageValid, setIsImageValid] = useState(true)
    const [image, setImage] = useState(getImageUrl(imageSource, size))
    useEffect(() => {
        if (imageSource) {
            const img = getResizedImage(imageSource, size)
            setImage(img)
            setIsImageValid(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageSource])
    return (
        <div
            className={`${className} ${
                isImageValid && imageSource?.resizer_url && imageSource.path ? customClassName : ""
            }`}
        >
            {isImageValid && imageSource?.resizer_url && imageSource.path ? (
                <img
                    className={`object-fit-contain w-100 h-100 bg-white ${
                        squareImage && "rounded-3"
                    } ${imageClassName}`}
                    src={image}
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
