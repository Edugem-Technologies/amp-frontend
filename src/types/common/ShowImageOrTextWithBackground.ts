import { AnyObject } from "./helper"

export interface ShowImageOrTextWithBackgroundPropType {
    color: string
    text: string | undefined
    imageSource: AnyObject | null | undefined
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
