import { ReactTableProps, RowId, Searchable } from "@/types/components/react-table"
import { CONFIG } from "@/utils/constants"
import { flexRender } from "@tanstack/react-table"
import dayjs from "dayjs"
import { debounce } from "lodash"
import CustomSkeleton from "../common/CustomSkeleton"
import NoData from "../common/NoData"
import FlatPickrInput from "../input/FlatPickrInput"

const ReactTable = <T extends RowId>({
    getHeaderGroups,
    getRowModel,
    className,
    expandedRowId,
    renderExpandedRow,
    loading,
    rowCount = CONFIG.DEFAULT_TABLE_SKELETON_ROW_COUNT,
    setFilter,
    filter,
    isBackendDrivenColumns,
}: ReactTableProps<T>) => {
    const totalColumns = getHeaderGroups()?.reduce(
        (acc, headerGroup) => acc + headerGroup.headers.length,
        0,
    )

    const setSearchFilter = (q: string | null, fieldName: string) => {
        if (setFilter) {
            if (q?.trim()?.length) {
                setFilter((prev) => ({
                    ...prev,
                    search: {
                        ...prev.search,
                        [fieldName]: q,
                    },
                    page: CONFIG.PAGINATION.PAGE,
                }))
            } else {
                const _filter = { ...filter }
                delete _filter?.search?.[fieldName]
                if (_filter?.search && !Object.keys(_filter?.search)?.length) {
                    delete _filter.search
                }
                setFilter(_filter)
            }
        }
    }

    const debouncedSearch = debounce((q: string | null, fieldName: string) => {
        setSearchFilter(q, fieldName)
    }, CONFIG.DEBOUNCE_TIMEOUT)

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
                        className="text-start  fw-bold fs-7 gs-0 react-table-header bg-dark"
                    >
                        {headerGroup.headers.map((header) => (
                            <>
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    style={{
                                        verticalAlign: "baseLine",
                                        width: `${header.getSize()}px`,
                                    }}
                                    className="position-relative text-white"
                                >
                                    <div className="d-flex justify-content-between mb-1">
                                        <div className={``}>
                                            {header.column.getCanSort() ? (
                                                <span
                                                    className={`icon-container cursor-pointer ${
                                                        header.column.getIsSorted()
                                                            ? "s_" + header.column.getIsSorted()
                                                            : ""
                                                    } `}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext(),
                                                    )}
                                                </span>
                                            ) : (
                                                <span>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext(),
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {isBackendDrivenColumns && (
                                        <div onClick={(e) => e.stopPropagation()}>
                                            {(header.column.columnDef.meta as Searchable)
                                                ?.searchable && (
                                                <>
                                                    <input
                                                        className="filter-input custom-border px-2"
                                                        placeholder={
                                                            (
                                                                header.column.columnDef
                                                                    .meta as Searchable
                                                            )?.placeholder ?? "Search"
                                                        }
                                                        onChange={(e) => {
                                                            debouncedSearch(
                                                                e.target.value.trim(),
                                                                header.column.id,
                                                            )
                                                        }}
                                                    />
                                                </>
                                            )}
                                            {(header.column.columnDef.meta as Searchable)?.date && (
                                                <FlatPickrInput
                                                    customContainerClassName="filter-flatpickr-input"
                                                    className="filter-input custom-border px-2"
                                                    label=""
                                                    options={{
                                                        formatDate: (dateObj) => {
                                                            return dateObj
                                                                ? dayjs(dateObj).format(
                                                                      "DD/MM/YYYY",
                                                                  )
                                                                : ""
                                                        },
                                                    }}
                                                    onChange={([date]) => {
                                                        if (date) {
                                                            setSearchFilter(
                                                                dayjs(date).format("YYYY-MM-DD"),
                                                                header.column.id,
                                                            )
                                                        } else {
                                                            setSearchFilter(null, header.column.id)
                                                        }
                                                    }}
                                                    value={filter?.["search"]?.[header.column.id]}
                                                />
                                            )}
                                            {/* {(header.column.columnDef.meta as Searchable)?.dropdown && (
                                            <BaseStaticSelect
                                                className="react-table-base-static-select-dropdown"
                                                styles={{
                                                    ...CONFIG.DROPDOWN_STYLE,
                                                    menu: (base: CSSObjectWithLabel) => ({
                                                        ...base,
                                                        fontWeight: "400",
                                                        minWidth: "140px",
                                                        maxWidth: "fit-content",
                                                    }),
                                                    singleValue: (base: CSSObjectWithLabel) => ({
                                                        ...base,
                                                        color: "#75787d",
                                                        fontWeight: "400",
                                                    }),
                                                    placeholder: (base: CSSObjectWithLabel) => ({
                                                        ...base,
                                                        color: "#75787d",
                                                        fontWeight: "400",
                                                    }),
                                                    control: (base: CSSObjectWithLabel) => ({
                                                        ...base,
                                                        minWidth: "140px",
                                                        maxWidth: "140px",
                                                        borderColor: "#a6a9ae",
                                                        border: "1px solid gray",
                                                        outline: "none",
                                                        boxShadow: "none",
                                                        color: "#75787d",
                                                        borderRadius: "6px",
                                                        minHeight: "35px !important",
                                                        maxHeight: "35px !important",
                                                        ":hover": {
                                                            border: "1px solid #a6a9ae",
                                                            outline: "none",
                                                        },
                                                        ":focus": {
                                                            border: "1px solid #a6a9ae",
                                                            outline: "none",
                                                        },
                                                    }),
                                                    container: (base: CSSObjectWithLabel) => ({
                                                        ...base,
                                                        paddingLeft: "0px",
                                                    }),
                                                }}
                                                placeholder="Select"
                                                options={
                                                    (header.column.columnDef.meta as Searchable)
                                                        ?.dropdownValues as Option[]
                                                }
                                                defaultValue={
                                                    [
                                                        "Error",
                                                        "Pending",
                                                        "Processed",
                                                        "Human Verification Required",
                                                    ].includes(statusValue)
                                                        ? createStatusOption(statusValue)
                                                        : ((
                                                              header.column.columnDef
                                                                  .meta as Searchable
                                                          )?.defaultValue as Option)
                                                }
                                                onSelected={(_option) => {
                                                    const option = _option as Option
                                                    if (option) {
                                                        if (setFilter) {
                                                            setFilter((prev) => ({
                                                                ...prev,
                                                                [header.column.id]:
                                                                    option.value as string,
                                                            }))
                                                        }
                                                    } else {
                                                        if (setFilter) {
                                                            setFilter((prev) => ({
                                                                ...prev,
                                                                [header.column.id]: "",
                                                            }))
                                                        }
                                                    }
                                                }}
                                            />
                                        )} */}
                                            {/* {(header.column.columnDef.meta as Searchable)
                                            ?.dynamicDropdown && (
                                            <BaseSelect
                                                showSlicedLabel={false}
                                                styles={{
                                                    ...CONFIG.DROPDOWN_STYLE,
                                                    menu: (base: CSSObjectWithLabel) => ({
                                                        ...base,
                                                        fontWeight: "400",
                                                        minWidth: "140px",
                                                        maxWidth: "fit-content",
                                                    }),
                                                    singleValue: (base: CSSObjectWithLabel) => ({
                                                        ...base,
                                                        color: "#75787d",
                                                        fontWeight: "400",
                                                    }),
                                                    placeholder: (base: CSSObjectWithLabel) => ({
                                                        ...base,
                                                        color: "#75787d",
                                                        fontWeight: "400",
                                                    }),
                                                    control: (base: CSSObjectWithLabel) => ({
                                                        ...base,
                                                        minWidth: "140px",
                                                        maxWidth: "140px",
                                                        borderColor: "#a6a9ae",
                                                        border: "1px solid gray",
                                                        outline: "none",
                                                        boxShadow: "none",
                                                        color: "#75787d",
                                                        borderRadius: "6px",
                                                        minHeight: "35px !important",
                                                        maxHeight: "35px !important",
                                                        ":hover": {
                                                            border: "1px solid #a6a9ae",
                                                            outline: "none",
                                                        },
                                                        ":focus": {
                                                            border: "1px solid #a6a9ae",
                                                            outline: "none",
                                                        },
                                                    }),
                                                    container: (base: CSSObjectWithLabel) => ({
                                                        ...base,
                                                        paddingLeft: "0px",
                                                    }),
                                                }}
                                                className="w-100"
                                                placeholder="Select"
                                                endpoint={
                                                    (header.column.columnDef.meta as Searchable)
                                                        ?.dynamicDropdown as URL
                                                }
                                                value={
                                                    filter?.[header.column.id]
                                                        ? {
                                                              label: filter?.[header.column.id],
                                                              value: filter[header.column.id],
                                                              data: {
                                                                  label: filter?.[header.column.id],
                                                                  value: filter?.[header.column.id],
                                                              },
                                                          }
                                                        : null
                                                }
                                                getOptionLabel={(option) => {
                                                    return option[
                                                        (header.column.columnDef.meta as Searchable)
                                                            ?.dynamicDropdownValue as string
                                                    ]
                                                }}
                                                getOptionValue={(option) =>
                                                    option[
                                                        (header.column.columnDef.meta as Searchable)
                                                            ?.dynamicDropdownValue as string
                                                    ]
                                                }
                                                getOptionData={(option) =>
                                                    option[
                                                        (header.column.columnDef.meta as Searchable)
                                                            ?.dynamicDropdownValue as string
                                                    ]
                                                }
                                                onSelected={(_option) => {
                                                    const option = _option
                                                    if (option) {
                                                        if (setFilter) {
                                                            setFilter((prev) => ({
                                                                ...prev,
                                                                [header.column.id]: option,
                                                            }))
                                                        }
                                                    } else {
                                                        if (setFilter) {
                                                            setFilter((prev) => ({
                                                                ...prev,
                                                                [header.column.id]: "",
                                                            }))
                                                        }
                                                    }
                                                }}
                                                filterKey={
                                                    (header.column.columnDef.meta as Searchable)
                                                        ?.searchableDropdownFilterKey as string
                                                }
                                                params={{
                                                    sort_on: (
                                                        header.column.columnDef.meta as Searchable
                                                    )?.searchableDropdownFilterKey as string,
                                                    sort: "asc",
                                                }}
                                            />
                                        )} */}
                                        </div>
                                    )}
                                    {header.column.getCanResize() && (
                                        <div
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                            className={`resizer ${
                                                header.column.getIsResizing() ? "isResizing" : ""
                                            }`}
                                        />
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
                        <td className="px-3" colSpan={totalColumns}>
                            <CustomSkeleton rowCount={rowCount} stopVh />
                        </td>
                    </tr>
                ) : getRowModel().rows.length === 0 && !loading ? (
                    <tr>
                        <td className="border-0" colSpan={totalColumns}>
                            <NoData />
                        </td>
                    </tr>
                ) : (
                    getRowModel().rows.map((row) => (
                        <>
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        className=""
                                        key={cell.id}
                                        style={{
                                            width: cell.column.getSize(),
                                        }}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                            {expandedRowId === row.original.id &&
                                renderExpandedRow &&
                                renderExpandedRow(row.original.id)}
                        </>
                    ))
                )}
            </tbody>
            {/* <tfoot>
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
            </tfoot> */}
        </table>
    )
}

export default ReactTable
