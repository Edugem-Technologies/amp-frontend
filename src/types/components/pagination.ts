export interface PaginationPropType {
    onChange: (
        e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLLIElement>,
        value: number,
    ) => void
    totalCount: number
    siblingCount?: number
    page: number
    page_size: number
    onPageChange: (value: number) => void
}

export interface UsePaginationHookType {
    total: number
    page_size: number
    siblingCount: number
    page: number
}

export interface PaginationType {
    page: number
    page_size: number
    pagination_type: string
}
export interface TablePaginationPropType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setPagination: (value: React.SetStateAction<PaginationType & any>) => void
    pagination: PaginationType & object
    totalCount: number
}
