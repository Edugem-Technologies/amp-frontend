// types.ts
export type TaskChecklistItem = {
    id: string
    label: string
    checked: boolean
}

export type TaskMedia = {
    id: string
    name: string
    url: string
    type: string
    downloadable: boolean
}
export type TaskDetails = {
    category: string
    priority: "Low" | "Medium" | "High"
    calendar: string
    progress: number
    assignedTo: string
    dueDate: string
    tags: string[]
    notes: string
    checklist: TaskChecklistItem[]
    media: TaskMedia[]
    customDropdown?: {
        label: string
        options: string[]
        id: string
        value: string
    }
}

export type TaskRow = {
    id: string
    title: string
    assignedTo: string
    progress: number
    priority: "Low" | "Medium" | "High"
    details: TaskDetails
}

export type TaskSection = {
    id: string
    name: string
    rows: TaskRow[]
}
