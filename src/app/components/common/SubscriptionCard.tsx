import React from "react"
import { SubscriptionDataIntf } from "@/types/common/DashboardCardsTypes"
import Link from "next/link"

type Props = {
    item: SubscriptionDataIntf
}

const SubscriptionCard: React.FC<Props> = ({ item }) => {
    return (
        <div className="card card-xl-stretch mb-xl-8">
            <div className="card-body">
                <div className="d-flex flex-stack">
                    <div className="d-flex align-items-center">
                        <div className="symbol symbol-60px me-5">
                            <span className="symbol-label bg-light-primary">
                                <img
                                    src={item.logo}
                                    alt="logo"
                                    className="h-50 align-self-center"
                                />
                            </span>
                        </div>
                        <div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
                            <Link href="#" className="text-dark fw-bolder text-hover-primary fs-5">
                                {item.title}
                            </Link>
                            <span className="text-muted fw-bold">Due: {item.dueDate}</span>
                        </div>
                        <div className="ms-1"></div>
                    </div>
                </div>
                <div className="d-flex flex-column w-100 mt-12">
                    <span className="text-dark me-2 fw-bolder pb-3"></span>
                    <div className="progress h-5px w-100">
                        <div
                            className="progress-bar bg-danger"
                            style={{ width: `${item.progress}%` }}
                        ></div>
                    </div>
                </div>
                <div className="d-flex flex-column mt-10">
                    <div className="text-dark me-2 fw-bolder pb-4">Team</div>
                    <div className="d-flex">
                        {item?.team?.map((member, index) => (
                            <Link href="#" className="symbol symbol-35px me-2" key={index}>
                                <img src={member.image} alt={member.name} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* <ProgressLine value={item.progress} color={item.progressColor} height={6} /> */}
        </div>
    )
}

export default SubscriptionCard
