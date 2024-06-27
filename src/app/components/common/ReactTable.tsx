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
    getFooterGroups,
    getHeaderGroups,
    getRowModel,
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
            className={`table dataTable align-middle table-row-dashed fs-6 gy-5 ${
                className ? className : ""
            }`}
            id="games-table"
        >
            <thead>
                {getHeaderGroups().map((headerGroup) => (
                    <tr
                        key={headerGroup.id}
                        className="text-start text-primary fw-bold fs-7 text-uppercase gs-0"
                    >
                        {headerGroup.headers.map((header) => (
                            <>
                                <th
                                    key={header.id}
                                    className={`min-w-100px ${
                                        header.column.getCanSort() ? "cursor-pointer sorting" : ""
                                    } ${
                                        header.column.getIsSorted()
                                            ? "sorting_" + header.column.getIsSorted()
                                            : ""
                                    } `}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </th>
                            </>
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
                        <>
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        </>
                    ))
                )}
            </tbody>
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
        </table>
    )
}

export default ReactTable
