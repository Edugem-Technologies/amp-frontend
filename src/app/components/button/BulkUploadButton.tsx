import { Any } from "@/types/common/Helper"
import { BulkUploadButtonProps } from "@/types/components/Button"
import { useState } from "react"
import BulkUploadModal from "../modal/BulkUploadModal"
import SecondaryButton from "./SecondaryButton"

/**
 * BulkUploadButton component renders a button that opens a modal for bulk uploading files.
 *
 * When clicked, it displays the BulkUploadModal, allowing users to upload multiple files
 * for a specific module type. The modal can be customized with a title, a callback for when
 * files are added, a sample download link handler, and a flag to disable submission.
 *
 * @component
 * @param {BulkUploadButtonProps} props - The props for the BulkUploadButton component.
 * @param {string} props.moduleType - The type of module for which the bulk upload is performed.
 * @param {string} [props.modalTitle] - Optional title for the upload modal.
 * @param {string} [props.buttonTitle] - Optional title for the upload button (defaults to "Bulk Upload").
 * @param {Function} [props.onAdded] - Optional callback invoked after files are successfully added.
 * @param {Function} [props.handleDownloadSampleLink] - Optional handler for downloading a sample file.
 * @param {boolean} [props.isSubmitDisabled=false] - Optional flag to disable the submit button in the modal.
 * @param {...Any} [props] - Additional props passed to the SecondaryButton.
 *
 * @example
 * <BulkUploadButton
 *   moduleType="user"
 *   modalTitle="Upload Users"
 *   buttonTitle="Bulk Upload Users"
 *   onAdded={handleAdded}
 *   handleDownloadSampleLink={downloadSample}
 *   isSubmitDisabled={false}
 * />
 */
const BulkUploadButton: React.FC<BulkUploadButtonProps> = ({
    moduleType,
    modalTitle,
    buttonTitle,
    onAdded,
    handleDownloadSampleLink,
    isSubmitDisabled = false,
    ...props
}) => {
    const [isModalopen, setIsModalOpen] = useState(false)
    return (
        <>
            <SecondaryButton
                type={"button" as Any}
                onClick={() => setIsModalOpen(true)}
                buttonTitle={buttonTitle ?? `Bulk Upload`}
                {...props}
            />

            {isModalopen && (
                <BulkUploadModal
                    moduleType={moduleType}
                    onClose={() => {
                        setIsModalOpen(false)
                    }}
                    modalTitle={modalTitle}
                    onAdded={onAdded}
                    handleDownloadSampleLink={handleDownloadSampleLink}
                    isSubmitDisabled={isSubmitDisabled}
                />
            )}
        </>
    )
}

export default BulkUploadButton
