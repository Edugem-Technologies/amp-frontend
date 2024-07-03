import { ShowFormErrorPropType } from "@/types/common/show-form-error"
import React from "react"

/**
 * Component to display form error messages.
 *
 * @component
 * @param {string} props.message - The error message to display.
 * @returns {JSX.Element} The JSX element to render.
 */
const ShowFormError: React.FC<ShowFormErrorPropType> = ({ message }) => {
    if (message?.length) {
        return <span className="text-danger">{message}</span>
    }
    return <></>
}

export default ShowFormError
