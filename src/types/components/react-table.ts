import { ColumnDef, HeaderGroup, RowModel } from "@tanstack/react-table"

export interface ReactTableProps<T> {
    getHeaderGroups: () => HeaderGroup<T>[]
    getRowModel: () => RowModel<T>
    getFooterGroups: () => HeaderGroup<T>[]
    className?: string
    loading?: boolean
    rowCount?: number
}

export interface RowId {
    id: string
}

export interface MediaTableWithPaginationPropType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: ColumnDef<any, any>[]
    /**
     * API endpoint which fetches data
     */
    endpoint: URL
    /**
     * works as dependency array for useEffect
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dependencies?: any[]
    /**
     * return response from api call
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFetchResponse?: (response: any) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: Record<string, any>
    className?: string
    expandedRowId?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderExpandedRow?: (id: string) => React.ReactNode
    isTableView?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderGridView?: (asset: any) => React.ReactNode
}

export interface ReactTableWithPaginationPropType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: ColumnDef<any, any>[]
    /**
     * API endpoint which fetches data
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchData: (args: any) => any
    tableHeaderTitle: string
    onAddButtonClick: () => void
    addButtonLabel: string
    /**
     * works as dependency array for useEffect
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dependencies?: any[]
    /**
     * return response from api call
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFetchResponse?: (response: any) => void
    showSearchBar?: boolean
    assetDeleted?: boolean
    extraFilters?: object
}
