import { ColumnDef } from "@tanstack/react-table"
import { Dispatch, SetStateAction } from "react"
import { Any, AnyObject } from "./helper"
import { ModuleTypeEnum } from "@/enums/ModuleTypeEnum"

/**
 * Base properties for the CommonList component.
 */
interface BaseCommonListProps {
    /** Title to display for the list. */
    title: string
    /** API endpoint to fetch data from. */
    endpoint: URL
    /** Callback to handle the fetch response. */
    getFetchResponse?: (response: Record<string, Any>) => void
    /** Indicates an asset has been deleted (for UI refresh). */
    assetDeleted?: boolean
    /** Custom CSS class for the table. */
    tableClassName?: string
    /** Additional filters to apply to the data fetch. */
    extraFilters?: object
    /** Dependency array to control re-fetching or re-rendering. */
    dependencies?: Any[]
    /** Setter to enable or disable actions in the list. */
    setIsActionsDisabled?: Dispatch<SetStateAction<boolean>>
    /** Function to render a custom toolbar above the list. */
    renderCustomToolbar?: () => React.ReactNode
    /** Handler for the add button click event. */
    onAddButton?: () => void | string
    /** Text to display on the add button. */
    addButtonTitle?: string
    /** If true, displays the table view; otherwise, shows grid view. */
    isTableView?: boolean
    /** Setter to toggle between table and grid view. */
    setIsTableView?: React.Dispatch<React.SetStateAction<boolean>>
    /** Function to render a custom grid view for each data item. */
    renderGridView?: ((data: Any) => React.ReactNode) | undefined
    /** Custom text for the add button (overrides addButtonTitle if provided). */
    customAddButtonTitle?: string
    /** If true, disables the add button. */
    isAddButtonDisabled?: boolean
    /** Enum value representing the module type for backend-driven columns. */
    moduleType?: ModuleTypeEnum
    /** ID used for sorting the data. */
    sortingId?: string
    /** If true, sorts the data in descending order. */
    sortByDesc?: boolean
    /** Function to render a custom prefix before the title. */
    renderTitlePrefix?: () => React.ReactNode
}

/**
 * Props for CommonList when using backend-driven columns.
 * - `isBackendDrivenColumns` must be true.
 * - Optionally provide `extraColumns` to append to backend columns.
 */
export interface BackendDrivenColumns extends BaseCommonListProps {
    /** Indicates columns are fetched from the backend. */
    isBackendDrivenColumns: true
    /** Additional columns to append to backend-fetched columns. */
    extraColumns?: ColumnDef<AnyObject>[]
}

/**
 * Props for CommonList when using client-driven columns.
 * - `isBackendDrivenColumns` must be false.
 * - Must provide `columns` to define table structure on the client.
 */
export interface ClientDrivenColumns extends BaseCommonListProps {
    /** Indicates columns are defined on the client side. */
    isBackendDrivenColumns: false
    /** Array of column definitions for the table. */
    columns: ColumnDef<Any, Any>[]
}

/**
 * Discriminated union type for CommonList props.
 * Use either backend-driven or client-driven columns:
 * - If `isBackendDrivenColumns` is true, columns are fetched from the backend and `extraColumns` can be provided.
 * - If `isBackendDrivenColumns` is false, columns must be provided via the `columns` prop.
 *
 * Usage examples:
 *   <CommonList {...props} isBackendDrivenColumns extraColumns={...} />
 *   <CommonList {...props} isBackendDrivenColumns={false} columns={...} />
 */
export type CommonListProps = BackendDrivenColumns | ClientDrivenColumns
