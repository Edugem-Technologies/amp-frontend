/* eslint-disable react/display-name */
import { ToggleSwitchInputPropTypes } from "@/types/components/ToggleSwitchInput"
import { forwardRef } from "react"
import ShowFormError from "../common/ShowFormError"
import Label from "./Label"

const ToggleSwitchInput = forwardRef<HTMLInputElement, ToggleSwitchInputPropTypes>(
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
                    className={`form-check-input toggle-input custom-border ${
                        inputClassName || ""
                    }`}
                    ref={ref}
                    {...props}
                    type="checkbox"
                />
                <ShowFormError message={errorMsg} />
            </div>
        )
    },
)

export default ToggleSwitchInput
