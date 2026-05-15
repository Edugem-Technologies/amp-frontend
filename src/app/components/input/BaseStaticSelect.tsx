import { BaseStaticSelectPropType, Option } from "@/types/components/ReactSelect"
import { CONFIG } from "@/utils/Constants"
import ReactSelect, { MultiValue, OptionProps, SingleValue, components } from "react-select"

const CheckboxOption = (props: OptionProps<Option, boolean>) => {
    return (
        <components.Option {...props}>
            <input
                type="checkbox"
                className="form-check-input me-3"
                checked={props.isSelected}
                onChange={() => null}
            />
            <label>{props.label}</label>
        </components.Option>
    )
}

const RadioOption = (props: OptionProps<Option, boolean>) => {
    return (
        <components.Option {...props}>
            <input
                type="radio"
                className="form-check-input"
                checked={props.isSelected}
                onChange={() => null}
                name="react-select-radio"
            />
            <label className="ms-2">{props.label}</label>
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
            // onSelected(option)
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
                classNames={{
                    control: () => "form-input-dropdown custom-border",
                    menu: () => "animated-select-menu",
                    menuList: () => "animated-select-menu-list",
                }}
                controlShouldRenderValue={true} // show selected option in the input
                options={options}
                placeholder={"Select an option"}
                components={{
                    ...(props.isCheckBoxDropdowns ? { Option: CheckboxOption } : {}),
                    ...(props.isRadioDropdown ? { Option: RadioOption } : {}),
                    MultiValue: () => null,
                }}
                isClearable={true}
                hideSelectedOptions={false}
                // closeMenuOnSelect={true}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={handleChange as any}
                value={selectedOptionValue}
                {...modifiedProps}
            />
        </>
    )
}

export default BaseStaticSelect
