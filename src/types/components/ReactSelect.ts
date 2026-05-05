/* eslint-disable @typescript-eslint/no-explicit-any */
import { Params } from "@/services/FetchHelper"
import { ReactElement } from "react"
import { GroupBase, Props } from "react-select"
import { ComponentProps, UseAsyncPaginateParams } from "react-select-async-paginate"
import { CreatableProps } from "react-select/creatable"
import { Any } from "../common/Helper"

/**
 * Represents the props required for an async paginated creatable select component.
 * Extends CreatableProps, UseAsyncPaginateParams, and ComponentProps from react-select libraries.
 *
 * @template Option - Type of the options.
 * @template Group - Type of the group base for options.
 * @template Additional - Additional parameters for async pagination.
 * @template IsMulti - Boolean flag indicating if multi-select is enabled.
 */
export type AsyncPaginateCreatableProps<
    Option,
    Group extends GroupBase<Option>,
    Additional,
    IsMulti extends boolean,
> = CreatableProps<Option, IsMulti, Group> &
    UseAsyncPaginateParams<Option, Group, Additional> &
    ComponentProps<Option, Group, IsMulti>

/**
 * Represents the type definition for an async paginated creatable select component.
 *
 * @template Option - Type of the options.
 * @template Group - Type of the group base for options.
 * @template Additional - Additional parameters for async pagination.
 * @template IsMulti - Boolean flag indicating if multi-select is enabled.
 */
export type AsyncPaginateCreatableType = <
    Option,
    Group extends GroupBase<Option>,
    Additional,
    IsMulti extends boolean = false,
>(
    props: AsyncPaginateCreatableProps<Option, Group, Additional, IsMulti>,
) => ReactElement

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

export interface Option {
    label: string
    value: string | number | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any
}

export interface BaseSelectPropType extends CreatableProps<Option, boolean, GroupBase<Option>> {
    endpoint: URL
    onSelected: (option: Option | Option[] | null) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Record<string, any>
    creatable?: boolean
    optionName?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getOptionLabel: (option: any) => string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getOptionValue: (option: any) => string
    onCreate?: (label: string) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getOptionData: (option: any) => any
    filterKey?: string
    showSlicedLabel?: boolean
    searchKey?: string
    searchParams?: Record<string, Any>
}

export interface BaseStaticSelectPropType extends Props<Option> {
    onSelected: (option: Option | Option[] | null) => void
    isMulti?: boolean
    options: Option[]
    selectedOptionValue?: Option | Option[] | null
    placeholder?: string
    className?: string
    isCheckBoxDropdowns?: boolean
}

export interface BaseWrapperSelectPropType
    extends CreatableProps<Option, boolean, GroupBase<Option>> {
    selectedOptionValue?: Option | Option[] | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSelected: (option: any) => void
    isClearable?: boolean
    isDisabled?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refetch?: Array<any>
    creatable?: boolean
    label: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    procurementCategory?: boolean
    params?: Params
    isSchemaDesign?: boolean
    searchParams?: Params
    searchKey?: string
}
