import { checkValidPhoneNumber } from "@/utils/helpers"
import { generateErrorMessage } from "@/utils/message-generator"
import {
    getNameFieldValidationSchema,
    getPhoneNumberSchema,
    getUserEmailSchema,
    getUserNameSchema,
} from "@/utils/validation"
import { z } from "zod"

export const EditUserInfoSchema = z
    .object({
        first_name: getUserNameSchema("First name is required", "First Name"),
        last_name: getUserNameSchema("Last name is required", "Last Name").optional().nullable(),
        email: getUserEmailSchema(),
        phone: getPhoneNumberSchema(1),
        phone_country_code: getPhoneNumberSchema(2),
        username: getNameFieldValidationSchema("Username")
            .min(3, {
                message: "Username must be at least 3 characters long",
            })
            .transform((value) => value?.toUpperCase()),
        user_access: z.string().min(1, { message: generateErrorMessage("Role") }),
    })
    .refine((data) => checkValidPhoneNumber({ data: data.phone }), "Invalid phone number")

export type EditUser = z.infer<typeof EditUserInfoSchema>
