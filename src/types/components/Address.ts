import { addressSchema } from "@/utils/validation"
import { UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form"
import { z } from "zod"
import { Any } from "../common/helper"

export type AddressData = z.infer<ReturnType<typeof addressSchema>>

export interface BaseAddressPropType {
    onChange: (addressObject: AddressData | null) => void
    errors?: Partial<Record<keyof AddressData, { message?: string } | undefined>>
    addressValue?: AddressData | null | undefined
    inputColClass?: string
    showAddMore?: boolean
}
export interface AddressPropTypeWithAddMore extends BaseAddressPropType {
    showAddMore?: true
    append: UseFieldArrayAppend<Any, Any>
    remove: UseFieldArrayRemove
    fieldLength: number
    index: number
    addMoreSectionCustomClass?: string
}
export interface AddressPropTypeWithoutAddMore extends BaseAddressPropType {
    showAddMore?: false
}

export type AddressPropType = AddressPropTypeWithAddMore | AddressPropTypeWithoutAddMore
