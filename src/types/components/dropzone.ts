import { Accept, FileRejection } from "react-dropzone"
/**
 * Props for the Dropzone component.
 */
export interface DropzonePropType {
    /**
     * Function to handle the file drop event.
     * @param {File} file - The dropped file.
     */
    onDrop: (file: File | File[]) => void

    /**
     * Function to handle errors during the drop event.
     * @param {FileRejection[]} error - The error object.
     */
    onError: (error: FileRejection[]) => void

    /**
     * Accepted file types for the dropzone.
     */
    type: Accept

    /**
     * Children nodes to be rendered inside the dropzone.
     */
    children?: React.ReactNode

    /**
     * Whether the dropzone is disabled.
     */
    disabled: boolean

    /**
     * Whether multiple files can be dropped.
     */
    multiple?: boolean

    /**
     * Custom CSS class for the inner div element.
     */
    innerDivcustomClass?: string

    /**
     * Custom CSS class for the container element.
     */
    containerCustomClass?: string
}
