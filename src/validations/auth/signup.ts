import {
    getEmailFieldValidationSchema,
    getNameFieldValidationSchema,
    getPasswordFieldValidationSchema,
    getSimpleTextFieldValidationSchema,
} from "@/utils/validation"
import { z } from "zod"
export const SignupValidationSchema = z
    .object({
        first_name: getNameFieldValidationSchema("First Name"),
        last_name: getNameFieldValidationSchema("Last Name"),
        email: getEmailFieldValidationSchema(),
        password: getPasswordFieldValidationSchema(),
        confirm_password: getSimpleTextFieldValidationSchema("Confirm Password"),
    })
    .refine((schema) => schema.password === schema.confirm_password, {
        path: ["confirm_password"],
        message: "Password do not match",
    })

export type SignupSchema = z.infer<typeof SignupValidationSchema>
