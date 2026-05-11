import React from "react"

const HoveredIcons = () => {
    return (
        <div className="icons">
            <a
                href="javascript:void(0)"
                className="btn btn-icon btn-sm delete"
                data-bs-toggle="tooltip"
                title=""
                data-bs-original-title="Delete"
            >
                <span className="material-symbols-rounded">delete</span>
            </a>
            <a
                href="javascript:void(0)"
                className="btn btn-icon btn-sm favorite"
                data-bs-toggle="tooltip"
                title=""
                data-bs-original-title="Favourite"
            >
                <span className="material-symbols-rounded">star</span>
            </a>
            <a
                href="javascript:void(0)"
                className="btn btn-icon btn-sm request"
                data-bs-toggle="tooltip"
                title=""
                data-bs-original-title="Request"
            >
                <span className="material-symbols-rounded">bolt</span>
            </a>
            <a
                href="javascript:void(0)"
                className="btn btn-icon btn-sm complete"
                data-bs-toggle="tooltip"
                title=""
                data-bs-original-title="Complete"
            >
                <span className="material-symbols-rounded">check</span>
            </a>
        </div>
    )
}

export default HoveredIcons
