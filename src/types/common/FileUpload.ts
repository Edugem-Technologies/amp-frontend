import { DocumentTypeEnum } from "@/enums/DocumentTypeEnum"
import { ModuleTypeEnum } from "@/enums/ModuleTypeEnum"

/**
 * Interface representing the parameters required for a file upload operation.
 *
 * @property {boolean} [isRetrying] - Indicates if the upload is a retry attempt after a failure.
 * @property {ModuleTypeEnum} moduleType - The module type associated with the file upload.
 * @property {DocumentTypeEnum} documentType - The type of document being uploaded.
 * @property {boolean} [isDirectlyUpdateToBackend] - If true, the file is directly updated to the backend.
 *   If false, the returned object should include a `local_uuid` for local operations such as comparing or removing files from a list.
 *
 * @example
 * const uploadParams: FileUpload = {
 *   moduleType: ModuleTypeEnum.PURCHASE_ORDER,
 *   moduleTask: ModuleTaskEnum.CUSTOMER_PO_UPLOAD_DATA,
 *   documentType: DocumentTypeEnum.INVOICE,
 *   isDirectlyUpdateToBackend: true,
 * };
 */
export interface FileUpload {
    isRetrying?: boolean
    moduleType: ModuleTypeEnum
    documentType: DocumentTypeEnum
    isDirectlyUpdateToBackend?: boolean
}

/**
 * Represents a file to be uploaded, including metadata and file details.
 *
 * @property {string | null} uuid - The unique identifier for the uploaded file (from backend), or null if not yet assigned.
 * @property {string | null} [local_uuid] - Optional local unique identifier for the file (used for local operations before backend assignment).
 * @property {string} id - The identifier for the file (may be used for UI or local tracking).
 * @property {number} size - The size of the file in bytes.
 * @property {string} status - The current status of the file (e.g., "pending", "uploaded", "failed").
 * @property {File} file - The actual File object to be uploaded.
 * @property {string} name - The name of the file.
 * @property {number} width - The width of the file (if applicable, e.g., for images).
 * @property {number} height - The height of the file (if applicable, e.g., for images).
 * @property {ModuleTypeEnum} module_type - The module type associated with the file.
 * @property {DocumentTypeEnum} document_type - The document type of the file.
 * @property {string} [file_format] - The MIME type or format of the file (e.g., "image/png").
 * @property {string | null} [description] - Optional description or notes about the file.
 *
 * @example
 * const uploadedFile: uploadedFileType = {
 *   uuid: null,
 *   local_uuid: "local-123",
 *   id: "file-1",
 *   size: 204800,
 *   status: "pending",
 *   file: new File(["content"], "example.png", { type: "image/png" }),
 *   name: "example.png",
 *   width: 800,
 *   height: 600,
 *   module_type: ModuleTypeEnum.PURCHASE_ORDER,
 *   document_type: DocumentTypeEnum.INVOICE,
 *   file_format: "image/png",
 *   description: "Invoice image for order #123"
 * };
 */
export interface uploadedFileType {
    uuid: string | null
    local_uuid?: string | null
    id: string
    size: number
    status: string
    file: File
    name: string
    width: number
    height: number
    module_type: ModuleTypeEnum
    document_type: DocumentTypeEnum
    file_format?: string
    description?: string | null
}
