import { LabelPropsType } from "@/types/components/label"
import { formatTextToTitleCase } from "@/utils/helpers"
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
