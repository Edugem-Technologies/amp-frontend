import {
    getEmailFieldValidationSchema,
    getSimpleTextFieldValidationSchema,
} from "@/utils/validation"
import { z } from "zod"
export const LoginValidationSchema = z.object({
    email: getEmailFieldValidationSchema(),
    password: getSimpleTextFieldValidationSchema("Password"),
})

export type LoginSchema = z.infer<typeof LoginValidationSchema>
