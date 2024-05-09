import {
    AsyncPaginateCreatableType,
    OptionType,
    ReactSelectPropType,
} from "@/types/components/react-select"
import { config } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { MultiValue, SingleValue } from "react-select"
import { withAsyncPaginate } from "react-select-async-paginate"
import Creatable from "react-select/creatable"

const AsyncPaginate = withAsyncPaginate(Creatable) as AsyncPaginateCreatableType
const ReactSelect: React.FC<ReactSelectPropType> = (props) => {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseOptions = (results: any[]) => {
        return results.map((result) => ({
            label: getOptionLabel(result),
            value: getOptionValue(result),
        }))
    }
    const loadOptions = async (
        search_term: string,
        options: object,
        { page }: { page: number },
    ) => {
        try {
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
                    additional: {
                        page: search_term ? config.PAGINATION.PAGE : page + 1,
                    },
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
