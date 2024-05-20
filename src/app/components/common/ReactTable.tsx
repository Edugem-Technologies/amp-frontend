import { ReactTableProps, RowId } from "@/types/components/react-table"
import { flexRender } from "@tanstack/react-table"

const ReactTable = <T extends RowId>({
    getFooterGroups,
    getHeaderGroups,
    getRowModel,
    className,
}: ReactTableProps<T>) => {
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
                {getRowModel().rows.map((row) => (
                    <>
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    </>
                ))}
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
