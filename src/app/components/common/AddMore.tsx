import { AddMorePropTypes } from "@/types/components/addMore"
import React from "react"

const AddMore: React.FC<AddMorePropTypes> = ({
    index,
    fieldLength,
    handleOnClick,
    handleOnRemove,
    sectionCustomClass = "",
}) => {
    return (
        <div
            className={`d-flex gap-3 col-md-3 align-items-center add-more-section mb-auto ${sectionCustomClass}`}
        >
            {index === fieldLength - 1 && (
                <span onClick={handleOnClick} className="add-more-fields">
                    +Add More
                </span>
            )}
            {fieldLength !== 1 && (
                <span onClick={handleOnRemove} className="remove-fields">
                    Remove
                </span>
            )}
        </div>
    )
}

export default AddMore
