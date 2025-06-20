"use client"
import { CommonListProps } from "@/types/common/CommonList"
import { AnyObject } from "@/types/common/helper"
import { fetchColumnData } from "@/utils/FetchData"
import { ColumnDef } from "@tanstack/react-table"
import React, { useEffect, useState } from "react"
import ReactTableWithPagination from "./ReactTableWithPagination"
import TableCardViewSwitch from "./TableCardViewSwitch"
import CustomButton from "../button/Button"

const CommonList = ({
    title,
    columns,
    endpoint,
    refetch = false,
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
    extraColumns = [],
    moduleType,
    sortingId,
    sortByDesc = false,
    getFetchResponse,
    renderTitlePrefix,
}: CommonListProps) => {
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
                columns={columns?.length ? columns : getColumns}
                endpoint={endpoint}
                dependencies={[refetch, ...dependencies]}
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
