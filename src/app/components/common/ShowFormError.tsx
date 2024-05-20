import { ShowFormErrorPropType } from "@/types/common/show-form-error"
import React from "react"

const ShowFormError: React.FC<ShowFormErrorPropType> = ({ message }) => {
    if (message?.length) {
        return <span className="text-danger">{message}</span>
    }
    return <></>
}

export default ShowFormError
