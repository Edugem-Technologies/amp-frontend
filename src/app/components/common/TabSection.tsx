import React from "react"

/**
 * Component to display a section within a tab like structure.
 *
 * @component
 * @param {React.ReactNode} props.children - The content to be displayed within the tab section.
 * @returns {JSX.Element} The JSX element to render.
 */
const TabSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="show active" id="file-info" role="tabpanel">
            <div className="card mb-5 mb-xl-10">{children}</div>
        </div>
    )
}

export default TabSection
