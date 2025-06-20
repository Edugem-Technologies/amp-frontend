import { ActionColumnProps } from "@/types/common/ActionColumn"
import React from "react"
import PrimaryButton from "../button/PrimaryButton"
import EditButton from "../button/EditButton"

const ActionColumn: React.FC<ActionColumnProps> = ({
    handleEdit,
    buttonName,
    handleDownload,
    isDownloading,
    isEditDisable = false,
}) => {
    return (
        <div className="d-flex gap-2">
            {handleEdit && (
                <EditButton
                    disabled={isEditDisable}
                    onClick={handleEdit}
                    buttonTitle={`Edit ${buttonName ?? ""}`}
                    type="button"
                />
            )}
            {handleDownload && (
                <PrimaryButton
                    isSubmitting={isDownloading}
                    onClick={handleDownload}
                    buttonTitle={`Download ${buttonName ?? ""}`}
                    type="button"
                />
            )}
        </div>
    )
}

export default ActionColumn
