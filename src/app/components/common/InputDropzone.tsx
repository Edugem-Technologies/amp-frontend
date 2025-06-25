import { InputUploadDropzone } from "@/types/components/dropzone"
import { CONFIG } from "@/utils/constants"
import { convertBytesToMb } from "@/utils/helpers"
import React, { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { FileRejection, useDropzone } from "react-dropzone"

const InputDropzone: React.FC<InputUploadDropzone> = ({
    type,
    onDrop: onFileDrop,
    onError,
    children,
    disabled,
    innerDivcustomClass = "",
    multiple,
    containerCustomClass = "",
    file,
    fileUrl,
    onFileRemove,
    dimensions,
    ...props
}) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(fileUrl ?? "")
    const [loading, setLoading] = useState(false)
    const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (rejectedFiles.length === 0) {
            if (multiple) {
                onFileDrop(acceptedFiles)
            } else {
                onFileDrop(acceptedFiles[0])
                const reader = new FileReader()
                reader.readAsDataURL(acceptedFiles[0])
                reader.onload = () => {
                    setPreview(reader.result)
                }
                reader.onloadstart = () => {
                    setLoading(true)
                }
                reader.onloadend = () => {
                    setLoading(false)
                }
            }
        } else if (rejectedFiles.length) {
            onError(rejectedFiles[0]?.errors?.[0])
        }
    }
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: type,
        onError,
        disabled,
        multiple,
        ...props,
    })

    const getDropzoneHelperText = () => {
        let text = `Image ${
            dimensions ? `dimensions must be of ${dimensions} ${props.maxSize ? "and" : "."}` : ""
        }`
        if (props.maxSize) {
            const size = convertBytesToMb(props.maxSize)
            text += ` size must be less than or equal to ${size}MB.`
        }
        return text
    }
    useEffect(() => {
        if (!file) {
            setPreview(null)
        }
    }, [file])

    return (
        <>
            <div
                className={` dropzone dz-clickable w-100 p-0 border-0 ${
                    disabled ? "pe-none" : ""
                } ${containerCustomClass}`}
            >
                <div {...getRootProps()} className={`dropzone ${innerDivcustomClass}`}>
                    <input {...getInputProps()} />
                    {loading ? (
                        <Spinner />
                    ) : preview && !Array.isArray(file) && type === CONFIG.FILE_TYPE.IMAGE ? (
                        <div className="d-flex flex-column preview-image-container">
                            <img
                                src={preview as string}
                                alt={typeof file === "object" ? file?.name : "logo"}
                                className="h-auto preview-image mx-auto"
                            />
                            <button
                                className="cross-icon btn btn-sm btn-rounded bg-white"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    onFileRemove && onFileRemove()
                                    setPreview(null)
                                }}
                            >
                                <img src="/icons/cross.svg" alt="cross icon" />
                            </button>
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </div>
            {(dimensions || props.maxSize) && (
                <p className="text-muted m-0">{getDropzoneHelperText()}</p>
            )}
        </>
    )
}

export default InputDropzone
