import { InputUploadDropzone } from "@/types/components/dropzone"
import React, { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { FileRejection, useDropzone } from "react-dropzone"
import Icon from "./Icon"
import { getFileUrl } from "@/utils/helpers"
import { AnyObject } from "@/types/common/helper"

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
