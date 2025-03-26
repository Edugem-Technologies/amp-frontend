import { getUserEmailSchema, getUserPasswordSchema } from "@/utils/validation"
import { z } from "zod"

export const SettingsSchema = z.object({
    avatar: z.any(),
    first_name: z.string().trim().min(1),
    last_name: z.string().trim().min(1),
    role: z.string().min(1),
})

export type AddSettings = z.infer<typeof SettingsSchema>

export const ChangeEmailSchema = z.object({
    email: getUserEmailSchema(),
})

export type ChangeEmail = z.infer<typeof ChangeEmailSchema>

export const ResetPasswordSchema = z
    .object({
        old_password: z
            .string({
                invalid_type_error: "Old password is required",
                required_error: "Old password is required",
            })
            .trim()
            .min(1, { message: "Old password is required" }),
        new_password: getUserPasswordSchema(),
        confirm_new_password: z.string().trim(),
    })
    .refine((schema) => schema.new_password === schema.confirm_new_password, {
        path: ["confirm_new_password"],
        message: "Password does not match",
    })

export type ResetPassword = z.infer<typeof ResetPasswordSchema>
