import { addressSchema } from "@/utils/validation"
import { z } from "zod"

export type AddressData = z.infer<ReturnType<typeof addressSchema>>
export interface AddressPropType {
    onChange: (addressObject: AddressData | null) => void
    errors?: Partial<Record<keyof AddressData, { message?: string } | undefined>>
    addressValue?: AddressData | null | undefined
}
