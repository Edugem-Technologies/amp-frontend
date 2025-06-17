/* eslint-disable react/display-name */
import { InputFieldProps } from "@/types/components/textInput"
import Image from "next/image"
import { forwardRef, useState } from "react"
import EyeClose from "../../../../public/images/Eye-close.svg"
import Eye from "../../../../public/images/Eye-open.svg"
import ShowFormError from "../common/ShowFormError"
import Label from "./Label"

const TextInputField = forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            label,
            errorMsg,
            inputFieldClassName,
            labelClass,
            type,
            postInputText,
            inputContainerClass = "",
            preInputText,
            isRequired = false,
            isTitleCaseRequired = true,
            ...props
        },
        ref,
    ) => {
        const [inputType, setInputType] = useState(type || "text")
        const toggleInputType = (type: string) => {
            setInputType(type)
        }
        return (
            <>
                {!!label?.length && (
                    <Label
                        label={label}
                        labelClass={labelClass}
                        isRequired={isRequired}
                        isTitleCaseRequired={isTitleCaseRequired}
                    />
                )}
                <div className={`position-relative ${inputContainerClass} `}>
                    {preInputText && (
                        <span className="input-group-text custom-border border-radius-10px">
                            {preInputText}
                        </span>
                    )}
                    <input
                        ref={ref}
                        {...props}
                        className={`form-control form-control-solid position-relative custom-border border-radius-10px ${inputFieldClassName}`}
                        type={inputType}
                    />
                    {postInputText && (
                        <span className="input-group-text custom-border border-radius-10px">
                            {postInputText}
                        </span>
                    )}
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
