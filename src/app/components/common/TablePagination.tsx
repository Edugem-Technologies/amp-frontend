import { TablePaginationPropType } from "@/types/components/pagination"
import React from "react"
import Pagination from "../pagination/Pagination"
import { CONFIG } from "@/utils/constants"

const TablePagination: React.FC<Omit<TablePaginationPropType, "colSpan">> = (props) => {
    const { pagination, setPagination, totalCount, paginationContainerClass = "" } = props
    return (
        <div className={`d-flex justify-content-between px-1 ${paginationContainerClass}`}>
            <div>
                {totalCount >= CONFIG.PAGE_SIZE_OPTIONS[15] ? (
                    <div className="dataTables_length" id="movie-table_length">
                        <label>
                            <select
                                name="movie-table_length"
                                aria-controls="movie-table"
                                className="form-select form-select-sm form-select-solid"
                                onChange={(e) =>
                                    setPagination((prev: object) => ({
                                        ...prev,
                                        limit: Number(e.target.value),
                                        page: CONFIG.PAGINATION.PAGE,
                                    }))
                                }
                            >
                                {Object.values(CONFIG.PAGE_SIZE_OPTIONS).map((item) => (
                                    <option
                                        key={item}
                                        value={item}
                                        selected={item === pagination.limit}
                                    >
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {!!totalCount && (
                <div>
                    <Pagination
                        onChange={(e, value) =>
                            setPagination((prev: object) => ({ ...prev, page: value }))
                        }
                        totalCount={totalCount}
                        onPageChange={(value) =>
                            setPagination((prev: object) => ({ ...prev, page: value }))
                        }
                        page={pagination.page}
                        size={pagination.limit}
                    />
                </div>
            )}
        </div>
    )
}

export default TablePagination
