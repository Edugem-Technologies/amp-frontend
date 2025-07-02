import React from "react"
import { Accept, DropzoneOptions, FileError } from "react-dropzone"

/**
 * Base interface for the InputUploadDropzone component.
 */
export interface InputUploadDropzoneBase extends Omit<DropzoneOptions, "onDrop"> {
    /**
     * Function to handle errors.
     * @param {Error | FileError} error - The error encountered during the upload process.
     */
    onError: (error: Error | FileError) => void

    /**
     * The type of files accepted by the dropzone.
     */
    type: Accept

    /**
     * The children elements to be rendered inside the dropzone.
     */
    children?: React.ReactNode

    /**
     * Boolean indicating whether the dropzone is disabled.
     */
    disabled?: boolean

    /**
     * Custom class for the inner div element.
     */
    innerDivcustomClass?: string

    /**
     * Custom class for the container element.
     */
    containerCustomClass?: string
    /**
     * File url to show image preview.
     */
    fileUrl?: string | null

    /**
     * Function to handle remove event.
     */
    onFileRemove?: () => void
    /**
     * Image dimensions that will be visible below the dropzone
     */
    dimensions?: string
}

/**
 * Interface for the InputUploadDropzone component when multiple files are allowed.
 */
export interface InputUploadDropzoneMultiple extends InputUploadDropzoneBase {
    /**
     * Boolean indicating whether multiple files are allowed.
     */
    multiple: true

    /**
     * Function to handle the dropped files.
     * @param {File[]} file - The array of files dropped.
     */
    onDrop: (file: File[]) => void

    /**
     * File.
     */
    file?: File[] | null
}

/**
 * Interface for the InputUploadDropzone component when a single file is allowed.
 */
export interface InputUploadDropzoneSingle extends InputUploadDropzoneBase {
    /**
     * Boolean indicating whether multiple files are allowed.
     */
    multiple?: false

    /**
     * Function to handle the dropped file.
     * @param {File} file - The file dropped.
     */
    onDrop: (file: File) => void

    /**
     * File.
     */
    file?: File | null | string
}

/**
 * Type for the InputUploadDropzone component, which can be either single or multiple files.
 */
export type InputUploadDropzone = InputUploadDropzoneMultiple | InputUploadDropzoneSingle
