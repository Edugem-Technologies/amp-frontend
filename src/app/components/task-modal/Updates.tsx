/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"

export default function Updates({ data = [] }: any) {
    const [text, setText] = useState("")

    return (
        <div className="accordion v1 my-6" id="task-updates">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className="accordion-button fs-6 fw-bold collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#task-updates_body_1"
                    >
                        <span className="position-relative">
                            Updates{" "}
                            <span className="count">
                                <span>{data.length}</span>
                            </span>
                        </span>
                    </button>
                </h2>

                <div
                    id="task-updates_body_1"
                    className="accordion-collapse collapse"
                    data-bs-parent="#task-updates"
                >
                    <div className="accordion-body">
                        {data.map((item: any, i: number) => (
                            <div className="d-flex mb-5" key={i}>
                                <div className="symbol symbol-45px me-5">
                                    <img src={item.avatar} alt="" />
                                </div>

                                <div className="d-flex flex-column flex-row-fluid">
                                    <div className="d-flex align-items-center mb-1">
                                        <span className="fw-bolder me-2">{item.name}</span>
                                        <span className="text-gray-400 fs-7">{item.time}</span>
                                    </div>

                                    <span className="text-gray-800 fw-normal pt-1">
                                        {item.message}
                                    </span>
                                </div>
                            </div>
                        ))}

                        <textarea
                            className="form-control form-control-solid mb-2"
                            rows={4}
                            placeholder="Add Update.."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />

                        <button className="btn btn-sm btn-purple">Add Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
