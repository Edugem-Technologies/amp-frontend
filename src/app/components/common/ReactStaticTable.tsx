import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react"
import ReactTable from "./ReactTable"
import TablePagination from "./TablePagination"
import { CONFIG } from "@/utils/constants"
import { Any } from "@/types/common/helper"
import CustomTooltip from "./CustomTooltip"
import { ReactTableProps, ReactTableWithPaginationPropType } from "@/types/components/react-table"

const ReactStaticTable = <T extends object>(
    props: Pick<ReactTableWithPaginationPropType, "columns" | "isTableView" | "renderGridView"> & {
        tableProps?: ReactTableProps<T>
        data: Array<T>
    },
) => {
    const { columns, isTableView = true, renderGridView, tableProps, data } = props
    const [totalCount] = useState(0)
    const [dataView] = useState(isTableView)
    const [filter, setFilter] = useState({
        page: CONFIG.PAGINATION.PAGE,
        size: CONFIG.PAGINATION.SIZE,
    })

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: "onChange",
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <>
            <div className="card px-0 shadow">
                <div className="card-body">
                    {dataView ? (
                        <>
                            <div className="table-responsive">
                                <ReactTable {...tableProps} table={table} />
                            </div>
                        </>
                    ) : (
                        !!renderGridView && data?.map((item: Any) => renderGridView(item))
                    )}
                    <TablePagination
                        pagination={filter}
                        setPagination={setFilter}
                        totalCount={totalCount}
                    />
                </div>
            </div>
            <CustomTooltip id="v-status-tooltip" />
        </>
    )
}

export default ReactStaticTable
