/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef, HeaderGroup, RowModel } from "@tanstack/react-table"
import { AnyObject } from "../common/helper"
import { Option } from "./ReactSelect"

/**
 * Props for supporting expanded rows in tables.
 * @property {string} [expandedRowId] - Optional ID of the expanded row.
 * @property {(id: string) => React.ReactNode} [renderExpandedRow] - Optional function to render expanded row content.
 */
export interface ExpandedRowWithTablePropType {
    expandedRowId?: string
    renderExpandedRow?: (id: string) => React.ReactNode
}

/**
 * Props for the ReactTable component.
 * @template T
 * @property {() => HeaderGroup<T>[]} getHeaderGroups - Returns the header groups for the table.
 * @property {() => RowModel<T>} getRowModel - Returns the row model for the table.
 * @property {() => HeaderGroup<T>[]} getFooterGroups - Returns the footer groups for the table.
 * @property {string} [className] - Optional CSS class for the table.
 * @property {boolean} [loading] - Optional flag to indicate loading state.
 * @property {number} [rowCount] - Optional row count for the table.
 * @property {React.Dispatch<React.SetStateAction<AnyObject>>} [setFilter] - Optional setter for table filters.
 * @property {AnyObject} [filter] - Optional filter object for the table.
 * @property {boolean} isBackendDrivenColumns - Flag to indicate if columns are backend-driven.
 * @property {string} [expandedRowId] - Optional ID of the expanded row.
 * @property {(id: string) => React.ReactNode} [renderExpandedRow] - Optional function to render expanded row.
 */
export interface ReactTableProps<T> extends ExpandedRowWithTablePropType {
    getHeaderGroups: () => HeaderGroup<T>[]
    getRowModel: () => RowModel<T>
    getFooterGroups: () => HeaderGroup<T>[]
    className?: string
    loading?: boolean
    rowCount?: number
    setFilter?: React.Dispatch<React.SetStateAction<AnyObject>>
    filter?: AnyObject
    isBackendDrivenColumns: boolean
}

/**
 * Interface for row identification.
 * @property {string} id - Unique identifier for the row.
 */
export interface RowId {
    id: string
}

/**
 * Props for the ReactTableWithPagination component.
 * @property {ColumnDef<any, any>[]} columns - Column definitions for the table.
 * @property {URL} endpoint - Endpoint URL for data fetching.
 * @property {any[]} [dependencies] - Optional dependencies for the table.
 * @property {(response: any) => void} [getFetchResponse] - Optional callback to handle fetch response.
 * @property {boolean} [showSearchBar] - Optional flag to show search bar.
 * @property {boolean} [assetDeleted] - Optional flag to indicate if an asset has been deleted.
 * @property {object} [extraFilters] - Optional extra filters for the table.
 * @property {string} [tableClassName] - Optional class name for the table.
 * @property {number} [rowCount] - Optional row count for the table.
 * @property {string | null} [sortingId] - Optional sorting ID for the table.
 * @property {boolean} [showTableHeader] - Flag to show the table header.
 * @property {string} [tableHeaderTitle] - Title of the table header.
 * @property {() => void} [onAddButtonClick] - Callback for the add button click.
 * @property {string} [addButtonLabel] - Label for the add button.
 * @property {string} [addButtonClassName] - Class name for the add button.
 * @property {(data: any) => React.ReactNode} [renderGridView] - Optional function to render grid view.
 * @property {boolean} [isTableView] - Optional flag to indicate table view.
 * @property {string} [columnClassName] - Optional class name for columns.
 * @property {boolean} [sortByDesc] - Optional flag to sort by descending order.
 * @property {boolean} isBackendDrivenColumns - Flag to indicate if columns are backend-driven.
 * @property {string} [expandedRowId] - Optional ID of the expanded row.
 * @property {(id: string) => React.ReactNode} [renderExpandedRow] - Optional function to render expanded row.
 */
export interface ReactTableWithPaginationPropType extends ExpandedRowWithTablePropType {
    columns: ColumnDef<any, any>[]
    endpoint: URL
    dependencies?: any[]
    getFetchResponse?: (response: any) => void
    showSearchBar?: boolean
    assetDeleted?: boolean
    extraFilters?: object
    tableClassName?: string
    rowCount?: number
    sortingId?: string | null
    showTableHeader?: boolean
    tableHeaderTitle?: string
    onAddButtonClick?: () => void
    addButtonLabel?: string
    addButtonClassName?: string
    renderGridView?: ((data: any) => React.ReactNode) | undefined
    isTableView?: boolean
    columnClassName?: string
    sortByDesc?: boolean
    isBackendDrivenColumns: boolean
}

/**
 * Type for searchable column options.
 * @property {boolean} [searchable] - Whether the column is searchable.
 * @property {boolean} [dropdown] - Whether the column uses a dropdown.
 * @property {string} [date] - Date format or flag for date columns.
 * @property {URL} [dynamicDropdown] - URL for fetching dynamic dropdown options.
 * @property {Option[] | undefined} [dropdownValues] - Static dropdown values.
 * @property {Option} [defaultValue] - Default value for the dropdown.
 * @property {string} [dynamicDropdownValue] - Value for dynamic dropdown.
 * @property {string} [searchableDropdownFilterKey] - Key for filtering dropdown search.
 * @property {string} [placeholder] - Placeholder text for the input.
 */
export type Searchable = {
    searchable?: boolean
    dropdown?: boolean
    date?: string
    dynamicDropdown?: URL
    dropdownValues?: Option[] | undefined
    defaultValue?: Option
    dynamicDropdownValue?: string
    searchableDropdownFilterKey?: string
    placeholder?: string
}
