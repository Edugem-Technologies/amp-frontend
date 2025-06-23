import { CONFIG } from "@/utils/constants"
import { checkIsPhoneNumberValid } from "@/utils/helpers"
import {
    getNameFieldSchema,
    getOTPFieldSchema,
    getPhoneNumberSchema,
    getRequiredEmailSchema,
} from "@/utils/validation"
import { z } from "zod"

export const EmailPasswordLoginSchema = z.object({
    primary_email: getRequiredEmailSchema(),
    password: getNameFieldSchema("Password"),
})
// Email + OTP
export const EmailOTPLoginSchema = z.object({
    primary_email: getRequiredEmailSchema(),
    otp: getOTPFieldSchema({ length: CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_4 }),
})

export const EmailOTPSendSchema = EmailOTPLoginSchema.omit({ otp: true })

export const PhoneLoginBaseSchema = z
    .object({
        primary_phone: getPhoneNumberSchema(1),
        country_code: getPhoneNumberSchema(2, CONFIG.VALIDATIONS.FIELD_NAME.COUNTRY_CODE),
    })
    .refine(
        (data) =>
            checkIsPhoneNumberValid({
                phone_country_code: data.country_code,
                phone_number: data.primary_phone,
            }),
        {
            path: ["primary_phone"],
            message: CONFIG.VALIDATIONS.MESSAGE.INVALID_PHONE_NUMBER,
        },
    )

// Phone + Password
/**
 * PhonePasswordLoginSchema combines the base phone login schema with a password field.
 *
 * The `.and()` method in Zod is used to merge two schemas together, resulting in a new schema
 * that requires all properties from both schemas. In this case, it merges `PhoneLoginBaseSchema`
 * (which validates `primary_phone` and `country_code` with custom phone validation)
 * with an additional object schema that requires a `password` field.
 *
 * This ensures that the resulting schema validates objects containing all phone fields and a password.
 */
export const PhonePasswordLoginSchema = PhoneLoginBaseSchema.and(
    z.object({
        password: getNameFieldSchema("Password"),
    }),
)

// Phone + OTP
export const PhoneOTPLoginSchema = PhoneLoginBaseSchema.and(
    z.object({
        otp: getOTPFieldSchema({ length: CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_4 }),
    }),
)

export const PhoneOTPSendSchema = PhoneLoginBaseSchema

export type EmailOTPLoginSchemaType = z.infer<typeof EmailOTPLoginSchema>
export type PhonePasswordLoginSchemaType = z.infer<typeof PhonePasswordLoginSchema>
export type PhoneOTPLoginSchemaType = z.infer<typeof PhoneOTPLoginSchema>
export type EmailPasswordLoginSchemaType = z.infer<typeof EmailPasswordLoginSchema>

export type EmailOTPSendSchemaType = z.infer<typeof EmailOTPSendSchema>
export type PhoneOTPSendSchemaType = z.infer<typeof PhoneOTPSendSchema>

export type LoginSchemaType =
    | EmailOTPLoginSchemaType
    | PhonePasswordLoginSchemaType
    | PhoneOTPLoginSchemaType
    | EmailPasswordLoginSchemaType
