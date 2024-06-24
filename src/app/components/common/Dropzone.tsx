import { DropzonePropType } from "@/types/components/dropzone"
import React from "react"
import { FileRejection, useDropzone } from "react-dropzone"

const Dropzone: React.FC<DropzonePropType> = ({
    type,
    onDrop: onFileDrop,
    onError,
    children,
    disabled,
    innerDivcustomClass = "",
    containerCustomClass = "h-100",
    ...props
}) => {
    const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (rejectedFiles.length === 0) {
            onFileDrop(acceptedFiles[0])
        } else if (rejectedFiles.length) {
            onError(rejectedFiles[0]?.errors?.[0])
        }
    }
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: type,
        onError,
        disabled,
        ...props,
    })

    return (
        <div
            className={` dropzone dz-clickable w-100 p-0 border-0 ${
                disabled ? "pe-none" : ""
            } ${containerCustomClass}`}
        >
            <div {...getRootProps()} className={`dropzone ${innerDivcustomClass}`}>
                <input {...getInputProps()} />
                {children}
            </div>
        </div>
    )
}

export default Dropzone
