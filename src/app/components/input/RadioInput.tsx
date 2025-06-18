/* eslint-disable react/display-name */
import { forwardRef } from "react"
import ShowFormError from "../common/ShowFormError"
import Label from "./Label"
import { RadioInputPropTypes } from "@/types/components/RadioInput"

const RadioInput = forwardRef<HTMLInputElement, RadioInputPropTypes>(
    (
        {
            inputClassName,
            label,
            isRequired,
            labelClass = "",
            errorMsg,
            containerClassName = "",
            ...props
        },
        ref,
    ) => {
        return (
            <div
                className={`form-check form-switch px-0 d-flex gap-2 align-items-center ${containerClassName}`}
            >
                {!!label?.length && (
                    <Label
                        label={label}
                        labelClass={`mb-0 ${labelClass}`}
                        isRequired={isRequired}
                    />
                )}
                <input
                    className={` custom-radio-input custom-border ${inputClassName || ""}`}
                    ref={ref}
                    {...props}
                    type="radio"
                />
                <ShowFormError message={errorMsg} />
            </div>
        )
    },
)

export default RadioInput
