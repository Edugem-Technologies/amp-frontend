import { getSimpleTextFieldValidationSchema } from "@/utils/validation"
import { z } from "zod"

export const OtpValidationSchema = z.object({
    otp: getSimpleTextFieldValidationSchema("OTP"),
})

export type OtpSchema = z.infer<typeof OtpValidationSchema>
