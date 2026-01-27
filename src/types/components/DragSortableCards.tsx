export type SortItem = {
    id: string
    label: string
}

type HeaderAction = {
    id: string
    icon: string
    onClick: (columnId: string) => void
}

export type DragColumnProps = {
    id: string
    title: string
    items: SortItem[]
    onChange: (items: SortItem[]) => void
    actions?: HeaderAction[]
}
