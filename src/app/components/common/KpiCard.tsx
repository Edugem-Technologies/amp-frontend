import Image from "next/image"
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
    amount?: number | string
    description?: string
    icon?: ReactNode
    iconPlacement?: IconPlacement
    progress?: number
    showProgress?: boolean
    backgroundColor?: string
    backgroundImage?: BackgroundImageConfig
    className?: string
    cardId?: number
    avatarSrc?: string
    quantity?: string
    fontColor?: string
}

const KpiCard: React.FC<KpiCardProps> = ({
    title,
    amount,
    description,
    icon,
    iconPlacement = "left",
    progress,
    showProgress = false,
    backgroundColor = "#ffffff",
    backgroundImage,
    className = "",
    cardId,
    avatarSrc,
    quantity,
    fontColor,
}) => {
    return (
        <div
            className={`kpi-card-wrapper-${cardId} ${className} icon-${iconPlacement} ${
                showProgress ? "has-progress" : ""
            }`}
            style={{ backgroundColor }}
        >
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

            <div className="kpi-card-content-wrapper">
                {icon && iconPlacement === "top" && <div className="kpi-icon-top">{icon}</div>}

                <div
                    className={`kpi-card-content d-flex flex-column icon-placement-${iconPlacement}`}
                    style={{ gap: "5px" }}
                >
                    {icon && iconPlacement === "left" && (
                        <div className="kpi-icon-left">{icon}</div>
                    )}

                    <div className="title">{title}</div>
                    <div className="amount">
                        {amount}
                        {quantity && <span className="kpi-quantity">{quantity}</span>}
                    </div>
                    {description && <div className="total">{description}</div>}

                    {icon && iconPlacement === "right" && (
                        <div className="kpi-icon-right">{icon}</div>
                    )}
                </div>
                {avatarSrc && (
                    <div className="user-avatar">
                        <Image src={avatarSrc} height={100} width={100} alt="user-avatar" />
                    </div>
                )}
            </div>

            {showProgress && typeof progress === "number" && (
                <div className="kpi-progress-bar-wrapper">
                    <div
                        className="kpi-progress-fill"
                        style={{ width: `${progress * 100}%`, backgroundColor: fontColor }}
                    />
                </div>
            )}
        </div>
    )
}

export default KpiCard
