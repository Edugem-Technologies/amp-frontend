import { ModalHeaderProps, ModalProps, ModalTitleProps } from "react-bootstrap"
import { AnyObject } from "../common/helper"

export interface DefaultModalPropType {
    onClose: () => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onAdded?: (asset?: any) => void
    id?: string | null
    defaultData?: AnyObject | null
}

/**
 * Props for the ModalWrapper component.
 *
 * @property {React.ReactNode} children - The content to be rendered inside the modal. This can be any valid React node, such as form elements, text, or other components.
 * @property {"sm" | "lg" | "xl"} [size] - Optional. Controls the size of the modal. Accepts "sm" (small), "lg" (large), or "xl" (extra large). If not provided, the modal uses the default size.
 * @property {string} modalTitle - The title text displayed at the top of the modal. This is typically a short, descriptive string indicating the modal's purpose.
 * @property {() => void} onClose - Callback function invoked when the modal requests to be closed (e.g., when the user clicks the close button or outside the modal).
 * @property {ModalProps} [modalProps] - Optional. Additional props to be passed directly to the underlying react-bootstrap Modal component, allowing further customization (e.g., animation, backdrop).
 * @property {ModalHeaderProps} [modalHeaderProps] - Optional. Additional props for the Modal.Header component, enabling customization of the modal header (e.g., custom class names, styles).
 * @property {ModalTitleProps} [modalTitleProps] - Optional. Additional props for the Modal.Title component, allowing further customization of the modal title (e.g., accessibility attributes).
 *
 * @example
 * <ModalWrapper
 *   modalTitle="Edit User"
 *   onClose={handleClose}
 *   size="lg"
 *   modalProps={{ centered: true }}
 * >
 *   <UserForm />
 * </ModalWrapper>
 */
export interface ModalWrapperPropType {
    children: React.ReactNode
    size?: "sm" | "lg" | "xl"
    modalTitle: string
    onClose: () => void
    modalProps?: ModalProps
    modalHeaderProps?: ModalHeaderProps
    modalTitleProps?: ModalTitleProps
}
