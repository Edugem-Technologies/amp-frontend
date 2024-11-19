/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef, HeaderGroup, RowModel } from "@tanstack/react-table"

/**
 * Props for the ReactTable component.
 */
export interface ReactTableProps<T> {
    /**
     * Function to get header groups.
     * @returns {HeaderGroup<T>[]} The header groups.
     */
    getHeaderGroups: () => HeaderGroup<T>[]

    /**
     * Function to get row model.
     * @returns {RowModel<T>} The row model.
     */
    getRowModel: () => RowModel<T>

    /**
     * Function to get footer groups.
     * @returns {HeaderGroup<T>[]} The footer groups.
     */
    getFooterGroups: () => HeaderGroup<T>[]

    /**
     * Optional CSS class for the table.
     */
    className?: string

    /**
     * Optional flag to indicate loading state.
     */
    loading?: boolean

    /**
     * Optional row count for the table.
     */
    rowCount?: number
}

/**
 * Interface for row identification.
 */
export interface RowId {
    id: string
}

/**
 * Props for the MediaTableWithPagination component.
 */
export interface MediaTableWithPaginationPropType {
    /**
     * Column definitions for the table.
     */
    columns: ColumnDef<any, any>[]

    /**
     * API endpoint which fetches data.
     */
    endpoint: URL

    /**
     * Works as dependency array for useEffect.
     */
    dependencies?: any[]

    /**
     * Function to handle the response from the API call.
     * @param {any} response - The response from the API call.
     */
    getFetchResponse?: (response: any) => void

    /**
     * Filters to apply to the data.
     */
    filters: Record<string, any>

    /**
     * Optional CSS class for the table.
     */
    className?: string

    /**
     * Optional ID of the expanded row.
     */
    expandedRowId?: string

    /**
     * Function to render the expanded row.
     * @param {string} id - The ID of the expanded row.
     * @returns {React.ReactNode} The rendered expanded row.
     */
    renderExpandedRow?: (id: string) => React.ReactNode

    /**
     * Optional flag to indicate table view.
     */
    isTableView?: boolean

    /**
     * Function to render the grid view.
     * @param {any} asset - The asset to render.
     * @returns {React.ReactNode} The rendered grid view.
     */
    renderGridView?: (asset: any) => React.ReactNode
}
export interface ExpandedRowWithTablePropType {
    expandedRowId?: string
    renderExpandedRow?: (id: string) => React.ReactNode
}
/**
 * Props for the ReactTableWithPagination component.
 */
export interface ReactTableWithPaginationPropType extends ExpandedRowWithTablePropType {
    /** The column definitions for the table */
    columns: ColumnDef<any, any>[]
    /** The endpoint URL for data fetching */
    endpoint: URL
    /** Optional dependencies for the table */
    dependencies?: any[]
    /** Optional callback to handle fetch response */
    getFetchResponse?: (response: any) => void
    /** Optional flag to show search bar */
    showSearchBar?: boolean
    /** Optional flag to indicate if an asset has been deleted */
    assetDeleted?: boolean
    /** Optional extra filters for the table */
    extraFilters?: object
    /** Optional class name for the table */
    tableClassName?: string
    /** Optional row count for the table */
    rowCount?: number
    /** Optional sorting ID for the table */
    sortingId?: string | null

    /** Flag to show the table header */
    showTableHeader?: boolean
    /** Title of the table header */
    tableHeaderTitle?: string
    /** Callback for the add button click */
    onAddButtonClick?: () => void
    /** Label for the add button */
    addButtonLabel?: string
    /** Class name for the add button */
    addButtonClassName?: string
    dummyData?: any
}
