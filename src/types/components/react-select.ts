/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react"
import { GroupBase } from "react-select"
import { ComponentProps, UseAsyncPaginateParams } from "react-select-async-paginate"
import { CreatableProps } from "react-select/creatable"

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
