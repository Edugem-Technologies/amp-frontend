import { BaseStaticSelectPropType, Option } from "@/types/components/ReactSelect"
import { CONFIG } from "@/utils/Constants"
import ReactSelect, { MultiValue, OptionProps, SingleValue, components } from "react-select"

const CheckboxOption = (props: OptionProps<Option, boolean>) => {
    return (
        <components.Option {...props}>
            <input type="checkbox" checked={props.isSelected} onChange={() => null} />
            <label>{props.label}</label>
        </components.Option>
    )
}

const BaseStaticSelect: React.FC<BaseStaticSelectPropType> = (props) => {
    const { onSelected, isMulti, options, selectedOptionValue, className } = props
    const handleChange = (option: SingleValue<Option> | MultiValue<Option>) => {
        if (isMulti) {
            const _options = option as Option[]
            if (_options.length) {
                const selectedOptionsData = _options.filter((_option) => _option.data)
                onSelected(selectedOptionsData)
            } else {
                onSelected([])
            }
        } else {
            const _option = option as Option
            if (_option?.data) {
                onSelected(_option)
            } else {
                onSelected(null)
            }
        }
    }
    // this is required because the {...props} in the end will override the options array
    const modifiedProps = { ...props } as Partial<BaseStaticSelectPropType>
    delete modifiedProps.className
    return (
        <>
            <ReactSelect
                className={`text-primary fs-base dropdown-line-height py-0 w-auto ${className}`}
                styles={{
                    ...CONFIG.DROPDOWN_STYLE,
                }}
                options={options}
                placeholder={"Select an option"}
                isSearchable={true}
                classNames={{
                    control: () => "form-input-dropdown custom-border",
                    // multiValue: () => "multivalue-dropdown-pills",
                }}
                controlShouldRenderValue={false}
                components={{
                    Option: CheckboxOption,
                    MultiValue: () => null,
                }}
                isClearable={true}
                hideSelectedOptions={false}
                closeMenuOnSelect={!isMulti}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={handleChange as any}
                value={selectedOptionValue}
                {...modifiedProps}
            />
        </>
    )
}

export default BaseStaticSelect
