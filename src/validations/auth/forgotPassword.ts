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
    pin: getUserPasswordSchema(),
    pin_confirmation: getUserPasswordSchema(),
}).refine((schema) => schema.pin === schema.pin_confirmation, {
    path: ["pin_confirmation"],
    message: "Password do not match",
})

export type ResetPasswordSchema = z.infer<typeof ResetPasswordValidationSchema>
