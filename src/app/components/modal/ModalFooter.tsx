import { ModalFooterPropType } from "@/types/components/ModalFooter"
import PrimaryButton from "../button/PrimaryButton"

const ModalFooter: React.FC<ModalFooterPropType> = ({
    isSubmitting,
    buttonTitle,
    customClassName,
    isSubmitDisabled = false,
}) => {
    return (
        <div className="d-flex justify-content-end form-section mb-0">
            <PrimaryButton
                customClassName={`${customClassName}`}
                buttonTitle={`${buttonTitle ?? "Save & Continue"}`}
                type="submit"
                isSubmitting={isSubmitting}
                disabled={isSubmitting || isSubmitDisabled}
            />
        </div>
    )
}

export default ModalFooter
