import {
    getAlphaNumericFieldSchema,
    getOptionalAlphaNumericFieldSchema,
    getRequiredMultiSelectFieldSchema,
} from "@/utils/validation"
import { z } from "zod"

export const RoleDetailsSchema = z.object({
    details: z.object({
        name: getAlphaNumericFieldSchema("Name"),
        description: getOptionalAlphaNumericFieldSchema("Description"),
    }),
    permissions: getRequiredMultiSelectFieldSchema("Permissions"),
})

export type RoleDetailsSchemaType = z.infer<typeof RoleDetailsSchema>
