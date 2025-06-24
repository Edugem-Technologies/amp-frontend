import { CONFIG } from "@/utils/constants"
import {
    addressSchemaArray,
    getAlphaNumericFieldSchema,
    getEmailFieldValidationSchema,
    getNameFieldSchema,
    getOptionalAlphaNumericFieldSchema,
    getOTPFieldSchema,
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
export const UpdatePasswordSchema = z
    .object({
        current_password: getNameFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.CURRENT_PASSWORD),
        new_password: getNameFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.NEW_PASSWORD),
        confirm_password: getNameFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.CONFIRM_PASSWORD),
    })
    .refine((schema) => schema.new_password === schema.confirm_password, {
        path: ["confirm_password"],
        message: CONFIG.VALIDATIONS.MESSAGE.PASSWORD_DO_NOT_MATCH,
    })

export const UpdateEmailSchema = z.object({
    primary_email: getEmailFieldValidationSchema(),
    otp: getOTPFieldSchema({ length: CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_4 }),
})

export const SendEmailOTPSchema = UpdateEmailSchema.omit({ otp: true })
export const VerifyEmailOTPSchema = UpdateEmailSchema.omit({ primary_email: true })

export type UpdatePasswordSchemaType = z.infer<typeof UpdatePasswordSchema>
export type UpdateEmailSchemaType = z.infer<typeof UpdateEmailSchema>
export type SendEmailOTPSchemaType = z.infer<typeof SendEmailOTPSchema>
export type VerifyEmailOTPSchemaType = z.infer<typeof VerifyEmailOTPSchema>
export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>
