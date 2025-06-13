import { generateErrorMessage } from "@/utils/message-generator"
import {
    getNameFieldValidationSchema,
    getPhoneNumberSchema,
    getUserEmailSchema,
    getUserNameSchema,
    getUserPasswordSchema,
} from "@/utils/validation"
import { z } from "zod"

export const AddUserSchema = z
    .object({
        // avatar: z.any(),
        username: getNameFieldValidationSchema("Username"),
        first_name: getUserNameSchema(
            "First Name can only contain alphabets single quotes, and spaces",
            "Fist Name",
        ),
        last_name: getNameFieldValidationSchema("Last Name"),
        email: getUserEmailSchema(),
        user_access: z.string().min(1, { message: generateErrorMessage("Role") }),
        phone: getPhoneNumberSchema(1),
        phone_country_code: getPhoneNumberSchema(2),
        password: getUserPasswordSchema(),
        confirm_password: getNameFieldValidationSchema("Confirm Password"),
    })
    .superRefine((args, ctx) => {
        const { password, confirm_password } = args
        if (password !== confirm_password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password do not match",
                path: ["confirm_password"],
            })
        }
    })
    .transform((args) => {
        const payload: Partial<typeof args> = { ...args }
        delete payload.confirm_password
        return payload
    })
// .refine((data) => isPhoneNumberValid(data), CONFIG.MESSAGES.INVALID_PHONE_NUMBER)

export type AddUser = z.infer<typeof AddUserSchema>
