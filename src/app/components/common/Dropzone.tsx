import { DropzonePropType } from "@/types/components/dropzone"
import React from "react"
import { FileRejection, useDropzone } from "react-dropzone"

/**
 * Dropzone component for handling file uploads.
 *
 * @param {DropzonePropType} props - The props for the Dropzone component.
 * @returns {JSX.Element} The rendered Dropzone component.
 */

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
    /**
     * Handles the drop event, processing accepted and rejected files.
     *
     * @param {File[]} acceptedFiles - The files that were accepted.
     * @param {FileRejection[]} rejectedFiles - The files that were rejected.
     */
    const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (props.multiple) {
            if (rejectedFiles.length) {
                onError(rejectedFiles)
            } else {
                onFileDrop(acceptedFiles)
            }
        } else {
            if (rejectedFiles.length) {
                onError(rejectedFiles)
            } else {
                onFileDrop(acceptedFiles[0])
            }
        }
    }
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: type,
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
