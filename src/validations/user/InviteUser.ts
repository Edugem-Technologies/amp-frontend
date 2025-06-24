import { CONFIG } from "@/utils/constants"
import {
    getAlphaNumericFieldSchema,
    getOptionalAlphaNumericFieldSchema,
    getRequiredEmailSchema,
    getRequiredMultiSelectFieldSchema,
} from "@/utils/validation"
import { z } from "zod"

export const InviteUserSchema = z.object({
    first_name: getAlphaNumericFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.FIRST_NAME),
    last_name: getOptionalAlphaNumericFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.LAST_NAME),
    primary_email: getRequiredEmailSchema(),
    roles: getRequiredMultiSelectFieldSchema(CONFIG.VALIDATIONS.FIELD_NAME.ROLE),
})

export type InviteUserSchemaType = z.infer<typeof InviteUserSchema>
