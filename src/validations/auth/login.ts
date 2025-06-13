import { getNameFieldSchema, getRequiredEmailSchema } from "@/utils/validation"
import { z } from "zod"

export const LoginValidationSchema = z.object({
    primary_email: getRequiredEmailSchema(),
    password: getNameFieldSchema("Password"),
})

export type LoginValidationSchemaType = z.infer<typeof LoginValidationSchema>
