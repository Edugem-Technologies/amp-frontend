"use client"

import React from "react"
import { activityFixture } from "@/fixtures/LiveFeedData"
import Link from "next/link"

const Page = () => {
    return (
        <div className="content d-flex flex-column flex-column-fluid">
            <div className="post d-flex flex-column-fluid">
                <div className="container-fluid pages live-feed">
                    <div className="g-5 gx-xxl-8">
                        <div className="roadmaps list feed">
                            {activityFixture.map((item, index) => (
                                <div key={index} className="item">
                                    <div className="col-auto p-symbols">
                                        <div className="symbol-group symbol-hover d-inline-flex flex-nowrap pe-1">
                                            <div className="symbol symbol-circle symbol-40px">
                                                {item.user.avatar ? (
                                                    <img
                                                        src={item.user.avatar}
                                                        alt={item.user.name}
                                                    />
                                                ) : (
                                                    <span>{item.user.initials}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="fw-bolder t-title">{item.title}</div>
                                        <div className="fw-bold t-timings">
                                            {item.description} ({item.timeAgo})
                                        </div>
                                    </div>
                                    <div className="col-auto pills buttons-grid gg-3">
                                        <div className="badge badge-light">{item.status}</div>
                                    </div>
                                    <div className="col actions">
                                        <Link href="" className="btn btn-icon btn-sm view">
                                            <span className="material-icons">remove_red_eye</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
