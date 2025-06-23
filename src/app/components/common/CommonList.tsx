"use client"
import {
    BackendDrivenColumns,
    ClientDrivenColumns,
    CommonListProps,
} from "@/types/common/CommonList"
import { Any, AnyObject } from "@/types/common/helper"
import { fetchColumnData } from "@/utils/FetchData"
import { ColumnDef } from "@tanstack/react-table"
import React, { useEffect, useState } from "react"
import CustomButton from "../button/Button"
import ReactTableWithPagination from "./ReactTableWithPagination"
import TableCardViewSwitch from "./TableCardViewSwitch"

/**
 * CommonList is a reusable component for displaying tabular data with optional grid view,
 * supporting both backend-driven and client-driven column definitions.
 * It provides features like pagination, sorting, filtering, custom toolbars, and add button.
 *
 * @component
 * @param {CommonListProps} props - The props for CommonList.
 * @param {string} props.title - The title displayed above the table.
 * @param {string} props.endpoint - The API endpoint to fetch data from.
 * @param {Function} [props.onAddButton] - Callback for the add button click.
 * @param {Function} [props.renderCustomToolbar] - Function to render custom toolbar elements.
 * @param {string} [props.addButtonTitle] - The default title for the add button.
 * @param {boolean} [props.assetDeleted=false] - Flag to indicate if an asset was deleted (triggers reload).
 * @param {string} [props.tableClassName] - Additional class names for the table.
 * @param {Array<any>} [props.dependencies=[]] - Dependencies to trigger data reload.
 * @param {object} [props.extraFilters={}] - Extra filters to apply to the data fetch.
 * @param {Function} [props.setIsActionsDisabled] - Callback to enable/disable actions based on data.
 * @param {Function} [props.setIsTableView] - Callback to toggle between table and grid view.
 * @param {boolean} [props.isTableView=true] - Whether the table view is active.
 * @param {Function} [props.renderGridView] - Function to render grid view for each row.
 * @param {string} [props.customAddButtonTitle] - Custom title for the add button.
 * @param {boolean} [props.isAddButtonDisabled=false] - Whether the add button is disabled.
 * @param {string} [props.moduleType] - Module type for backend-driven columns.
 * @param {string} [props.sortingId] - Default column id to sort by.
 * @param {boolean} [props.sortByDesc=false] - Whether to sort descending by default.
 * @param {Function} [props.getFetchResponse] - Callback to receive the raw fetch response.
 * @param {Function} [props.renderTitlePrefix] - Function to render a prefix before the title.
 * @param {boolean} [props.isBackendDrivenColumns] - Whether to use backend-driven columns.
 * @param {Array<ColumnDef>} [props.extraColumns] - Extra columns to append (backend-driven).
 * @param {Array<ColumnDef>} [props.columns] - Columns to use (client-driven).
 *
 * @example
 * <CommonList
 *   title="Users"
 *   endpoint="/api/users"
 *   isBackendDrivenColumns
 *   moduleType="USER"
 *   extraColumns={columns}
 *   onAddButton={() => setShowAddUserModal(true)}
 *   addButtonTitle="User"
 *   tableClassName="user-table"
 *   isTableView={isTableView}
 *   setIsTableView={setIsTableView}
 * />
 */
const CommonList = (props: CommonListProps) => {
    const {
        title,
        endpoint,
        onAddButton,
        renderCustomToolbar,
        addButtonTitle,
        assetDeleted = false,
        tableClassName = "",
        dependencies = [],
        extraFilters = {},
        setIsActionsDisabled,
        setIsTableView,
        isTableView = true,
        renderGridView,
        customAddButtonTitle,
        isAddButtonDisabled = false,
        moduleType,
        sortingId,
        sortByDesc = false,
        getFetchResponse,
        renderTitlePrefix,
        isBackendDrivenColumns,
    } = props

    // Use type guard to safely access extraColumns or columns
    let extraColumns: ColumnDef<AnyObject>[] = []
    let columns: ColumnDef<Any, Any>[] = []

    if (isBackendDrivenColumns) {
        // TypeScript now knows props is BackendDrivenColumns
        extraColumns = (props as BackendDrivenColumns).extraColumns ?? []
    } else {
        // TypeScript now knows props is ClientDrivenColumns
        columns = (props as ClientDrivenColumns).columns
    }
    const [totalCount, setTotalCount] = useState(0)
    const [columnResponse, setColumnResponse] = useState<ColumnDef<AnyObject>[]>([])
    useEffect(() => {
        const fetchData = async () => {
            if (moduleType) {
                const columns = await fetchColumnData({ moduleType })
                setColumnResponse(columns)
            }
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getColumns = React.useMemo<ColumnDef<AnyObject>[]>(
        () => {
            if (columnResponse.length === 0) {
                return [...columnResponse] // Only columnResponse when totalCount is 0
            }
            return [...columnResponse, ...extraColumns] // Spread extraColumns if totalCount is greater than 0
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [columnResponse, extraColumns, totalCount], // Add totalCount to dependency array
    )
    return (
        <>
            <div className="table-header flex-wrap border-0 d-flex justify-content-between align-items-center px-0 mb-1">
                <div className="d-flex gap-3">
                    {renderTitlePrefix && renderTitlePrefix()}
                    <h3 className="card-title align-items-start d-flex flex-column">
                        <span className="card-label fw-bold fs-5 mb-1">{title}</span>
                        <span className="text-muted fw-semibold fs-6">{totalCount} total</span>
                    </h3>
                </div>
                {
                    <div className="card-toolbar">
                        <div className="d-flex flex-stack flex-wrap gap-2">
                            {setIsTableView && (
                                <TableCardViewSwitch
                                    setTableView={setIsTableView}
                                    tableView={isTableView}
                                />
                            )}
                            {renderCustomToolbar && renderCustomToolbar()}
                            {(!!addButtonTitle || !!customAddButtonTitle) && (
                                <>
                                    <CustomButton
                                        customClassName="btn-dark"
                                        disabled={isAddButtonDisabled}
                                        buttonTitle={
                                            customAddButtonTitle ?? `Create New ${addButtonTitle}`
                                        }
                                        type="button"
                                        onClick={() => onAddButton && onAddButton()}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                }
            </div>
            <ReactTableWithPagination
                isBackendDrivenColumns={isBackendDrivenColumns}
                columns={isBackendDrivenColumns ? getColumns : columns ?? []}
                endpoint={endpoint}
                dependencies={dependencies}
                assetDeleted={assetDeleted}
                getFetchResponse={(response) => {
                    setTotalCount(response?.data?.metadata?.pagination?.total_items)
                    setIsActionsDisabled &&
                        setIsActionsDisabled(
                            response?.data?.metadata?.pagination_metadata?.total_items > 0
                                ? false
                                : true,
                        )
                    getFetchResponse && getFetchResponse(response)
                }}
                tableClassName={tableClassName}
                extraFilters={extraFilters}
                renderGridView={renderGridView}
                isTableView={isTableView}
                sortByDesc={sortByDesc}
                sortingId={sortingId}
            />
        </>
    )
}

export default CommonList
