import React from "react"
import Icon from "../common/Icon"

const AuthHeader: React.FC<{
    title: string
    children?: React.ReactNode
    handleBackClick?: () => void
}> = ({ title, children, handleBackClick }) => {
    return (
        <div className="d-flex align-items-baseline mb-11 auth-page-header">
            {handleBackClick && (
                <Icon
                    onClick={handleBackClick}
                    iconName="back-arrow"
                    height={30}
                    width={35}
                    className="back-icon cursor-pointer"
                />
            )}

            <h1 className={`font-family-prompt fw-bolder ${children ? "" : "mb-3"} mt-5`}>
                {title}
            </h1>
            {children}
        </div>
    )
}

export default AuthHeader
