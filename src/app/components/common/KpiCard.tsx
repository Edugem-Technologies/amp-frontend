import React, { ReactNode } from "react"

export type IconPlacement = "left" | "right" | "top"

export type BackgroundImageConfig = {
    src: string
    overlayColor?: string
    overlayOpacity?: number
    position?: string
    size?: string
}

export type KpiCardProps = {
    title: string
    amount: string | number
    description?: string

    icon?: ReactNode
    iconPlacement?: IconPlacement

    progress?: number // 0 to 1
    showProgress?: boolean

    backgroundColor?: string
    backgroundImage?: BackgroundImageConfig

    className?: string
}

const KpiCard: React.FC<KpiCardProps> = ({
    title,
    amount,
    description,
    icon,
    iconPlacement = "left",
    progress,
    showProgress = false,
    backgroundColor = "#fff",
    backgroundImage,
    className = "",
}) => {
    return (
        <div
            className={`kpi-card-wrapper ${className} icon-${iconPlacement} ${
                showProgress ? "has-progress" : ""
            }`}
            style={{ backgroundColor }}
        >
            {/* BACKGROUND IMAGE */}
            {backgroundImage && (
                <div
                    className="kpi-card-bg"
                    style={{
                        backgroundImage: `url(${backgroundImage.src})`,
                        backgroundSize: backgroundImage.size || "cover",
                        backgroundPosition: backgroundImage.position || "center",
                    }}
                >
                    {backgroundImage.overlayColor && (
                        <div
                            className="kpi-card-bg-overlay"
                            style={{
                                backgroundColor: backgroundImage.overlayColor,
                                opacity: backgroundImage.overlayOpacity ?? 0.5,
                            }}
                        />
                    )}
                </div>
            )}

            {/* CONTENT */}
            <div className="kpi-card-content-wrapper">
                {icon && iconPlacement === "top" && <div className="kpi-icon-top">{icon}</div>}

                <div className={`kpi-card-content icon-placement-${iconPlacement}`}>
                    {icon && iconPlacement === "left" && (
                        <div className="kpi-icon-left">{icon}</div>
                    )}

                    <div className="kpi-text">
                        <h4 className="kpi-title">{title}</h4>
                        <h2 className="kpi-amount mb-0">{amount}</h2>
                        {description && <p className="kpi-description mb-0">{description}</p>}
                    </div>

                    {icon && iconPlacement === "right" && (
                        <div className="kpi-icon-right">{icon}</div>
                    )}
                </div>
            </div>

            {/* PROGRESS BAR - bottom */}
            {showProgress && typeof progress === "number" && (
                <div className="kpi-progress-bar-wrapper">
                    <div className="kpi-progress-fill" style={{ width: `${progress * 100}%` }} />
                </div>
            )}
        </div>
    )
}

export default KpiCard
