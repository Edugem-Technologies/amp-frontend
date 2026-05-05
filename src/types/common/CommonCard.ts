import { AnyObject } from "./Helper"

export interface CommonCardInterface {
    first_name: string
    last_name?: string
    avatar: AnyObject | null | undefined
    email?: string
    editUserHref?: string
    buttonName?: string
    editButtonClass: string
    role?: string
    onClickEditButton?: () => void
    description?: string
    iconName?: string
    iconWidth?: number
    iconHeight?: number
    iconClassName?: string
    handleDelete?: () => Promise<void>
    primary?: boolean
    status?: string
    isEditDisabled?: boolean
}
