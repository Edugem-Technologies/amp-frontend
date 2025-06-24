import { CONFIG } from "@/utils/constants"
import {
    addressSchemaArray,
    getAlphaNumericFieldSchema,
    getOptionalAlphaNumericFieldSchema,
    getRequiredMultiSelectFieldSchema,
} from "@/utils/validation"
import { z } from "zod"

export const UpdateProfileSchema = z.object({
    first_name: getAlphaNumericFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.FIRST_NAME),
    last_name: getOptionalAlphaNumericFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.LAST_NAME),
    roles: getRequiredMultiSelectFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.ROLE),
    // primary_phone: getPhoneNumberSchema(1),
    // country_code: getPhoneNumberSchema(2),
    address: addressSchemaArray(),
})
// .refine(
//     (data) =>
//         checkIsPhoneNumberValid({
//             phone_country_code: data.country_code,
//             phone_number: data.primary_phone,
//         }),
//     {
//         path: ["primary_phone"],
//         message: CONFIG.VALIDATIONS.MESSAGE.INVALID_PHONE_NUMBER,
//     },
// )

export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>
