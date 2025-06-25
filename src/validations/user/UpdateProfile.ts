import { CONFIG } from "@/utils/constants"
import {
    addressSchemaArray,
    getAlphaNumericFieldSchema,
    getEmailFieldValidationSchema,
    getNameFieldSchema,
    getOptionalAlphaNumericFieldSchema,
    getOTPFieldSchema,
    getPhoneNumberSchema,
    getRequiredMultiSelectFieldSchema,
} from "@/utils/validation"
import { z } from "zod"

export const UpdateProfileSchema = z.object({
    first_name: getAlphaNumericFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.FIRST_NAME),
    last_name: getOptionalAlphaNumericFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.LAST_NAME),
    roles: getRequiredMultiSelectFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.ROLE),
    address: addressSchemaArray(),
    document: z.any(),
})

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

export const VerifyOTPSchema = z.object({
    otp: getOTPFieldSchema({ length: CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_4 }),
})

export const SendEmailOTPSchema = z.object({
    primary_email: getEmailFieldValidationSchema(),
})
export const UpdateEmailSchema = SendEmailOTPSchema.merge(VerifyOTPSchema)

export const SendPhoneNumberOTPSchema = z.object({
    primary_phone: getPhoneNumberSchema(1),
    country_code: getPhoneNumberSchema(2),
})
export const UpdatePhoneNumberSchema = SendPhoneNumberOTPSchema.merge(VerifyOTPSchema)

export type UpdatePasswordSchemaType = z.infer<typeof UpdatePasswordSchema>
export type VerifyOTPSchemaType = z.infer<typeof VerifyOTPSchema>
export type UpdateEmailSchemaType = z.infer<typeof UpdateEmailSchema>
export type SendEmailOTPSchemaType = z.infer<typeof SendEmailOTPSchema>
export type UpdatePhoneNumberSchemaType = z.infer<typeof UpdatePhoneNumberSchema>
export type SendPhoneNumberOTPSchemaType = z.infer<typeof SendPhoneNumberOTPSchema>
export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>
