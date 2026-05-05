import { LabelPropsType } from "@/types/components/Label"
import { formatTextToTitleCase } from "@/utils/Helpers"
import React from "react"

const Label: React.FC<LabelPropsType> = ({
    label,
    labelClass = "",
    isRequired = false,
    isTitleCaseRequired = true,
    renderInput,
    ...props
}) => {
    if (!label?.length) return null
    return (
        <label className={`form-label ${labelClass}`} {...props}>
            {isTitleCaseRequired ? formatTextToTitleCase(label) : label}
            {isRequired && <span className="text-danger"> *</span>}
            {renderInput && renderInput()}
        </label>
    )
}
export default Label
