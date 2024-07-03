/* eslint-disable react/display-name */
import { InputFieldProps } from "@/types/components/text-input"
import Image from "next/image"
import { forwardRef, useState } from "react"
import EyeClose from "../../../../public/images/Eye-close.svg"
import Eye from "../../../../public/images/Eye-open.svg"
import ShowFormError from "../common/ShowFormError"

/**
 * Component for a customizable text input field with optional label and error message display.
 *
 * @component
 * @param {string} props.label - The label text for the input field.
 * @param {string} [props.errorMsg] - The error message to display.
 * @param {string} [props.className] - Additional CSS classes for the input field.
 * @param {string} [props.labelClass] - Additional CSS classes for the label.
 * @param {boolean} [props.required=false] - Whether the input field is required, it will show * if required.
 * @param {string} [props.type="text"] - The type of the input field.
 * @param {React.Ref<HTMLInputElement>} ref - The reference for the input field.
 * @returns {JSX.Element} The JSX element to render.
 */
const TextInputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ label, errorMsg, className, labelClass, type, ...props }, ref) => {
        const [inputType, setInputType] = useState(type || "text")
        const toggleInputType = (type: string) => {
            setInputType(type)
        }
        const isRequired = props.required
        // deleting the required property to prevent browser default validation on input fields
        delete props.required
        return (
            <>
                {!!label.length && (
                    <label className={`form-label ${labelClass}`}>
                        {label}
                        {isRequired && <span className="text-danger"> *</span>}
                    </label>
                )}

                <div className="position-relative">
                    <input
                        className={`form-control form-control-solid position-relative ${className}`}
                        ref={ref}
                        {...props}
                        type={inputType}
                    />
                    {type === "password" && (
                        <button
                            className="position-absolute password-eye-icon"
                            type="button"
                            onClick={() =>
                                toggleInputType(inputType === "text" ? "password" : "text")
                            }
                        >
                            {inputType === "password" ? (
                                <Image src={EyeClose} alt="eye icon" width={20} height={20} />
                            ) : (
                                <Image src={Eye} alt="eye close icon" width={20} height={20} />
                            )}
                        </button>
                    )}
                </div>
                <ShowFormError message={errorMsg} />
            </>
        )
    },
)

export default TextInputField
