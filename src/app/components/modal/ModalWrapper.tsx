"use client"
import { ModalWrapperPropType } from "@/types/components/Modal"
import { Modal } from "react-bootstrap"

/**
 * ModalWrapper is a reusable modal component built on top of react-bootstrap's Modal.
 * It provides a consistent modal structure with customizable header, title, and body content.
 *
 * @component
 * @param {object} props - The props for ModalWrapper.
 * @param {React.ReactNode} props.children - The content to display inside the modal body.
 * @param {'sm' | 'lg' | 'xl' | undefined} [props.size] - The size of the modal (small, large, extra large, or default).
 * @param {React.ReactNode} [props.modalTitle] - The title to display in the modal header.
 * @param {() => void} props.onClose - Callback function invoked when the modal is requested to be closed.
 * @param {object} [props.modalProps] - Additional props to pass to the react-bootstrap Modal component.
 * @param {object} [props.modalHeaderProps] - Additional props to pass to the Modal.Header component.
 * @param {object} [props.modalTitleProps] - Additional props to pass to the Modal.Title component.
 *
 * @example
 * <ModalWrapper
 *   size="lg"
 *   modalTitle="My Modal"
 *   onClose={() => setShow(false)}
 * >
 *   <div>Modal Content</div>
 * </ModalWrapper>
 */
const ModalWrapper: React.FC<ModalWrapperPropType> = ({
    children,
    size,
    modalTitle,
    onClose,
    modalProps,
    modalHeaderProps,
    modalTitleProps,
}) => {
    return (
        <Modal show size={size} onHide={onClose} backdrop="static" {...modalProps}>
            <Modal.Header closeButton {...modalHeaderProps}>
                <Modal.Title className="form-title" {...modalTitleProps}>
                    {modalTitle}
                </Modal.Title>
            </Modal.Header>
            <div className="modal-body p-0">{children}</div>
        </Modal>
    )
}

export default ModalWrapper
