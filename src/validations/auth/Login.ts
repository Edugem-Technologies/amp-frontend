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

// Phone + Password
export const PhonePasswordLoginSchema = z
    .object({
        primary_phone: getPhoneNumberSchema(1),
        country_code: getPhoneNumberSchema(2),
        password: getNameFieldSchema("Password"),
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

// Phone + OTP
export const PhoneOTPLoginSchema = z
    .object({
        primary_phone: getPhoneNumberSchema(1),
        country_code: getPhoneNumberSchema(2),
        otp: getOTPFieldSchema({ length: CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_4 }),
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

export type EmailOTPLoginSchemaType = z.infer<typeof EmailOTPLoginSchema>
export type PhonePasswordLoginSchemaType = z.infer<typeof PhonePasswordLoginSchema>
export type PhoneOTPLoginSchemaType = z.infer<typeof PhoneOTPLoginSchema>
export type EmailPasswordLoginSchemaType = z.infer<typeof EmailPasswordLoginSchema>
