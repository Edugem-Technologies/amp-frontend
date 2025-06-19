"use client"
import { FetchHelper } from "@/services/fetch-helper"
import { Any, AnyObject } from "@/types/common/helper"
import { SendOTPProps } from "@/types/components/button"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { removeUnderscoreFromLabel, showSweetAlert } from "@/utils/helpers"
import React, { useState } from "react"
import PrimaryButton from "./PrimaryButton"

/**
 * SendOTP is a reusable button component for sending One-Time Password (OTP) requests.
 *
 * This component validates the provided payload using an optional Zod schema before sending
 * a POST request to the specified OTP endpoint. If validation fails, it displays the first
 * error message for each unique field using a sweet alert. On successful validation and
 * request, it shows a success message. The button displays a loading state while the request
 * is in progress.
 *
 * @component
 * @param {Object} props - The props for SendOTP.
 * @param {Object} props.payload - The data to be sent in the OTP request.
 * @param {ZodSchema} [props.schema] - Optional Zod schema for validating the payload.
 * @param {string} props.endpoint - The endpoint to which the OTP request is sent (appended to BASE_OTP_SEND).
 * @param {...any} props - Additional props passed to the PrimaryButton component.
 * @returns {JSX.Element} The rendered SendOTP button.
 */
const SendOTP: React.FC<SendOTPProps> = ({ payload, schema, endpoint, ...props }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    /**
     * Handles sending the OTP (One-Time Password) request.
     *
     * This function performs the following steps:
     * 1. If a validation schema is provided, it validates the payload using the schema's `safeParseAsync` method.
     *    - If validation fails, it collects the first error message for each unique path,
     *      formats them, and displays them using a sweet alert with an error icon.
     *    - If validation succeeds, it updates the payload with the parsed data.
     * 2. Sets the submitting state to true to indicate the request is in progress.
     * 3. Constructs the OTP send URL using the base endpoint and the provided endpoint.
     * 4. Sends a POST request to the constructed URL with the payload.
     *    - If the response indicates success, it displays a sweet alert with a success icon and the response message.
     * 5. Handles any errors by logging and passing them to the error handler.
     * 6. Finally, resets the submitting state to false.
     *
     * @async
     * @function handleSendOTP
     * @returns {Promise<void>}
     */
    const handleSendOTP = async () => {
        try {
            if (schema) {
                const result: Any = await schema.safeParseAsync(payload)
                if (!result.success) {
                    // Filter issues to only keep the first error per unique path (by joining path with "_")
                    const seenPaths = new Set<string>()
                    // Filter out duplicate error messages by unique path
                    const errorMessage = result.error?.issues
                        ?.filter((issue: AnyObject) => {
                            const pathKey = issue.path.join("_")
                            if (seenPaths.has(pathKey)) return false
                            seenPaths.add(pathKey)
                            return true
                        })
                        // Map each issue to a formatted error string with the field label and message
                        .map(
                            (issue: AnyObject) =>
                                `${removeUnderscoreFromLabel(issue.path[0] as string)}: ${
                                    issue.message
                                }`,
                        )
                    showSweetAlert({
                        text: errorMessage.join("\n"),
                        icon: ALERT_ICON_TYPE.error,
                    })
                    return
                } else {
                    // If validation succeeds, update the payload with the parsed data
                    payload = result?.data
                }
            }
            setIsSubmitting(true)
            const url = new URL(`${CONFIG.API_ENDPOINTS.BASE_OTP_SEND}/${endpoint}`)
            const response = await FetchHelper.post(url, payload)
            if (response?.status) {
                showSweetAlert({
                    text: response.message,
                    icon: ALERT_ICON_TYPE.success,
                })
            }
        } catch (error) {
            handleError(error)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <PrimaryButton
            customClassName="mt-2"
            buttonTitle="Send OTP"
            type="button"
            {...props}
            onClick={handleSendOTP}
            isSubmitting={isSubmitting}
        />
    )
}

export default SendOTP
