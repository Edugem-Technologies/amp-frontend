import React from "react"
import SecondaryButton from "./SecondaryButton"
import { ButtonProps } from "@/types/components/button"

const EditButton: React.FC<ButtonProps> = ({
    buttonTitle,
    customClassName = "",
    isSubmitting,
    ...props
}) => {
    return (
        <SecondaryButton
            isSubmitting={isSubmitting}
            customClassName={`${customClassName}`}
            buttonTitle={buttonTitle}
            {...props}
        />
    )
}

export default EditButton
