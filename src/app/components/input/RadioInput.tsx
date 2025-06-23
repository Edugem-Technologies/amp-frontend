/* eslint-disable react/display-name */
import { forwardRef } from "react"
import ShowFormError from "../common/ShowFormError"
import Label from "./Label"
import { RadioInputPropTypes } from "@/types/components/RadioInput"

const RadioInput = forwardRef<HTMLInputElement, RadioInputPropTypes>(
    (
        { inputClassName, label, isRequired, errorMsg, containerClassName = "", id, ...props },
        ref,
    ) => {
        return (
            <>
                {!!label?.length && (
                    <Label
                        label={label}
                        labelClass={`mb-0 cursor-pointer form-check form-switch d-flex gap-2 align-items-center ${containerClassName}`}
                        isRequired={isRequired}
                        htmlFor={id}
                        renderInput={() => (
                            <>
                                <input
                                    className={` custom-radio-input custom-border cursor-pointer ${
                                        inputClassName || ""
                                    }`}
                                    ref={ref}
                                    id={id}
                                    {...props}
                                    type="radio"
                                />
                                <ShowFormError message={errorMsg} />
                            </>
                        )}
                    />
                )}
            </>
        )
    },
)

export default RadioInput
