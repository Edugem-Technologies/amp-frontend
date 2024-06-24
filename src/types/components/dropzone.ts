import { Accept, FileError } from "react-dropzone"

export interface DropzonePropType {
    onDrop: (file: File) => void
    onError: (error: Error | FileError) => void
    type: Accept
    children?: React.ReactNode
    disabled: boolean
    multiple?: boolean
    innerDivcustomClass?: string
    containerCustomClass?: string
}
