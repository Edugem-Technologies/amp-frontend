import ReactSelect, { MultiValue } from "react-select"
import { useState } from "react"
import { OptionType, RaodmapsFiltersData } from "@/fixtures/CheckboxFilterData"
import { components, OptionProps } from "react-select"

type SelectedFilters = {
    [key: string]: MultiValue<OptionType>
}

const CheckboxOption = (props: OptionProps<OptionType, true>) => {
    return (
        <components.Option {...props}>
            <div className="checkbox-option">
                <input type="checkbox" checked={props.isSelected} readOnly />
                <span>{props.label}</span>
            </div>
        </components.Option>
    )
}

const FilterDropdown = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [, setSelected] = useState<SelectedFilters>({})

    const handleChange = (key: string, value: MultiValue<OptionType>) => {
        setSelected((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    return (
        <div className="filters-wrapper">
            {RaodmapsFiltersData.map((group) => (
                <div className="filter-column" key={group.title}>
                    <h4>{group.title}</h4>

                    <ReactSelect<OptionType, true>
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        options={group.options}
                        components={{ Option: CheckboxOption }}
                        classNamePrefix="rs"
                        onChange={(val) => handleChange(group.title, val)}
                        menuIsOpen
                    />
                </div>
            ))}

            <div className="filter-actions">
                <button onClick={() => setSelected({})}>Reset</button>
            </div>
        </div>
    )
}

export default FilterDropdown
