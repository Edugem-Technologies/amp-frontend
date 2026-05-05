import { CONFIG } from "@/utils/Constants"
import { requiredImageSchema } from "@/utils/Validation"
import { z } from "zod"

export const BulkUploadModalSchema = z.object({
    file: requiredImageSchema({
        message: CONFIG.VALIDATIONS.MESSAGE.FILE_REQUIRED,
    }),
})

export type BulkUploadModalSchemaType = z.infer<typeof BulkUploadModalSchema>
