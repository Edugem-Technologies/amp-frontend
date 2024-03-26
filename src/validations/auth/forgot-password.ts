import { generateErrorMessage } from "@/utils/message-generator"
import { z } from "zod"

export const ForgotPasswordValidationSchema = z.object({
    email: z
        .string({ required_error: generateErrorMessage("Email") })
        .min(1, { message: generateErrorMessage("Email") })
        .email(),
})

export type ForgotPasswordSchema = z.infer<typeof ForgotPasswordValidationSchema>

export const UpdateNewPasswordValidationSchema = z
    .object({
        otp: z
            .string({ required_error: generateErrorMessage("OTP") })
            .trim()
            .min(1, { message: generateErrorMessage("OTP") }),
        password: z
            .string()
            .trim()
            .min(6, { message: generateErrorMessage("Password", 6) })
            .refine((field) => field.match(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/), {
                message: "Must contain a combination of letters and numbers",
            }),
        confirmPassword: z
            .string()
            .trim()
            .min(1, { message: generateErrorMessage("Confirm Password") }),
    })
    .refine((schema) => schema.password === schema.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password do not match",
    })

export type UpdateNewPasswordSchema = z.infer<typeof UpdateNewPasswordValidationSchema>
