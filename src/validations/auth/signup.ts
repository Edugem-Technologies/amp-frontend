import { CONFIG } from "@/utils/constants"
import {
    addressSchemaArray,
    getAlphaNumericFieldSchema,
    getEmailFieldValidationSchema,
    getOptionalAlphaNumericFieldSchema,
    getPhoneNumberSchema,
    getUserPasswordSchema,
} from "@/utils/validation"
import { z } from "zod"
export const SignupValidationSchema = z
    .object({
        first_name: getAlphaNumericFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.FIRST_NAME),
        last_name: getOptionalAlphaNumericFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.LAST_NAME),
        primary_email: getEmailFieldValidationSchema(),
        password: getUserPasswordSchema(),
        password1: getUserPasswordSchema(),
        primary_phone: getPhoneNumberSchema(1),
        country_code: getPhoneNumberSchema(2),
        address: addressSchemaArray(),
    })
    .refine((schema) => schema.password === schema.password1, {
        path: ["password1"],
        message: "Password do not match",
    })

export type SignupSchemaType = z.infer<typeof SignupValidationSchema>
