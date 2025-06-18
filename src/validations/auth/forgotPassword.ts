import { CONFIG } from "@/utils/constants"
import {
    getNameFieldSchema,
    getRequiredEmailSchema,
    getUserPasswordSchema,
} from "@/utils/validation"
import { z } from "zod"

export const BaseForgotPasswordSchema = z.object({
    primary_email: getRequiredEmailSchema(),
})

export type BaseForgotPasswordSchemaType = z.infer<typeof BaseForgotPasswordSchema>

export const ResetPasswordValidationSchema = BaseForgotPasswordSchema.extend({
    token: getNameFieldSchema("Token", CONFIG.VALIDATIONS.CHARACTER_LENGTH.CHARS_255),
    password: getUserPasswordSchema(),
    password_confirmation: getUserPasswordSchema(),
}).refine((schema) => schema.password === schema.password_confirmation, {
    path: ["password_confirmation"],
    message: "Password do not match",
})

export type ResetPasswordSchema = z.infer<typeof ResetPasswordValidationSchema>
