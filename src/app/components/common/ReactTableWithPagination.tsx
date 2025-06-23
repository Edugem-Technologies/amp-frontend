import useDataDeleteEffect from "@/app/hooks/useDataDeleteEffect"
import { FetchHelper } from "@/services/fetch-helper"
import { Any, AnyObject } from "@/types/common/helper"
import { ReactTableWithPaginationPropType } from "@/types/components/react-table"
import { CONFIG } from "@/utils/constants"
import { getArray } from "@/utils/helpers"
import { getCoreRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import CardLoader from "./CardSkeleton"
import NoData from "./NoData"
import ReactTable from "./ReactTable"
import TablePagination from "./TablePagination"
import { useAppContext } from "@/app/context/AppContext"

const ReactTableWithPagination: React.FC<ReactTableWithPaginationPropType> = (props) => {
    const {
        columns,
        endpoint,
        getFetchResponse,
        assetDeleted = false,
        dependencies = [],
        extraFilters = {},
        tableClassName,
        rowCount,
        renderGridView,
        isTableView,
        columnClassName = " col-md-6 col-lg-4 col-xl-3",
        sortingId,
        sortByDesc = false,
        isBackendDrivenColumns,
    } = props

    const { setFilterState } = useAppContext()

    const [loading, setLoading] = useState(false)
    // this initial render state prevents the duplicate calling of API for the first time
    const [initialRender, setInitialRender] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [sorting, setSorting] = useState<SortingState>(
        sortingId
            ? [{ id: sortingId, desc: sortByDesc }]
            : sortingId === null
              ? []
              : [{ id: "name", desc: false }],
    )
    const [filter, setFilter] = useState<AnyObject>({
        page: CONFIG.PAGINATION.PAGE,
        limit: CONFIG.PAGINATION.SIZE,
        sort: sorting.reduce<Record<string, string>>((acc, { id, desc }) => {
            acc[id] = desc ? "desc" : "asc"
            return acc
        }, {}),
        ...extraFilters,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizedExtraFilters = useMemo(() => extraFilters, [JSON.stringify(extraFilters)])

    const reloadData = useDataDeleteEffect({
        data,
        filters: filter,
        initialRender,
        setFilters: setFilter,
        assetDeleted,
    })

    const getData = async () => {
        try {
            setLoading(true)
            let _filter: Record<string, Any> = {
                ...filter,
            }
            if (sorting?.length) {
                _filter = {
                    ...filter,
                    sort: sorting.reduce<Record<string, string>>((acc, { id, desc }) => {
                        acc[id] = desc ? "desc" : "asc"
                        return acc
                    }, {}),
                }
            } else {
                delete _filter["sort"]
            }
            setFilterState(_filter)
            const response = await FetchHelper.get(endpoint, _filter)

            if (response?.data) {
                setData(response.data.result)
                setTotalCount(response?.data?.metadata?.pagination?.total_items)
                // setLastPage(response?.data?.last_page)
                // this method is exposed to parent component to pass response to parent
                // that will help to set total count for card component
                if (getFetchResponse) {
                    getFetchResponse(response)
                }
            }
        } catch (error) {
            // Will uncomment once API integration start
            // handleError(error)
        } finally {
            setLoading(false)
        }
    }

    const _data = useMemo(() => data, [data])

    const { getHeaderGroups, getRowModel, getFooterGroups } = useReactTable({
        columns,
        data: _data,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualFiltering: true,
        onSortingChange: setSorting,
        enableColumnResizing: false,
        manualSorting: true,
        columnResizeMode: "onChange",
        isMultiSortEvent: () => true,
        state: {
            sorting,
        },
    })

    useEffect(() => {
        getData()
        if (!initialRender) {
            setInitialRender(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        filter,
        sorting,
        reloadData,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ...dependencies,
        memoizedExtraFilters,
    ])

    return (
        <>
            <div className="row">
                <div className="col-xl-12 px-0">
                    <div className="card card-xl-stretch mb-xl-8 pb-0">
                        <div className={`card-body py-3 ${isTableView ? "pt-0" : ""}`}>
                            {isTableView ? (
                                <>
                                    <div className="table-responsive">
                                        <ReactTable
                                            getFooterGroups={getFooterGroups}
                                            getHeaderGroups={getHeaderGroups}
                                            getRowModel={getRowModel}
                                            className={` ${tableClassName}`}
                                            loading={loading}
                                            rowCount={rowCount}
                                            filter={filter}
                                            setFilter={setFilter}
                                            isBackendDrivenColumns={isBackendDrivenColumns}
                                        />
                                    </div>
                                    <hr className="mt-0" />
                                    <TablePagination
                                        pagination={filter}
                                        setPagination={setFilter}
                                        totalCount={totalCount}
                                    />
                                </>
                            ) : (
                                <div className="row mx-2">
                                    {loading ? (
                                        getArray(12).map((item) => (
                                            <div
                                                className="col-md-6 col-lg-4 col-xl-3 mb-4"
                                                key={item}
                                            >
                                                <CardLoader
                                                    style={{
                                                        maxWidth: "100%",
                                                        width: "100%",
                                                    }}
                                                />
                                            </div>
                                        ))
                                    ) : data.length === 0 ? (
                                        <NoData />
                                    ) : (
                                        <>
                                            {data?.map((asset) => (
                                                <div className={columnClassName} key={asset.id}>
                                                    {renderGridView && renderGridView(asset)}
                                                </div>
                                            ))}
                                            <TablePagination
                                                pagination={filter}
                                                setPagination={setFilter}
                                                totalCount={totalCount}
                                            />
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReactTableWithPagination
