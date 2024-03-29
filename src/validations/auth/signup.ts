import { generateErrorMessage } from "@/utils/message-generator"
import { z } from "zod"
export const SignupValidationSchema = z
    .object({
        first_name: z
            .string()
            .trim()
            .min(3, { message: generateErrorMessage("First Name", 3) })
            .max(50, { message: generateErrorMessage("First Name", 50, true) })
            .refine((value) => value.match(/^[a-zA-Z]+[a-zA-Z\s']*$/), {
                message: "Invalid First Name",
            }),
        last_name: z
            .string()
            .trim()
            .min(1, { message: generateErrorMessage("Last Name") })
            .max(50, { message: generateErrorMessage("Last Name", 50, true) })
            .refine((value) => value.match(/^[a-zA-Z]+[a-zA-Z\s']*$/), {
                message: "Invalid Last Name",
            }),
        email: z
            .string({ required_error: generateErrorMessage("Email") })
            .min(1, { message: generateErrorMessage("Email") })
            .email(),
        password: z
            .string()
            .trim()
            .min(6, { message: generateErrorMessage("Password", 6) })
            .refine((field) => field.match(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/), {
                message: "Must contain a combination of letters and numbers",
            }),
        confirm_password: z
            .string()
            .trim()
            .min(1, { message: generateErrorMessage("Confirm Password") }),
    })
    .refine((schema) => schema.password === schema.confirm_password, {
        path: ["confirm_password"],
        message: "Password do not match",
    })

export type SignupSchema = z.infer<typeof SignupValidationSchema>
