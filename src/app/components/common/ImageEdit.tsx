import { AnyObject } from "@/types/common/Helper"
import { InputUploadDropzone } from "@/types/components/Dropzone"
import { getFileUrl } from "@/utils/Helpers"
import React, { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { FileRejection, useDropzone } from "react-dropzone"
import Icon from "./Icon"

/**
 * ImageEdit component provides an image upload and preview interface using drag-and-drop or file picker.
 *
 * This component supports both single and multiple file uploads, displays a preview of the selected image,
 * and allows users to remove or replace the image. It handles loading states and file validation errors.
 *
 * @component
 * @param {InputUploadDropzone} props - The props for the ImageEdit component.
 * @param {string | string[]} props.type - Accepted file MIME type(s) for upload.
 * @param {function} props.onDrop - Callback invoked when files are dropped or selected. Receives a File or File[].
 * @param {function} props.onError - Callback invoked when a file is rejected. Receives a file error object.
 * @param {boolean} [props.disabled] - If true, disables the dropzone and prevents file selection.
 * @param {string} [props.innerDivcustomClass] - Custom class for the inner dropzone div.
 * @param {boolean} [props.multiple] - If true, allows multiple file selection.
 * @param {string} [props.containerCustomClass] - Custom class for the outer container.
 * @param {File|AnyObject|string|null} [props.file] - The current file or file-like object to preview.
 * @param {function} [props.onFileRemove] - Callback invoked when the remove (cross) button is clicked.
 * @param {...any} props - Additional props passed to the dropzone.
 *
 * @example
 * <ImageEdit
 *   type="image/*"
 *   onDrop={handleDrop}
 *   onError={handleError}
 *   file={selectedFile}
 *   onFileRemove={handleRemove}
 * />
 */
const ImageEdit: React.FC<InputUploadDropzone> = ({
    type,
    onDrop: onFileDrop,
    onError,
    disabled,
    innerDivcustomClass = "",
    multiple,
    containerCustomClass = "",
    file,
    onFileRemove,
    ...props
}) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
    const [loading, setLoading] = useState(false)

    /**
     * Handles file drop or selection events.
     * If files are accepted, updates the preview and calls the onDrop callback.
     * If files are rejected, calls the onError callback with the first error.
     *
     * @param {File[]} acceptedFiles - Array of accepted files.
     * @param {FileRejection[]} rejectedFiles - Array of rejected files with error details.
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

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        accept: type,
        onError,
        disabled,
        multiple,
        ...props,
    })

    /**
     * Sets the image preview from the provided file or resets it if no file is present.
     */
    const setImagePreview = async () => {
        if (file) {
            const fileUrl = await getFileUrl(file as AnyObject)
            setPreview(fileUrl)
        } else {
            setPreview(null)
        }
    }

    useEffect(() => {
        setImagePreview()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file])

    return (
        <>
            <div
                className={` container dropzone-container px-0${
                    disabled ? "pe-none" : ""
                } ${containerCustomClass}`}
            >
                <div
                    {...getRootProps()}
                    className={innerDivcustomClass}
                    onClick={(e) => e.stopPropagation()}
                >
                    <input {...getInputProps()} />
                    <div className={`image-input image-input-outline image-input-empty`}>
                        <div
                            className="image-input-wrapper w-125px h-125px image-preview"
                            style={{
                                backgroundImage: preview ? "none" : "url('/images/blank.svg')",
                            }}
                        >
                            {preview && (
                                <img
                                    src={preview as string}
                                    alt="Uploaded"
                                    className="dropzone-container-image"
                                />
                            )}
                            {loading && (
                                <div className="dropzone-container-spinner">
                                    <Spinner />
                                </div>
                            )}
                            <label
                                className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow dark-hover pencil-btn"
                                onClick={() => !loading && open()}
                            >
                                <Icon iconName="pencil" />
                            </label>
                            {preview && (
                                <label
                                    className={`btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow dark-hover d-flex cross-btn`}
                                    onClick={() => onFileRemove?.()}
                                >
                                    <Icon iconName="cross" height={19} width={19} />
                                </label>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageEdit
