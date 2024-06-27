import {
    AsyncPaginateCreatableType,
    OptionType,
    ReactSelectPropType,
} from "@/types/components/react-select"
import { config } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { useState } from "react"
import { MultiValue, SingleValue } from "react-select"
import { withAsyncPaginate } from "react-select-async-paginate"
import Creatable from "react-select/creatable"

/**
 * AsyncPaginate component with Creatable support.
 * This is the enhanced version of the Creatable component from react-select,
 * integrated with async pagination for loading options dynamically.
 */
const AsyncPaginate = withAsyncPaginate(Creatable) as AsyncPaginateCreatableType
/**
 * ReactSelect component
 *
 * Enhanced Select component using react-select with async pagination and creatable options support.
 *
 * @param {ReactSelectPropType} props - Props for the ReactSelect component.
 * @param {(option: SingleValue<OptionType> | MultiValue<OptionType>) => void} props.onSelected - Function to handle selection change.
 * @param {object} props.params - Additional parameters for the loadOptionsFetch function.
 * @param {boolean} props.isMulti - Indicates if multiple options can be selected.
 * @param {boolean} props.creatable - Indicates if new options can be created.
 * @param {(result: any) => string} props.getOptionLabel - Function to extract the label from an option result.
 * @param {(result: any) => string} props.getOptionValue - Function to extract the value from an option result.
 * @param {(option: OptionType | OptionType[]) => void} props.onCreate - Function to handle creation of a new option.
 * @param {(params: { search_term: string, _limit: number, _page: number }) => Promise<{ results: any[], count: number }>} props.loadOptionsFetch - Function to fetch options asynchronously.
 * @returns {JSX.Element} Rendered ReactSelect component.
 */
const ReactSelect: React.FC<ReactSelectPropType> = (props) => {
    const [previousSearchedTerm, setPreviousSeachedTerm] = useState("")
    const {
        onSelected,
        params,
        isMulti,
        creatable,
        getOptionLabel,
        getOptionValue,
        onCreate,
        loadOptionsFetch,
    } = props

    /**
     * Parse options from API response into format expected by react-select.
     *
     * @param {any[]} results - Results from the API containing options.
     * @returns {OptionType[]} Parsed options array with label and value.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseOptions = (results: any[]) => {
        return results.map((result) => ({
            label: getOptionLabel(result),
            value: getOptionValue(result),
        }))
    }
    /**
     * Load options asynchronously based on search term and pagination parameters.
     *
     * @param {string} search_term - Search term entered by the user.
     * @param {object} options - Options object containing additional parameters.
     * @param {number} options.page - Current page number for pagination.
     * @returns {Promise<{ options: OptionType[], hasMore: boolean, page: number }>} Promise resolving to loaded options and pagination status.
     */
    const loadOptions = async (
        search_term: string,
        options: object,
        { page }: { page: number },
    ) => {
        try {
            if (previousSearchedTerm !== search_term) {
                setPreviousSeachedTerm(search_term)
            }

            const nextPage = page || config.PAGINATION.PAGE
            // change params name as per the usage
            const response = await loadOptionsFetch({
                search_term,
                _limit: config.PAGINATION.SIZE,
                _page: page || config.PAGINATION.PAGE,
                ...params,
            })
            if (response.results) {
                const payload = {
                    hasMore: Math.ceil(response.count / config.PAGINATION.SIZE) > page,
                    options: parseOptions(response.results),
                    page:
                        search_term && search_term !== previousSearchedTerm
                            ? config.PAGINATION.PAGE
                            : nextPage + 1,
                }
                return payload
            }
        } catch (error) {
            handleError(error)
            return {
                options: [],
                hasMore: false,
            }
        }
    }
    /**
     * Handle change in selected option(s).
     *
     * @param {SingleValue<OptionType> | MultiValue<OptionType>} option - Selected option or options.
     */
    const handleChange = (option: SingleValue<OptionType> | MultiValue<OptionType>) => {
        if (isMulti) {
            const _options = option as OptionType[]
            if (_options.length) {
                onSelected(_options)
            } else {
                onSelected([])
            }
        } else {
            const _option = option as OptionType
            if (_option.value) {
                onSelected(_option)
            } else {
                onSelected(null)
            }
        }
    }
    // this is required because the {...props} in the end will override the options array
    const modifiedProps = { ...props } as Partial<ReactSelectPropType>
    delete modifiedProps.getOptionLabel
    delete modifiedProps.getOptionValue
    return (
        <>
            <AsyncPaginate
                className="text-primary fs-base lh-1 fw-bold py-0 ps-1 w-auto"
                styles={{
                    menu: (base) => ({ ...base, zIndex: "9" }),
                    valueContainer: (base) => ({
                        ...base,
                        maxHeight: "37px",
                        overflow: "auto",
                    }),
                }}
                placeholder={"Select an option"}
                isSearchable={true}
                classNames={{
                    control: () => "form-input-dropdown",
                }}
                // this input.trim condition prevents the select to show empty create option in dropdown e.g Create ""
                isValidNewOption={(input) => (creatable && input.trim().length ? true : false)}
                isClearable={true}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                hideSelectedOptions={false}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                loadOptions={loadOptions as any}
                debounceTimeout={config.DEBOUNCE_TIMEOUT}
                // this is reqiuired, otherwise the options will not load
                additional={{ page: config.PAGINATION.PAGE }}
                closeMenuOnSelect={!isMulti}
                onChange={handleChange}
                onCreateOption={onCreate}
                {...modifiedProps}
            />
        </>
    )
}

export default ReactSelect
