import { SvgIconComponent } from "@mui/icons-material"

export interface SidebarItemsType {
    label: string
    href?: string
    sidebarItems?: SidebarItemsType[]
    icon?: string | SvgIconComponent
    collapsable?: boolean
}
