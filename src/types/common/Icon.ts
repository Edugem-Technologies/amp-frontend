import { ImgHTMLAttributes } from "react"

export interface IconType extends ImgHTMLAttributes<HTMLImageElement> {
    iconName: string
    width?: number
    height?: number
    className?: string
}
