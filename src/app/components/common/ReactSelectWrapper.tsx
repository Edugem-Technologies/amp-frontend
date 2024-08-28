import React from "react"
import { Controller, FieldValues } from "react-hook-form"
import CustomReactSelect from "./CustomReactSelect"
import ShowFormError from "./ShowFormError"
import { ReactSelectWrapperProps } from "@/types/components/react-select"

/**
 * Wrapper component for a custom React Select input integrated with `react-hook-form`.
 *
 * This component wraps around a custom `CustomReactSelect` component and integrates it with `react-hook-form` for managing form state. It also displays validation errors if present.
 *
 * @template FormValues - The type of form values being managed by `react-hook-form`.
 *
 * @component
 * @example
 * ```jsx
 * <ReactSelectWrapper
 *   name="city"
 *   control={control}
 *   optionsData={CITY_OPTIONS}
 *   placeholder="Select a city"
 *   label="City"
 *   error={errors.city}
 *   selectProps={{ isClearable: true }}
 * />
 * ```
 *
 * @param {ReactSelectWrapperProps<FormValues>} props - Properties for the ReactSelectWrapper component.
 * @param {Path<FormValues>} props.name - The name of the form control, corresponding to a path in the form values.
 * @param {Control<FormValues>} props.control - The control object from `react-hook-form`.
 * @param {any[]} props.optionsData - Array of options to populate the select input.
 * @param {string} [props.placeholder="Select an option"] - Optional placeholder text for the select input.
 * @param {string} [props.label] - Optional label for the select input.
 * @param {FieldError | Merge<FieldError, FieldErrorsImpl<FormValues>> | undefined} [props.error] - Optional error object for form validation.
 * @param {Omit<CustomReactSelectType, "onDropdownChange" | "selectedOptionValue" | "optionsData" | "placeholder">} [props.selectProps={}] - Additional props to pass to the `CustomReactSelect` component.
 * @param {(data: Option) => void} [props.afterSelect] - Optional callback function to be executed after an option is selected.
 *
 * @returns {React.ReactElement} The rendered `ReactSelectWrapper` component.
 */

const ReactSelectWrapper = <FormValues extends FieldValues>({
    name,
    control,
    optionsData,
    placeholder = "Select an option",
    label,
    error,
    selectProps = {}, // Default to an empty object if not provided
    afterSelect,
}: ReactSelectWrapperProps<FormValues>): React.ReactElement => {
    return (
        <div className="form-group">
            {label && <label className="form-label">{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <CustomReactSelect
                        placeholder={placeholder}
                        optionsData={optionsData}
                        selectedOptionValue={field.value}
                        onDropdownChange={(selectedOption) => {
                            field.onChange(selectedOption)
                            if (afterSelect) {
                                afterSelect(selectedOption)
                            }
                        }}
                        {...selectProps}
                    />
                )}
            />
            <ShowFormError message={error?.message?.toString()} />
        </div>
    )
}

export default ReactSelectWrapper
