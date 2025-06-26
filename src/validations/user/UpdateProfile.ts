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

/**
 * Zod schema for updating a user's profile.
 *
 * Fields:
 * - first_name: Required alphanumeric string (see config for constraints)
 * - last_name: Optional alphanumeric string
 * - roles: Required array of selected roles
 * - address: Array of address objects (see addressSchemaArray)
 * - document: Any type (for file or document upload)
 *
 * @example
 * UpdateProfileSchema.parse({
 *   first_name: "John",
 *   last_name: "Doe",
 *   roles: ["admin"],
 *   address: [...],
 *   document: {...}
 * })
 */
export const UpdateProfileSchema = z.object({
    first_name: getAlphaNumericFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.FIRST_NAME),
    last_name: getOptionalAlphaNumericFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.LAST_NAME),
    roles: getRequiredMultiSelectFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.ROLE),
    address: addressSchemaArray(),
    document: z.any(),
})

/**
 * Zod schema for updating a user's password.
 *
 * Fields:
 * - current_password: Required string (see config for constraints)
 * - new_password: Required string
 * - confirm_password: Required string, must match new_password
 *
 * @example
 * UpdatePasswordSchema.parse({
 *   current_password: "oldPass123",
 *   new_password: "newPass456",
 *   confirm_password: "newPass456"
 * })
 */
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

/**
 * Zod schema for verifying a 4-digit OTP.
 *
 * Fields:
 * - otp: Required string, must be 4 characters (see config)
 *
 * @example
 * VerifyOTPSchema.parse({ otp: "1234" })
 */
export const VerifyOTPSchema = z.object({
    otp: getOTPFieldSchema({ length: CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_4 }),
})

/**
 * Zod schema for sending an email OTP.
 *
 * Fields:
 * - primary_email: Required, must be a valid email address
 *
 * @example
 * SendEmailOTPSchema.parse({ primary_email: "user@example.com" })
 */
export const SendEmailOTPSchema = z.object({
    primary_email: getEmailFieldValidationSchema(),
})

/**
 * Zod schema for updating email, requiring both email and OTP.
 * Merges SendEmailOTPSchema and VerifyOTPSchema.
 *
 * Fields:
 * - primary_email: Required, must be a valid email address
 * - otp: Required, must be a 4-digit string
 *
 * @example
 * UpdateEmailSchema.parse({ primary_email: "user@example.com", otp: "1234" })
 */
export const UpdateEmailSchema = SendEmailOTPSchema.merge(VerifyOTPSchema)

/**
 * Zod schema for sending a phone number OTP.
 *
 * Fields:
 * - primary_phone: Required, must be a valid phone number (see config)
 * - country_code: Required, must be a valid country code (see config)
 *
 * @example
 * SendPhoneNumberOTPSchema.parse({ primary_phone: "9876543210", country_code: "+1" })
 */
export const SendPhoneNumberOTPSchema = z.object({
    primary_phone: getPhoneNumberSchema(1),
    country_code: getPhoneNumberSchema(2),
})

/**
 * Zod schema for updating phone number, requiring both phone and OTP.
 * Merges SendPhoneNumberOTPSchema and VerifyOTPSchema.
 *
 * Fields:
 * - primary_phone: Required, must be a valid phone number
 * - country_code: Required, must be a valid country code
 * - otp: Required, must be a 4-digit string
 *
 * @example
 * UpdatePhoneNumberSchema.parse({ primary_phone: "9876543210", country_code: "+1", otp: "1234" })
 */
export const UpdatePhoneNumberSchema = SendPhoneNumberOTPSchema.merge(VerifyOTPSchema)

export type UpdatePasswordSchemaType = z.infer<typeof UpdatePasswordSchema>
export type VerifyOTPSchemaType = z.infer<typeof VerifyOTPSchema>
export type UpdateEmailSchemaType = z.infer<typeof UpdateEmailSchema>
export type SendEmailOTPSchemaType = z.infer<typeof SendEmailOTPSchema>
export type UpdatePhoneNumberSchemaType = z.infer<typeof UpdatePhoneNumberSchema>
export type SendPhoneNumberOTPSchemaType = z.infer<typeof SendPhoneNumberOTPSchema>
export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>
