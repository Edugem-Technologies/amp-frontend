import { ImgHTMLAttributes } from "react"

/**
 * Represents the properties for an icon component.
 *
 * Extends the standard HTML image attributes with additional properties
 * specific to icon usage.
 *
 * Either `iconName` or `iconPath` must be provided.
 * If `iconPath` is not provided, the icon will be rendered from the SVG icons set.
 *
 * @extends ImgHTMLAttributes<HTMLImageElement>
 *
 * @property iconName - The unique name or identifier for the icon.
 * @property width - Optional width of the icon in pixels.
 * @property height - Optional height of the icon in pixels.
 * @property className - Optional CSS class name(s) for styling the icon.
 * @property iconPath - Optional path to the icon image file. If not provided, uses SVG icon.
 */

type IconTypeBase = ImgHTMLAttributes<HTMLImageElement> & {
    width?: number
    height?: number
    className?: string
}

export type IconType =
    | (IconTypeBase & { iconName: string; iconPath?: undefined })
    | (IconTypeBase & { iconName?: undefined; iconPath: string; alt: string })
