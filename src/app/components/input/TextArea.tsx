/* eslint-disable react/display-name */
import { TextAreaFieldProps } from "@/types/components/textInput"
import { forwardRef } from "react"
import ShowFormError from "../common/ShowFormError"
import Label from "./Label"

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
    (
        { label, errorMsg, className, maxChars, currentChars, isRequired, labelClass, ...props },
        ref,
    ) => {
        return (
            <>
                {!!label?.length && (
                    <Label label={label} labelClass={labelClass} isRequired={isRequired} />
                )}
                <textarea
                    className={`form-control form-control-solid ${className}`}
                    ref={ref}
                    {...props}
                />
                <div className="d-flex justify-content-between">
                    <div className="mr-auto pe-3">
                        <ShowFormError message={errorMsg} />
                    </div>
                    {maxChars && (
                        <div
                            className={`char-count ${
                                (currentChars as number) > maxChars ? "text-danger" : ""
                            }`}
                        >
                            {currentChars} / {maxChars} characters
                        </div>
                    )}
                </div>
            </>
        )
    },
)

export default TextAreaField
