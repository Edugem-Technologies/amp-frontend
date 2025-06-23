import { ColumnDef } from "@tanstack/react-table"
import { Dispatch, SetStateAction } from "react"
import { Any, AnyObject } from "./helper"
import { ModuleTypeEnum } from "@/enums/ModuleTypeEnum"

/**
 * Base properties for the common list component.
 */
interface BaseCommonListProps {
    columns?: ColumnDef<Any, Any>[]
    title: string
    endpoint: URL
    // metaDataEndpoint: URL
    refetch?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFetchResponse?: (response: Record<string, any>) => void
    assetDeleted?: boolean
    tableClassName?: string
    extraFilters?: object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dependencies?: any[]
    setIsActionsDisabled?: Dispatch<SetStateAction<boolean>>
    renderCustomToolbar?: () => React.ReactNode // renderCustomToolbar is required in this case
    onAddButton?: () => void | string
    addButtonTitle?: string
    isTableView?: boolean
    setIsTableView?: React.Dispatch<React.SetStateAction<boolean>>
    renderGridView?: ((data: Any) => React.ReactNode) | undefined
    customAddButtonTitle?: string
    isAddButtonDisabled?: boolean
    moduleType?: ModuleTypeEnum
    extraColumns?: ColumnDef<AnyObject>[]
    sortingId?: string
    sortByDesc?: boolean
    renderTitlePrefix?: () => React.ReactNode
}

/**
 * The final type for common list props based on whether renderCustomToolbar is defined.
 */
export type CommonListProps = BaseCommonListProps
