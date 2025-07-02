import { FetchHelper } from "@/services/FetchHelper"
import { Any, AnyObject } from "@/types/common/Helper"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { BASE_API_ENDPOINT, CONFIG } from "./Constants"
import { handleError } from "./HandleError"
import { transformOptions } from "./Helpers"

/**
 * Renders a cell value for a table column.
 * If the filter indicates the value is a URL, renders a clickable link.
 * Otherwise, renders the value as plain text or "N/A" if not available.
 *
 * @param {Object} params
 * @param {Any} params.value - The value to render in the cell.
 * @param {AnyObject} params.filter - The filter metadata for the column.
 * @returns {JSX.Element} The rendered cell content.
 */
const renderCellValue = ({ value, filter }: { value: Any; filter: AnyObject }) => {
    if (filter?.is_url) {
        return value?.trim() ? (
            <Link title={value} className="text-dark" href={value} target="_blank">
                {value}
            </Link>
        ) : (
            <span title="Not Available">N/A</span>
        )
    } else {
        return value ? <span title={value}>{value}</span> : <span title="Not Available">N/A</span>
    }
}

/**
 * Generates metadata for a table column based on the provided filter object.
 *
 * @param {AnyObject} filter - The filter object describing the column's properties.
 * @returns {Object} An object containing metadata for the column, with the following keys:
 *   - searchable: {boolean} True if the column supports string search (filter_type === "string").
 *   - dropdown: {boolean} True if the column uses a dropdown filter (filter_type === "dropdown").
 *   - date: {boolean} True if the column uses a date filter (filter_type === "date").
 *   - dropdownValues: {Array|undefined} Array of dropdown options (transformed), only if filter_type is "dropdown".
 *   - defaultValue: {Object|null} The default dropdown value object if filter_type is "dropdown" and default_value is provided, otherwise null.
 *     - label: {string} The label for the default value.
 *     - value: {string} The value for the default value.
 *     - data: {Object} An object containing label and value.
 *   - dynamicDropdown: {URL|string} The API endpoint URL for a searchable dropdown, if filter_type is "searchable_dropdown", otherwise an empty string.
 *   - dynamicDropdownValue: {string} The field name in the API response to use for the dropdown value, if filter_type is "searchable_dropdown", otherwise an empty string.
 *   - searchableDropdownFilterKey: {string} The filter key to use for searching in the dropdown, if filter_type is "searchable_dropdown", otherwise an empty string.
 *   - placeholder: {string} The placeholder text for the filter input, defaults to "Search" if not provided.
 */
const createColumnMeta = (filter: AnyObject) => ({
    /**
     * Indicates if the column is searchable (string filter).
     */
    searchable: filter?.filter_type === "string",

    /**
     * Indicates if the column uses a dropdown filter.
     */
    dropdown: filter?.filter_type === "dropdown",

    /**
     * Indicates if the column uses a date filter.
     */
    date: filter?.filter_type === "date",

    /**
     * Array of dropdown options, transformed for use in the UI.
     * Only present if filter_type is "dropdown".
     */
    dropdownValues:
        filter?.filter_type === "dropdown" ? transformOptions(filter.options) : undefined,

    /**
     * The default value for the dropdown, if applicable.
     * Structure: { label, value, data: { label, value } }
     */
    defaultValue:
        filter?.filter_type === "dropdown" && filter?.default_value
            ? {
                  label: filter.default_value,
                  value: filter.default_value,
                  data: {
                      label: filter.default_value,
                      value: filter.default_value,
                  },
              }
            : null,

    /**
     * The API endpoint URL for a searchable dropdown, if applicable.
     */
    dynamicDropdown:
        filter?.filter_type === "searchable_dropdown"
            ? new URL(`${BASE_API_ENDPOINT}${filter?.api_endpoint}`)
            : "",

    /**
     * The field name in the API response to use for the dropdown value, if applicable.
     */
    dynamicDropdownValue: filter?.filter_type === "searchable_dropdown" ? filter?.result_field : "",

    /**
     * The filter key to use for searching in the dropdown, if applicable.
     */
    searchableDropdownFilterKey:
        filter?.filter_type === "searchable_dropdown" ? filter?.filter_key : "",

    /**
     * The placeholder text for the filter input.
     */
    placeholder: filter?.placeholder ?? "Search",
})

/**
 * Generates dynamic column definitions for a table based on provided column metadata.
 *
 * @param {AnyObject[]} columnData - Array of column metadata objects.
 * @returns {ColumnDef<AnyObject>[]} Array of column definitions for the table.
 */
const generateDynamicColumns = (columnData: AnyObject[]): ColumnDef<AnyObject>[] => {
    return columnData?.map((filter: AnyObject) => ({
        header: filter?.label,
        accessorKey: filter?.field,
        cell: ({ row }: { row: { original: AnyObject } }) =>
            renderCellValue({
                value: row.original[filter?.field],
                filter,
            }),
        meta: createColumnMeta(filter),
        size: 220,
        enableSorting: filter?.sortable ? filter?.sortable : false,
    }))
}

/**
 * Fetches and processes column metadata for a given module type.
 * Returns an array of column definitions suitable for use with TanStack Table.
 *
 * @async
 * @function fetchColumnData
 * @param {Object} params
 * @param {string} params.moduleType - The module type for which to fetch column metadata.
 * @returns {Promise<ColumnDef<AnyObject>[]>} Promise resolving to an array of column definitions.
 */
export const fetchColumnData = async ({
    moduleType,
}: {
    moduleType: string
}): Promise<ColumnDef<AnyObject>[]> => {
    console.log("here", moduleType)
    try {
        const response = await FetchHelper.get(CONFIG.API_ENDPOINTS.GET_COLUMN_METADATA, {
            module_type: moduleType,
        })
        if (response?.data) {
            const columnData = response.data
            return generateDynamicColumns(columnData)
        }
        return []
    } catch (error) {
        handleError(error)
        return []
    }
}
