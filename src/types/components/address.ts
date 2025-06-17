import { z } from "zod"
import { addressSchema } from "@/utils/validation"

export type AddressData = z.infer<ReturnType<typeof addressSchema>>
export interface AddressPropType {
    onChange: (addressObject: AddressData | null) => void
    errorMessage?: string
    addressValue?: AddressData | null | undefined
}
