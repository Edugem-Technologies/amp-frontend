import { PaginationPropType } from "@/types/components/Pagination"
import classnames from "classnames"
import { DOTS, usePagination } from "../../hooks/usePagination"

const Pagination: React.FC<PaginationPropType> = (props) => {
    const { onChange, totalCount, siblingCount = 1, page, size } = props

    const paginationRange = usePagination({
        page,
        total: totalCount,
        siblingCount,
        size,
    })

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, page: number) => {
        event.preventDefault()
        onChange(event, page)
    }
    if (paginationRange) {
        if (page === 0 || paginationRange.length < 2) {
            return null
        }
    }

    const onPrevious = (event: React.MouseEvent<HTMLLIElement>) => {
        event.preventDefault()
        if (page > 1) onChange(event, page - 1)
    }
    let lastPage: number = page
    if (paginationRange) {
        lastPage = paginationRange[paginationRange.length - 1] as number
    }
    const onNext = (event: React.MouseEvent<HTMLLIElement>) => {
        event.preventDefault()
        if (page !== lastPage) onChange(event, page + 1)
    }

    return (
        <>
            <ul className="pagination justify-content-end mb-0">
                <li
                    onClick={(event) => onPrevious(event)}
                    className={classnames("page-item previous", {
                        disabled: page === 1,
                    })}
                >
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">
                            <i className="previous"></i>
                        </span>
                    </a>
                </li>
                {paginationRange &&
                    paginationRange.map((pageNumber, index) => {
                        if (pageNumber === DOTS) {
                            return (
                                <li key={pageNumber + index} className="pagination-item dots">
                                    &#8230;
                                </li>
                            )
                        }
                        return (
                            <>
                                <li
                                    key={pageNumber + index.toString()}
                                    className={`page-item paginate_button ${
                                        pageNumber === page ? "active" : ""
                                    } `}
                                >
                                    <a
                                        className={`page-link`}
                                        href="#"
                                        onClick={(event) =>
                                            handleClick(event, pageNumber as number)
                                        }
                                    >
                                        {pageNumber}
                                    </a>
                                </li>
                            </>
                        )
                    })}
                <li
                    className={classnames("page-item paginate_button next", {
                        disabled: page === lastPage,
                    })}
                    onClick={(event) => onNext(event)}
                >
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">
                            <i className="next"></i>
                        </span>
                    </a>
                </li>
            </ul>
        </>
    )
}

export default Pagination
