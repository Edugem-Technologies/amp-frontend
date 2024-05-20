/* eslint-disable react/display-name */
import { InputHTMLAttributes, forwardRef } from "react"
import ShowFormError from "./ShowFormError"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorMsg?: any
    className?: string
    isRequired?: boolean
}

const TextInputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ label, errorMsg, className, isRequired, ...props }, ref) => {
        return (
            <>
                {!!label.length && (
                    <label className="form-label">
                        {label}
                        {isRequired && <span className="text-danger"> *</span>}
                    </label>
                )}
                <input
                    className={`form-control form-control-solid ${className}`}
                    ref={ref}
                    {...props}
                />
                <ShowFormError message={errorMsg} />
            </>
        )
    },
)

export default TextInputField
