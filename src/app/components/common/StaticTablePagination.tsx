import { TablePaginationPropType } from "@/types/components/pagination"
import React from "react"
import Pagination from "../pagination/Pagination"
import { CONFIG } from "@/utils/constants"

const StaticTablePagination: React.FC<Omit<TablePaginationPropType, "colSpan">> = (props) => {
    const { pagination, setPagination, totalCount, paginationContainerClass } = props
    return (
        <div className={`d-flex justify-content-between ${paginationContainerClass}`}>
            <div>
                {totalCount >= CONFIG.PAGE_SIZE_OPTIONS[0] ? (
                    <div className="dataTables_length" id="movie-table_length">
                        <label>
                            <select
                                name="movie-table_length"
                                aria-controls="movie-table"
                                className="form-select form-select-sm form-select-solid"
                                onChange={(e) =>
                                    setPagination((prev: object) => ({
                                        ...prev,
                                        pageSize: Number(e.target.value),
                                        pageIndex: CONFIG.PAGINATION.PAGE - 1,
                                    }))
                                }
                            >
                                {Object.values(CONFIG.PAGE_SIZE_OPTIONS).map((item) => (
                                    <option
                                        key={item}
                                        value={item}
                                        selected={item === pagination.pageSize}
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
                            setPagination((prev: object) => ({ ...prev, pageIndex: value - 1 }))
                        }
                        totalCount={totalCount}
                        onPageChange={(value) =>
                            setPagination((prev: object) => ({ ...prev, pageIndex: value - 1 }))
                        }
                        page={pagination.pageIndex + 1}
                        size={pagination.pageSize}
                    />
                </div>
            )}
        </div>
    )
}

export default StaticTablePagination
