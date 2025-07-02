import { DocumentTypeEnum } from "@/enums/DocumentTypeEnum"
import { FetchHelper } from "@/services/FetchHelper"
import { AnyObject } from "@/types/common/Helper"
import { BulkUploadButtonProps } from "@/types/components/Button"
import { DefaultModalPropType } from "@/types/components/Modal"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/Constants"
import { handleError } from "@/utils/HandleError"
import {
    createFileObjectForS3Upload,
    formatTextToTitleCase,
    handleUploadFile,
    showSweetAlert,
} from "@/utils/Helpers"
import {
    BulkUploadModalSchema,
    BulkUploadModalSchemaType,
} from "@/validations/bulk-upload/BulkUploadModal"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import InputDropzone from "../common/InputDropzone"
import PdfFilePreview from "../common/PdfFilePreview"
import ShowFormError from "../common/ShowFormError"
import TabBody from "../common/TabBody"
import ModalFooter from "./ModalFooter"
import ModalWrapper from "./ModalWrapper"

/**
 * BulkUploadModal is a modal component for handling bulk file uploads (e.g., Excel files) for a given module.
 *
 * This modal guides the user through three steps:
 * 1. Downloading a sample file for the selected module.
 * 2. Filling in the required details in the sample file.
 * 3. Uploading the completed file for processing.
 *
 * The component supports custom sample file download logic and custom upload handling via props.
 * If not provided, it uses default logic to upload the file to S3 and then triggers the backend bulk upload endpoint.
 *
 * @component
 * @param {DefaultModalPropType & BulkUploadButtonProps} props - The props for the modal.
 * @param {() => void} props.onClose - Function to close the modal.
 * @param {string} props.moduleType - The module type for which the bulk upload is being performed.
 * @param {string} [props.modalTitle] - Optional custom title for the modal.
 * @param {(data: BulkUploadModalSchemaType) => Promise<void>} [props.onAdded] - Optional custom handler for file upload.
 * @param {() => void} [props.handleDownloadSampleLink] - Optional custom handler for downloading the sample file.
 * @param {boolean} [props.isSubmitDisabled] - Optional flag to disable the submit button.
 *
 * @example
 * <BulkUploadModal
 *   onClose={() => setShowModal(false)}
 *   moduleType="USER"
 *   modalTitle="User"
 * />
 *
 * @returns {JSX.Element} The rendered modal component.
 */
const BulkUploadModal: React.FC<DefaultModalPropType & BulkUploadButtonProps> = ({
    onClose,
    moduleType,
    modalTitle,
    onAdded,
    handleDownloadSampleLink,
    isSubmitDisabled = false,
}) => {
    const {
        control,
        setError,
        handleSubmit,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<BulkUploadModalSchemaType>({
        resolver: zodResolver(BulkUploadModalSchema),
    })

    /**
     * Array of step content for the modal stepper.
     * Each step guides the user through the bulk upload process.
     */
    const bulkUploadModalContent = [
        {
            id: 1,
            content: (
                <div>
                    <div className="mt-2">
                        <a
                            role="button"
                            className="lead"
                            onClick={async () => {
                                if (handleDownloadSampleLink) {
                                    handleDownloadSampleLink()
                                } else {
                                    const response = await FetchHelper.getBlobResponse(
                                        CONFIG.API_ENDPOINTS.DOWNLOAD_BULK_UPLOAD_SAMPLE_FILE,
                                        {
                                            module_type: moduleType,
                                        },
                                    )
                                    const objectURL = URL.createObjectURL(response)
                                    const link = document.createElement("a")
                                    link.href = objectURL
                                    link.download = `${moduleType?.toLocaleLowerCase()}_sample.xlsx`
                                    link.click()
                                    URL.revokeObjectURL(objectURL)
                                }
                            }}
                        >
                            Download Sample file
                        </a>
                    </div>
                </div>
            ),
        },
        {
            id: 2,
            content: (
                <div>
                    <p className="lead ">Add details in sample file</p>
                </div>
            ),
        },
        {
            id: 3,
            content: (
                <div className="w-100">
                    <p className="lead ">Upload your file</p>
                    <Controller
                        control={control}
                        name="file"
                        render={({ field }) => (
                            <InputDropzone
                                containerCustomClass="bulk-upload-dropzone"
                                innerDivcustomClass="h-100 flex-center"
                                onDrop={(file: File) => {
                                    field.onChange(file)
                                    clearErrors("file")
                                }}
                                onError={(error: AnyObject) => {
                                    switch (error?.code) {
                                        case CONFIG.CODE.INVALID_FILE_TYPE:
                                            setError("file", {
                                                message:
                                                    CONFIG.VALIDATIONS.MESSAGE
                                                        .ONLY_XLSX_FILE_ACCEPTED,
                                            })
                                            break
                                        default:
                                            setError("file", error)
                                    }
                                }}
                                type={{ ...CONFIG.FILE_TYPE.XLSX }}
                                onFileRemove={() => {
                                    field.onChange(null)
                                }}
                                fileUrl={field.value}
                                file={field.value}
                            >
                                {field.value ? (
                                    <PdfFilePreview file={field.value} setFile={field.onChange} />
                                ) : (
                                    <>Drag & Drop or Click to Browse</>
                                )}
                            </InputDropzone>
                        )}
                    />
                    <ShowFormError message={errors?.file?.message} />
                </div>
            ),
        },
    ]

    /**
     * Handles the form submission for bulk upload.
     * If a custom onAdded handler is provided, it is called with the form data.
     * Otherwise, the file is uploaded to S3 and the backend bulk upload endpoint is triggered.
     * Shows a success alert on successful upload.
     *
     * @async
     * @param {BulkUploadModalSchemaType} data - The validated form data containing the file.
     * @returns {Promise<void>}
     */
    const submitHandler = async (data: BulkUploadModalSchemaType) => {
        try {
            if (onAdded) {
                await onAdded(data)
            } else {
                const fileObject = createFileObjectForS3Upload(data.file)
                const updatedFileObject = await handleUploadFile({
                    fileToUpload: [fileObject],
                    documentType: DocumentTypeEnum.BULK_UPLOAD,
                    moduleType,
                })
                if (updatedFileObject) {
                    const response = await FetchHelper.get(CONFIG.API_ENDPOINTS.BULK_UPLOAD, {
                        module_type: moduleType,
                        file_name: updatedFileObject?.[0].name,
                    })
                    if (response.status) {
                        showSweetAlert({
                            icon: ALERT_ICON_TYPE.success,
                            text: CONFIG.MESSAGES.FILE_UPLOAD_SUCCESSFULLY,
                        })
                    }
                }
            }
            onClose()
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <ModalWrapper
            modalTitle={`Bulk Upload ${formatTextToTitleCase(
                modalTitle ?? moduleType.toLowerCase(),
            )}`}
            onClose={onClose}
            size="lg"
        >
            <TabBody>
                <form className="card-body" onSubmit={handleSubmit(submitHandler)}>
                    <div className="stepper d-flex flex-column form-section mb-0">
                        {bulkUploadModalContent.map((item) => (
                            <div className="d-flex mb-1 gap-2 step" key={item.id}>
                                <div className="d-flex flex-column pr-4 align-items-center">
                                    <div className="rounded-circle py-2 px-3 bg-dark text-white mb-1">
                                        {item.id}
                                    </div>
                                    <div
                                        className={`line h-100 ${
                                            item.id === bulkUploadModalContent.length
                                                ? "d-none"
                                                : ""
                                        }`}
                                    ></div>
                                </div>
                                {item.content}
                            </div>
                        ))}
                    </div>
                    <hr />
                    <ModalFooter
                        isSubmitting={isSubmitting}
                        buttonTitle="Submit"
                        isSubmitDisabled={isSubmitDisabled || isSubmitting}
                    />
                </form>
            </TabBody>
        </ModalWrapper>
    )
}

export default BulkUploadModal
