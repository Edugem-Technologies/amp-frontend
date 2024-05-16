import { ReactElement } from "react"
import { GroupBase } from "react-select"
import { ComponentProps, UseAsyncPaginateParams } from "react-select-async-paginate"
import { CreatableProps } from "react-select/creatable"

export interface OptionType {
    label: string
    value: string
}
export type AsyncPaginateCreatableProps<
    OptionType,
    Group extends GroupBase<OptionType>,
    Additional,
    IsMulti extends boolean,
> = CreatableProps<OptionType, IsMulti, Group> &
    UseAsyncPaginateParams<OptionType, Group, Additional> &
    ComponentProps<OptionType, Group, IsMulti>

export type AsyncPaginateCreatableType = <
    OptionType,
    Group extends GroupBase<OptionType>,
    Additional,
    IsMulti extends boolean = false,
>(
    props: AsyncPaginateCreatableProps<OptionType, Group, Additional, IsMulti>,
) => ReactElement

export interface ReactSelectPropType
    extends CreatableProps<OptionType, boolean, GroupBase<OptionType>> {
    onSelected: (option: OptionType | OptionType[] | null) => void
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
    loadOptionsFetch: (args: any) => any
}
