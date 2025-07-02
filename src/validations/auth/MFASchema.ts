import { CONFIG } from "@/utils/constants"
import { getOTPFieldSchema } from "@/utils/validation"
import { z } from "zod"

export const MFAuthenticatorSchema = z.object({
    authenticator_otp: getOTPFieldSchema({ length: CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_6 }),
})
export type MFAuthenticatorSchemaType = z.infer<typeof MFAuthenticatorSchema>

export const TwoFAEmailSchema = z.object({
    email_otp: getOTPFieldSchema({ length: CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_4 }),
})
export type TwoFAEmailType = z.infer<typeof TwoFAEmailSchema>

export const MFAVerifySchema = z.object({
    otp: getOTPFieldSchema({ length: CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_6 }),
})
export type MFAVerifySchemaType = z.infer<typeof MFAVerifySchema>
