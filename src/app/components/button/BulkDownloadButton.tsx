import { useAppContext } from "@/app/context/AppContext"
import { FetchHelper } from "@/services/FetchHelper"
import { Any } from "@/types/common/Helper"
import { BulkDownloadButtonProps } from "@/types/components/Button"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/Constants"
import { handleError } from "@/utils/HandleError"
import { showSweetAlert } from "@/utils/Helpers"
import { useState } from "react"
import PrimaryButton from "./PrimaryButton"

/**
 * BulkDownloadButton component renders a button that triggers a bulk download operation for a given module.
 *
 * When clicked, it sends a GET request to the backend API to initiate a bulk download based on the current filter state,
 * excluding pagination parameters. On success, it displays a success alert with the response message.
 * Handles loading state and error reporting.
 *
 * @component
 * @param {BulkDownloadButtonProps} props - The props for the BulkDownloadButton component.
 * @param {string} props.moduleType - The type of module for which the bulk download is performed.
 * @param {string} [props.buttonTitle] - Optional title for the download button (defaults to "Download").
 * @param {...Any} [props] - Additional props passed to the PrimaryButton.
 *
 * @example
 * <BulkDownloadButton
 *   moduleType="user"
 *   buttonTitle="Download Users"
 * />
 */
const BulkDownloadButton: React.FC<BulkDownloadButtonProps> = ({
    moduleType,
    buttonTitle,
    ...props
}) => {
    const { filterState } = useAppContext()
    const [loading, setLoading] = useState(false)

    /**
     * Handles the download action by calling the bulk download API endpoint.
     * Removes pagination parameters from the filter state before making the request.
     * Shows a success alert on successful response, and handles errors gracefully.
     *
     * @async
     * @function handleDownload
     */
    const handleDownload = async () => {
        try {
            setLoading(true)
            const updatedFilterState = {
                ...filterState,
            }
            delete updatedFilterState["page"]
            delete updatedFilterState["limit"]
            const response = await FetchHelper.get(CONFIG.API_ENDPOINTS.BULK_DOWNLOAD, {
                module_type: moduleType,
                ...updatedFilterState,
            })
            if (response?.status) {
                showSweetAlert({
                    icon: ALERT_ICON_TYPE.success,
                    text: response?.message,
                })
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <PrimaryButton
                onClick={handleDownload}
                type={"button" as Any}
                buttonTitle={buttonTitle ?? `Download`}
                isSubmitting={loading}
                {...props}
            />
        </>
    )
}

export default BulkDownloadButton
