import React from "react"
import ProgressLine from "./ProgressLine"
import { SubscriptionDataIntf } from "@/types/common/DashboardCardsTypes"

type Props = {
    item: SubscriptionDataIntf
}

const SubscriptionCard: React.FC<Props> = ({ item }) => {
    return (
        <div className="subscription-card">
            <div className="subscription-card__header">
                <div className="logo-container">
                    <img src={item.logo} alt="logo" className="subscription-card__logo" />
                </div>

                <div>
                    <h3 className="card-title">{item.title}</h3>
                    <span className="card-muted-text">Due: {item.dueDate}</span>
                </div>
            </div>

            <div className="subscription-card__progress">
                <p>Progress</p>

                <ProgressLine value={item.progress} color={item.progressColor} height={6} />
            </div>

            <div className="subscription-card__team">
                <p>Team</p>

                <div className="subscription-card__team-members">
                    {item?.team?.map((member) => (
                        <div
                            key={member.id}
                            className="subscription-card__member"
                            title={member.name}
                        >
                            <img src={member.image} alt={member.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SubscriptionCard
