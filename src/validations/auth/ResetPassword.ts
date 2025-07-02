import { getUserPasswordSchema } from "@/utils/Validation"
import { z } from "zod"

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
