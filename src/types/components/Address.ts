import { addressSchema } from "@/utils/validation"
import { UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form"
import { z } from "zod"
import { Any } from "../common/helper"

/**
 * Type representing the structure of an address object as defined by the addressSchema.
 */
export type AddressData = z.infer<ReturnType<typeof addressSchema>>

/**
 * Base props for address-related components.
 *
 * @property {function} onChange - Callback invoked when the address object changes.
 * @property {object} [errors] - Optional error messages for each address field, keyed by AddressData property.
 * @property {AddressData | null | undefined} [addressValue] - The current value of the address fields.
 * @property {string} [inputColClass] - Optional CSS class for input column layout.
 * @property {boolean} [showAddMore] - Whether to show the "Add More" button for multiple addresses.
 */
export interface BaseAddressPropType {
    onChange: (addressObject: AddressData | null) => void
    errors?: Partial<Record<keyof AddressData, { message?: string } | undefined>>
    addressValue?: AddressData | null | undefined
    inputColClass?: string
    showAddMore?: boolean
}

/**
 * Props for address components that support adding/removing multiple addresses.
 *
 * @extends BaseAddressPropType
 * @property {true} showAddMore - Indicates that "Add More" functionality is enabled.
 * @property {UseFieldArrayAppend<Any, Any>} append - Function to append a new address field.
 * @property {UseFieldArrayRemove} remove - Function to remove an address field.
 * @property {number} fieldLength - The current number of address fields.
 * @property {number} index - The index of the current address field.
 * @property {string} [addMoreSectionCustomClass] - Optional custom class for the "Add More" section.
 */
export interface AddressPropTypeWithAddMore extends BaseAddressPropType {
    showAddMore?: true
    append: UseFieldArrayAppend<Any, Any>
    remove: UseFieldArrayRemove
    fieldLength: number
    index: number
    addMoreSectionCustomClass?: string
}

/**
 * Props for address components that do not support adding/removing multiple addresses.
 *
 * @extends BaseAddressPropType
 * @property {false} showAddMore - Indicates that "Add More" functionality is disabled.
 */
export interface AddressPropTypeWithoutAddMore extends BaseAddressPropType {
    showAddMore?: false
}

/**
 * Union type for address component props, supporting both single and multiple address modes.
 */
export type AddressPropType = AddressPropTypeWithAddMore | AddressPropTypeWithoutAddMore
