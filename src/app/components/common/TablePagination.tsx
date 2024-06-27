import { TablePaginationPropType } from "@/types/components/pagination"
import { config } from "@/utils/constants"
import React from "react"
import Pagination from "../pagination/Pagination"

/**
 * TablePagination Component
 *
 * A pagination component for tables that includes page size selection and page navigation.
 *
 * @param {TablePaginationPropType} props - The properties passed to the component
 * @param {object} props.pagination - The current pagination state
 * @param {Function} props.setPagination - Function to update the pagination state
 * @param {number} props.totalCount - The total number of items to paginate
 *
 * @returns {JSX.Element} The pagination component with page size selection and page navigation
 */
const TablePagination: React.FC<TablePaginationPropType> = (props) => {
    const { pagination, setPagination, totalCount } = props
    return (
        <div className="row">
            <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
                {totalCount >= config.PAGE_SIZE_OPTIONS[0] ? (
                    <div className="dataTables_length" id="movie-table_length">
                        <label>
                            <select
                                name="movie-table_length"
                                aria-controls="movie-table"
                                className="form-select form-select-sm form-select-solid"
                                onChange={(e) =>
                                    setPagination((prev: object) => ({
                                        ...prev,
                                        page_size: Number(e.target.value),
                                        page: config.PAGINATION.PAGE,
                                    }))
                                }
                            >
                                {config.PAGE_SIZE_OPTIONS.map((item) => (
                                    <option
                                        key={item}
                                        value={item}
                                        selected={item === pagination.page_size}
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
            <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
                <Pagination
                    onChange={(e, value) =>
                        setPagination((prev: object) => ({ ...prev, page: value }))
                    }
                    totalCount={totalCount}
                    onPageChange={(value) =>
                        setPagination((prev: object) => ({ ...prev, page: value }))
                    }
                    page={pagination.page}
                    page_size={pagination.page_size}
                />
            </div>
        </div>
    )
}

export default TablePagination
