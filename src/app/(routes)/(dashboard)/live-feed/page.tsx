"use client"

import React from "react"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { activityFixture } from "@/fixtures/LiveFeedData"

const Page = () => {
    return (
        <div className="activity">
            {activityFixture.map((item) => (
                <div key={item.id} className="activity__row">
                    <div className="activity__left">
                        <div className="activity__avatar">
                            {item.user.avatar ? (
                                <img src={item.user.avatar} alt={item.user.name} />
                            ) : (
                                <span>{item.user.initials}</span>
                            )}
                        </div>

                        <div className="activity__content">
                            <div className="activity__title">{item.title}</div>

                            <div className="activity__desc">
                                {item.description} ({item.timeAgo})
                            </div>
                        </div>
                    </div>

                    <span className="activity__status">{item.status}</span>
                    <div className="activity__right">
                        <VisibilityIcon className="activity__viewIcon" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Page
