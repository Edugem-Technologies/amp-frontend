import { InputUploadDropzone } from "@/types/components/dropzone"
import { CONFIG } from "@/utils/constants"
import { convertBytesToMb } from "@/utils/helpers"
import React, { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { FileRejection, useDropzone } from "react-dropzone"

/**
 * InputDropzone component provides a drag-and-drop file upload interface with preview and validation.
 *
 * This component supports both single and multiple file uploads, displays a preview for images,
 * and allows users to remove or replace the uploaded file. It handles loading states, file validation,
 * and displays helper text for dimension and size requirements.
 *
 * @component
 * @param {InputUploadDropzone} props - The props for the InputDropzone component.
 * @param {string | string[]} props.type - Accepted file MIME type(s) for upload.
 * @param {function} props.onDrop - Callback invoked when files are dropped or selected.
 * @param {function} props.onError - Callback invoked when a file fails validation.
 * @param {React.ReactNode} [props.children] - Children to render inside the dropzone when no preview is shown.
 * @param {boolean} [props.disabled] - Whether the dropzone is disabled.
 * @param {string} [props.innerDivcustomClass] - Custom class for the inner dropzone div.
 * @param {boolean} [props.multiple] - Whether multiple files can be uploaded.
 * @param {string} [props.containerCustomClass] - Custom class for the outer container.
 * @param {File | File[] | null} [props.file] - The current file or files.
 * @param {string} [props.fileUrl] - Optional URL for the file preview.
 * @param {function} [props.onFileRemove] - Callback invoked when the file is removed.
 * @param {string} [props.dimensions] - Required image dimensions (e.g., "200x200").
 * @param {...any} props - Additional props passed to the dropzone.
 *
 * @example
 * <InputDropzone
 *   type="image/png"
 *   onDrop={handleFileDrop}
 *   onError={handleFileError}
 *   file={selectedFile}
 *   fileUrl={previewUrl}
 *   onFileRemove={handleRemove}
 *   dimensions="200x200"
 *   maxSize={1048576}
 * />
 */
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

    /**
     * Handles file drop or selection events.
     * Reads the file and sets preview for single file uploads.
     * Calls the provided onDrop and onError callbacks.
     *
     * @param {File[]} acceptedFiles - Array of accepted files.
     * @param {FileRejection[]} rejectedFiles - Array of rejected files.
     */
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

    /**
     * Generates helper text for the dropzone based on dimension and size requirements.
     * @returns {string} Helper text for the dropzone.
     */
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
