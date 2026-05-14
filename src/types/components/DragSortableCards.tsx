import { HeaderActionsTypes } from "./HeaderActions"

export interface User {
    name: string
    avatar: string
}

export type SplitItems = {
    left?: TaskCheckItem[]
    right?: TaskCheckItem[]
}

export type ColumnItems = TaskCheckItem[] | SplitItems

export type DragColumnProps = {
    id: string
    title: string
    items: ColumnItems
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (items: any) => void
    actions?: HeaderActionsTypes[]
    userImage?: string
    routineData?: TaskCheckItem[]
    isRoutineOpen?: boolean
}

export type ActionButton = {
    id: string
    label: string
    icon: string
}

export type Status = {
    id: string
    label: string
}

export type TaskCheckItem = {
    id: string
    label?: string
    progress?: number | null
    status?: string
    desc?: string
    prgressLevel?: number
    users?: {
        name: string
        avatar: string
    }[]
    bgColor?: string
}

export type Fence = {
    id: string
    label?: string
    userName?: string
    userImage?: string
    tasks?: FenceTask[]
    taskCheckList: TaskCheckItem[]
}

export type FenceTask = {
    id: string
    title: string
    subtitle: string
    currentStatus: string
    statusList: Status[]
    users: string[]
    prgressLevel: number
    actions: ActionButton[]
}
