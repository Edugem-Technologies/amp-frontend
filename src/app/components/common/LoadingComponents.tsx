import { handleError } from "@/utils/handle-error"
import React from "react"
import { Spinner } from "react-bootstrap"

const LoadingComponent: React.FC<{ isLoading?: boolean; error: unknown }> = ({
    isLoading,
    error,
}) => {
    if (isLoading) {
        return <Spinner className="mx-auto d-block" />
    }
    if (error) {
        handleError(error)
    }
    return null
}

export default LoadingComponent
