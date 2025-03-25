import { ReactTableProps, RowId } from "@/types/components/react-table"
import { flexRender } from "@tanstack/react-table"
import CustomSkeleton from "./CustomSkeleton"
import NoData from "./NoData"

/**
 * ReactTable Component
 *
 * A reusable table component built with TanStack React Table. This component handles
 * rendering the table with headers, rows, and footers, as well as showing a loading
 * state or a "No Data" message when appropriate.
 *
 * @template T - The type of the row data which extends RowId
 *
 * @param {ReactTableProps<T>} props - The properties passed to the component
 * @param {Function} props.getFooterGroups - Function to get footer groups for the table
 * @param {Function} props.getHeaderGroups - Function to get header groups for the table
 * @param {Function} props.getRowModel - Function to get row model for the table
 * @param {string} [props.className] - Additional class name(s) for the table
 * @param {boolean} [props.loading] - Flag indicating whether the table is in loading state
 * @param {number} [props.rowCount] - Number of skeleton rows to show when loading
 *
 * @returns {JSX.Element} A table element with the specified rows and columns
 */
const ReactTable = <T extends RowId>({
    table: { getHeaderGroups, getRowModel, getFooterGroups },
    className,
    loading,
    rowCount,
}: ReactTableProps<T>) => {
    const totalColumns = getHeaderGroups().reduce(
        (acc, headerGroup) => acc + headerGroup.headers.length,
        0,
    )
    return (
        <table
            className={`table dataTable align-middle fs-6 gy-5 ${className ? className : ""}`}
            id="games-table"
        >
            <thead>
                {getHeaderGroups().map((headerGroup) => (
                    <tr
                        key={headerGroup.id}
                        className="text-start text-primary fw-bold fs-7 text-uppercase gs-0"
                    >
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                colSpan={header.colSpan}
                                className={`position-relative overflow-hidden`}
                                style={{
                                    width: `${header.getSize()}px`,
                                }}
                            >
                                <div
                                    className={`min-w-100px d-flex align-items-center gap-3 ${
                                        header.column.getCanSort() ? "cursor-pointer sorting" : ""
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        const handler = header.column.getToggleSortingHandler()
                                        if (handler) {
                                            handler(e)
                                        }
                                    }}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                    {header.column.getCanSort() && (
                                        <div className="d-inline-flex flex-column align-items-center">
                                            <img
                                                src="/images/caret-down.svg"
                                                alt=""
                                                className={
                                                    header.column.getIsSorted() === "asc"
                                                        ? "active"
                                                        : ""
                                                }
                                            />
                                            <img
                                                src="/images/caret-down.svg"
                                                alt=""
                                                className={
                                                    header.column.getIsSorted() === "desc"
                                                        ? "active"
                                                        : ""
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                                {header.column.getCanResize() && (
                                    <div
                                        onMouseDown={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            const handler = header.getResizeHandler()
                                            if (handler) {
                                                handler(e)
                                            }
                                        }}
                                        onTouchStart={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            const handler = header.getResizeHandler()
                                            if (handler) {
                                                handler(e)
                                            }
                                        }}
                                        className={`resizer ${
                                            header.column.getIsResizing() ? "isResizing" : ""
                                        }`}
                                    />
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody className="fw-semibold text-dark">
                {loading ? (
                    <tr>
                        <td colSpan={totalColumns}>
                            <CustomSkeleton rowCount={rowCount} />
                        </td>
                    </tr>
                ) : getRowModel().rows.length === 0 ? (
                    <tr>
                        <td colSpan={totalColumns}>
                            <NoData />
                        </td>
                    </tr>
                ) : (
                    getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    style={{
                                        width: `${cell.column.getSize()}px`,
                                    }}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
            {getFooterGroups()?.length > 1 ? (
                <tfoot>
                    {getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.footer,
                                              header.getContext(),
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            ) : null}
        </table>
    )
}

export default ReactTable
