export interface TaskCheckItem {
    id: string
    label: string
}

export interface Fence {
    id: string
    userName: string
    userImage?: string
    taskCheckList: TaskCheckItem[]
}

export interface SlideTask {
    id: string
    title: string
    starred?: boolean
}

export interface DropdownSelectorItem {
    id: string
    label: string
}

export interface SlideMenuData {
    sections?: SlideTask[]
    projects?: SlideTask[]
    dropdownSelector?: DropdownSelectorItem[]
}
