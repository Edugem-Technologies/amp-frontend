import { getCoreRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { debounce } from "lodash"
import { useEffect, useMemo, useState } from "react"
import ReactTable from "./ReactTable"
import TablePagination from "./TablePagination"
import { ReactTableWithPaginationPropType } from "@/types/components/react-table"
import { config } from "@/utils/constants"
import { FetchHelper } from "@/services/fetch-helper"
import { handleError } from "@/utils/handle-error"

const ReactTableWithPagination: React.FC<ReactTableWithPaginationPropType> = (props) => {
    const {
        columns,
        endpoint,
        tableHeaderTitle,
        onAddButtonClick,
        addButtonLabel,
        addButtonClassName,
        getFetchResponse,
        showSearchBar = false,
        assetDeleted = false,
        dependencies = [],
        extraFilters = {},
        tableClassName,
        rowCount,
        sortingId,
        showTableHeader = true,
        dummyData,
    } = props
    const [loading, setLoading] = useState(false)
    const [reloadData, setReloadData] = useState(false)
    // this initial render state prevents the duplicate calling of API for the first time
    const [initialRender, setInitialRender] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [sorting, setSorting] = useState<SortingState>(
        sortingId
            ? [{ id: sortingId, desc: false }]
            : sortingId === null
              ? []
              : [{ id: "name", desc: false }],
    )
    const [filter, setFilter] = useState({
        search_term: "",
        page: config.PAGINATION.PAGE,
        size: config.PAGINATION.SIZE,
        // pagination_type: CONFIG.PAGINATION.TYPE,
        ...extraFilters,
    })

    const getData = async () => {
        try {
            setLoading(true)
            let _filter: object = {
                ...filter,
            }
            if (sorting?.length) {
                _filter = {
                    ...filter,
                    sort: sorting[0].desc ? "desc" : "asc",
                    sort_on: sorting[0].id,
                }
            }
            const response = await FetchHelper.get(endpoint, { ..._filter })

            if (response?.result) {
                setData(response.result)
                setTotalCount(response.pagination_metadata.total_items)
                // this method is exposed to parent component to pass response to parent
                // that will help to set total count for card component
                if (getFetchResponse) {
                    getFetchResponse(response)
                }
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    const _data = useMemo(() => data, [data])

    const { getHeaderGroups, getRowModel, getFooterGroups } = useReactTable({
        columns,
        data: dummyData ? dummyData : _data,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualFiltering: true,
        onSortingChange: setSorting,
        manualSorting: true,
        state: {
            sorting,
        },
    })
    const debouncedSearch = debounce((search_term: string) => {
        setFilter((prev) => ({
            ...prev,
            search_term,
            page: config.PAGINATION.PAGE,
        }))
    }, config.DEBOUNCE_TIMEOUT)

    useEffect(() => {
        getData()
        if (!initialRender) {
            setInitialRender(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, sorting, reloadData, ...dependencies])
    useEffect(() => {
        if (data?.length <= 1 && filter.page > 1) {
            setFilter((prev) => ({ ...prev, page: prev.page - 1 }))
        } else if (initialRender) {
            setReloadData((prev) => !prev)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assetDeleted])
    return (
        <>
            <div className="row g-5 g-xl-8">
                <div className="col-xl-12">
                    <div className="card card-xl-stretch mb-xl-8">
                        {showTableHeader && (
                            <div className="card-header border-0 pt-5">
                                <h3 className="card-title text-primary align-items-start flex-column">
                                    <span className="card-label fw-bold text-primary fs-3 mb-1">
                                        {tableHeaderTitle}
                                    </span>
                                    <span className="text-muted fw-semibold fs-7">
                                        {totalCount} total
                                    </span>
                                </h3>

                                <div className="card-toolbar">
                                    <div className="d-flex flex-stack flex-wrap gap-4">
                                        <div className="position-relative my-1">
                                            {showSearchBar && (
                                                <>
                                                    <span className="svg-icon text-primary svg-icon-2 position-absolute top-50 translate-middle-y ms-4">
                                                        <svg
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <rect
                                                                opacity="0.5"
                                                                x="17.0365"
                                                                y="15.1223"
                                                                width="8.15546"
                                                                height="2"
                                                                rx="1"
                                                                transform="rotate(45 17.0365 15.1223)"
                                                                fill="currentColor"
                                                            />
                                                            <path
                                                                d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        data-kt-filter="search"
                                                        className="form-control w-150px fs-7 ps-12"
                                                        placeholder="Search"
                                                        onChange={(e) => {
                                                            if (
                                                                e.target.value.trim() ||
                                                                filter.search_term
                                                            ) {
                                                                debouncedSearch(
                                                                    e.target.value.trim(),
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </div>
                                        {onAddButtonClick && (
                                            <a
                                                role="button"
                                                href="#"
                                                className={`btn btn-primary ${addButtonClassName}`}
                                                onClick={onAddButtonClick}
                                            >
                                                {addButtonLabel}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="card-body py-3">
                            <div className="table-responsive">
                                <ReactTable
                                    getFooterGroups={getFooterGroups}
                                    getHeaderGroups={getHeaderGroups}
                                    getRowModel={getRowModel}
                                    className={`episode-react-table ${tableClassName}`}
                                    loading={loading}
                                    rowCount={rowCount}
                                />
                            </div>
                            <TablePagination
                                pagination={filter}
                                setPagination={setFilter}
                                totalCount={totalCount}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReactTableWithPagination
