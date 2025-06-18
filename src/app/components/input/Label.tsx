import { LabelPropsType } from "@/types/components/label"
import { formatTextToTitleCase } from "@/utils/helpers"
import React from "react"

const Label: React.FC<LabelPropsType> = ({
    label,
    labelClass = "",
    isRequired = false,
    isTitleCaseRequired = true,
}) => {
    if (!label?.length) return null
    return (
        <label className={`form-label ${labelClass}`}>
            {isTitleCaseRequired ? formatTextToTitleCase(label) : label}
            {isRequired && <span className="text-danger"> *</span>}
        </label>
    )
}
export default Label
