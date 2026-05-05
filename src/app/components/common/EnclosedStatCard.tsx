import { IconMap, IconName } from "../icons/IconMap"

type StatCardProps = {
    title: string
    value: string
    icon: IconName
    bgColor: string
    textColor: string
    svgBtnClass?: string
}

const EnclosedStatCard = ({ title, icon, bgColor, textColor, svgBtnClass }: StatCardProps) => {
    return (
        <div className="stat-card" style={{ backgroundColor: bgColor }}>
            <div className="stat-card__icon">
                <span className={`svg-icon svg-icon-3x ${svgBtnClass} `}>
                    {IconMap[icon as keyof typeof IconMap]}
                </span>
            </div>

            <div className="stat-card__content">
                <p className="stat-card__title" style={{ color: textColor }}>
                    {title}
                </p>
            </div>
        </div>
    )
}

export default EnclosedStatCard
