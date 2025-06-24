import { formatTextToTitleCase } from "@/utils/helpers"
import React from "react"

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div>
            <h3 className="card-title form-title px-1">
                <span className="card-label fw-bold fs-5 mb-1">{formatTextToTitleCase(title)}</span>
            </h3>
        </div>
    )
}

export default PageTitle
