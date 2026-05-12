"use client"

import Link from "next/link"
import ApexRadialProgress from "../apex-charts/ApexRadialProgress"

type Props = {
    percentage: number
    color: string
    strokeWidth?: number
    buttonColor?: string
}

const ActionNeededCard = ({ percentage, color, strokeWidth = 12 }: Props) => {
    return (
        <div className="card card-xl-stretch mb-xl-8">
            <div className="card-header border-0 py-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder fs-3 mb-1">Action Needed</span>
                    <span className="text-muted fw-bold fs-7">Complete your profile setup</span>
                </h3>
                <div className="card-toolbar"></div>
            </div>
            <div className="card-body d-flex flex-column">
                <div className="flex-grow-1">
                    <div className="mixed-widget-4-chart">
                        <ApexRadialProgress
                            value={percentage}
                            color={color}
                            strokeWidth={strokeWidth}
                        />
                        <div className="resize-triggers"></div>
                    </div>
                </div>

                <div className="pt-5">
                    <p className="text-center fs-6 pb-5">
                        <span className="badge badge-light-danger fs-8">Notes:</span>
                        Current sprint requires stakeholders
                        <br></br>
                        to approve newly amended policies
                    </p>
                    <Link href="#" className="btn btn-primary  w-100 py-3">
                        Take Action
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ActionNeededCard
