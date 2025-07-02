import { Any } from "@/types/common/Helper"
import { ReactTableProps, ReactTableWithPaginationPropType } from "@/types/components/ReactTable"
import { CONFIG } from "@/utils/Constants"
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import CustomTooltip from "./CustomTooltip"
import ReactTable from "./ReactTable"
import StaticTablePagination from "./StaticTablePagination"

const ReactStaticTable = <T extends object>(
    props: Pick<ReactTableWithPaginationPropType, "columns" | "isTableView" | "renderGridView"> & {
        tableProps?: ReactTableProps<T>
        data: Array<T>
    },
) => {
    const { columns, isTableView = true, renderGridView, tableProps, data } = props
    const [dataView] = useState(isTableView)
    const [sorting, setSorting] = useState<SortingState>([{ desc: false, id: "" }])
    const [filter, setFilter] = useState({
        pageIndex: 0,
        pageSize: CONFIG.PAGINATION.SIZE,
    })

    const { getHeaderGroups, getRowModel, getFooterGroups } = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: "onChange",
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualSorting: false,
        manualPagination: false,
        onPaginationChange: setFilter,
        onSortingChange: setSorting,
        sortingFns: {
            customSort: (rowA, rowB, columnId) => {
                return rowA.original[columnId] > rowB.original[columnId]
                    ? 1
                    : rowA.original[columnId] < rowB.original[columnId]
                      ? -1
                      : 0
            },
        },
        state: {
            pagination: filter,
            sorting,
        },
    })

    return (
        <>
            <div className="card px-0 shadow">
                <div className="card-body">
                    {dataView ? (
                        <>
                            <div className="table-responsive">
                                <ReactTable
                                    isBackendDrivenColumns={false}
                                    {...tableProps}
                                    getHeaderGroups={getHeaderGroups}
                                    getRowModel={getRowModel}
                                    getFooterGroups={getFooterGroups}
                                />
                            </div>
                        </>
                    ) : (
                        !!renderGridView && data?.map((item: Any) => renderGridView(item))
                    )}
                    <StaticTablePagination
                        pagination={filter}
                        setPagination={setFilter}
                        totalCount={data.length}
                    />
                </div>
            </div>
            <CustomTooltip id="v-status-tooltip" />
        </>
    )
}

export default ReactStaticTable
