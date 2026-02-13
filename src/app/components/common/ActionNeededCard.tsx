"use client"

import ApexRadialProgress from "../apex-charts/ApexRadialProgress"

type Props = {
    percentage: number
    color: string
    strokeWidth?: number
    buttonColor?: string
}

const ActionNeededCard = ({ percentage, color, strokeWidth = 12, buttonColor }: Props) => {
    return (
        <div className="action-card common-cards">
            <div className="card-header-wrapper">
                <div>
                    <h3 className="card-title">Action Needed</h3>
                    <p className="card-muted-text">Complete your profile setup</p>
                </div>
            </div>

            <div className="action-card__chart">
                <ApexRadialProgress value={percentage} color={color} strokeWidth={strokeWidth} />
            </div>

            <div className="action-card__notes">
                <span className="badge">Notes:</span>
                <p>Current sprint requires stakeholders to approve newly amended policies</p>
            </div>

            <button
                className="action-card__button"
                style={{ backgroundColor: buttonColor || color }}
            >
                Take Action
            </button>
        </div>
    )
}

export default ActionNeededCard
