/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react"
import { GroupBase } from "react-select"
import { ComponentProps, UseAsyncPaginateParams } from "react-select-async-paginate"
import { CreatableProps } from "react-select/creatable"
import { Control, FieldError, FieldErrorsImpl, FieldValues, Merge, Path } from "react-hook-form"

/**
 * Represents an option in the select component.
 */
export interface OptionType {
    label: string
    value: string
}
/**
 * Represents the props required for an async paginated creatable select component.
 * Extends CreatableProps, UseAsyncPaginateParams, and ComponentProps from react-select libraries.
 *
 * @template OptionType - Type of the options.
 * @template Group - Type of the group base for options.
 * @template Additional - Additional parameters for async pagination.
 * @template IsMulti - Boolean flag indicating if multi-select is enabled.
 */
export type AsyncPaginateCreatableProps<
    OptionType,
    Group extends GroupBase<OptionType>,
    Additional,
    IsMulti extends boolean,
> = CreatableProps<OptionType, IsMulti, Group> &
    UseAsyncPaginateParams<OptionType, Group, Additional> &
    ComponentProps<OptionType, Group, IsMulti>

/**
 * Represents the type definition for an async paginated creatable select component.
 *
 * @template OptionType - Type of the options.
 * @template Group - Type of the group base for options.
 * @template Additional - Additional parameters for async pagination.
 * @template IsMulti - Boolean flag indicating if multi-select is enabled.
 */
export type AsyncPaginateCreatableType = <
    OptionType,
    Group extends GroupBase<OptionType>,
    Additional,
    IsMulti extends boolean = false,
>(
    props: AsyncPaginateCreatableProps<OptionType, Group, Additional, IsMulti>,
) => ReactElement

/**
 * Represents the props required for the ReactSelect component.
 * Extends CreatableProps from react-select library.
 */
export interface ReactSelectPropType
    extends CreatableProps<OptionType, boolean, GroupBase<OptionType>> {
    /**
     * Callback function triggered when an option is selected.
     * @param option - The selected option or array of options (if multi-select).
     */
    onSelected: (option: OptionType | OptionType[] | null) => void

    /**
     * Additional parameters for option fetching.
     */
    params?: Record<string, any>

    /**
     * Boolean flag indicating if new options can be created.
     */
    creatable?: boolean

    /**
     * Name of the option.
     */
    optionName?: string

    /**
     * Function to retrieve the label of an option.
     * @param option - The option object.
     * @returns The label string of the option.
     */
    getOptionLabel: (option: any) => string

    /**
     * Function to retrieve the value of an option.
     * @param option - The option object.
     * @returns The value string of the option.
     */
    getOptionValue: (option: any) => string

    /**
     * Callback function triggered when creating a new option.
     * @param label - The label of the newly created option.
     */
    onCreate?: (label: string) => void

    /**
     * Function to fetch options asynchronously.
     * @param args - Arguments passed for fetching options.
     * @returns A promise that resolves with the fetched options.
     */
    loadOptionsFetch: (args: any) => any
}

/**
 * Props for the custom React select component.
 *
 * This interface defines the properties that the custom React select component expects. It includes the currently selected value, placeholder text, options for the select input, and configuration options like whether the select is clearable or disabled.
 *
 * @interface
 */
export interface CustomReactSelectType {
    /**
     * The currently selected option value.
     * @type {string | null}
     * @default null
     */
    selectedOptionValue?: string | null

    /**
     * Placeholder text to display when no option is selected.
     * @type {string}
     * @default undefined
     */
    placeholder?: string

    /**
     * Callback function triggered when the dropdown selection changes.
     * @param {string} value - The selected value from the dropdown.
     */
    onDropdownChange: (value: string) => void

    /**
     * Array of options to be displayed in the dropdown.
     * Each option is an object with a `label` and `value`.
     * @type {{ label: string; value: string }[]}
     */
    optionsData: { label: string; value: string }[]

    /**
     * Indicates whether the select input should be clearable.
     * @type {boolean}
     * @default false
     */
    isClearable?: boolean

    /**
     * Indicates whether the select input should be disabled.
     * @type {boolean}
     * @default false
     */
    isDisabled?: boolean
}

/**
 * Common properties for select wrapper components integrated with react-hook-form.
 *
 * @template FormValues - The type of form values.
 * @typedef {Object} CommonSelectWrapperProps
 * @property {Path<FormValues>} name - The name of the form control, which corresponds to a path in the form values.
 * @property {Control<FormValues>} control - The control object from `react-hook-form`.
 * @property {string} [placeholder] - Optional placeholder text for the select input.
 * @property {string} [label] - Optional label for the select input.
 * @property {FieldError | Merge<FieldError, FieldErrorsImpl<FormValues>> | undefined} [error] - Optional error object for form validation.
 */
export interface CommonSelectWrapperProps<FormValues extends FieldValues> {
    name: Path<FormValues> // Update this line
    control: Control<FormValues>
    placeholder?: string
    label?: string
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<FormValues>> | undefined
}

/**
 * Properties for a React select wrapper component.
 *
 * @template FormValues - The type of form values.
 * @typedef {Object} ReactSelectWrapperProps
 * @extends CommonSelectWrapperProps<FormValues>
 * @property {any[]} optionsData - Array of options to populate the select input.
 * @property {Omit<CustomReactSelectType, "onDropdownChange" | "selectedOptionValue" | "optionsData" | "placeholder">} [selectProps] - Additional props to pass to the custom React select component.
 */
export interface ReactSelectWrapperProps<FormValues extends FieldValues>
    extends CommonSelectWrapperProps<FormValues> {
    optionsData: any[]
    selectProps?: Omit<
        CustomReactSelectType,
        "onDropdownChange" | "selectedOptionValue" | "optionsData" | "placeholder"
    >
    afterSelect?: (data: string) => void
}
