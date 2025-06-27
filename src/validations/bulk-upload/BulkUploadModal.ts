import { CONFIG } from "@/utils/constants"
import { requiredImageSchema } from "@/utils/validation"
import { z } from "zod"

export const BulkUploadModalSchema = z.object({
    file: requiredImageSchema({
        message: CONFIG.VALIDATIONS.MESSAGE.FILE_REQUIRED,
    }),
})

export type BulkUploadModalSchemaType = z.infer<typeof BulkUploadModalSchema>
