"use client"
import { ModalWrapperPropType } from "@/types/components/Modal"
import { Modal } from "react-bootstrap"

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
