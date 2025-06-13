import { ButtonProps } from "@/types/components/button"
import React from "react"
import { Spinner } from "react-bootstrap"

/**
 * Custom button component with optional spinner for isSubmitting state.
 * @param {ButtonProps} props - Props for the custom button.
 * @returns {JSX.Element} - Custom button element.
 */
const CustomButton: React.FC<ButtonProps> = ({
    buttonTitle,
    customClassName = "",
    type = "button",
    isSubmitting,
    spinnerProps,
    disabled,
    ...props
}) => {
    return (
        <button
            disabled={isSubmitting || disabled}
            className={`btn btn-sm button-3d-effect ${customClassName}`}
            type={type}
            {...props}
        >
            {" "}
            <span className="indicator-label position-relative">
                <span className={isSubmitting ? "opacity-0" : "opacity-1"}>
                    {props.children}
                    {buttonTitle}
                </span>
                <span
                    className={`position-absolute custom-spinner ${
                        isSubmitting ? "d-block" : "d-none"
                    }`}
                >
                    <Spinner size="sm" {...spinnerProps} />
                </span>
            </span>
        </button>
    )
}

export default CustomButton
