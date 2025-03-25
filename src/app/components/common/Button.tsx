import React from "react"
import { Spinner, SpinnerProps } from "react-bootstrap"

export interface ButtonPropType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean
    title: string
    loadingText?: string
    spinnerProps?: Pick<SpinnerProps, "size" | "variant" | "animation">
}

const Button: React.FC<ButtonPropType> = ({ loading = false, title, spinnerProps, ...props }) => {
    return (
        <button
            type="submit"
            className="btn btn-primary custom-button-height"
            disabled={loading}
            {...props}
        >
            <span className="indicator-label position-relative">
                <span className={loading ? "opacity-0" : "opacity-1"}>
                    {props.children}
                    {title}
                </span>
                <span
                    className={`position-absolute custom-spinner ${loading ? "d-block" : "d-none"}`}
                >
                    <Spinner size="sm" {...spinnerProps} />
                </span>
            </span>
        </button>
    )
}

export default Button
