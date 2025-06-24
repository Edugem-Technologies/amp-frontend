import { ModalHeaderProps, ModalProps, ModalTitleProps } from "react-bootstrap"
import { AnyObject } from "../common/helper"

export interface DefaultModalPropType {
    onClose: () => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onAdded?: (asset?: any) => void
    id?: string | null
    defaultData?: AnyObject | null
}

export interface ModalWrapperPropType {
    children: React.ReactNode
    size?: "sm" | "lg" | "xl"
    modalTitle: string
    onClose: () => void
    modalProps?: ModalProps
    modalHeaderProps?: ModalHeaderProps
    modalTitleProps?: ModalTitleProps
}
