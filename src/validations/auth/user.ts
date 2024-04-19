import { generateErrorMessage } from "@/utils/message-generator"
import { z } from "zod"
export const LoginValidationSchema = z.object({
    email: z
        .string({ required_error: generateErrorMessage("Email") })
        .min(1, { message: generateErrorMessage("Email") })
        .email(),
    password: z
        .string()
        .trim()
        .min(1, { message: generateErrorMessage("Password") }),
})

export type LoginSchema = z.infer<typeof LoginValidationSchema>
