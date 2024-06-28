import {
    getEmailFieldValidationSchema,
    getPasswordFieldValidationSchema,
    getSimpleTextFieldValidationSchema,
} from "@/utils/validation"
import { z } from "zod"

export const ForgotPasswordValidationSchema = z.object({
    email: getEmailFieldValidationSchema(),
})

export type ForgotPasswordSchema = z.infer<typeof ForgotPasswordValidationSchema>

export const UpdateNewPasswordValidationSchema = z
    .object({
        otp: getSimpleTextFieldValidationSchema("OTP"),
        password: getPasswordFieldValidationSchema(),
        confirmPassword: getSimpleTextFieldValidationSchema("Confirm Password"),
    })
    .refine((schema) => schema.password === schema.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password do not match",
    })

export type UpdateNewPasswordSchema = z.infer<typeof UpdateNewPasswordValidationSchema>
