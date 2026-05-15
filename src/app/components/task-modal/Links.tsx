/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Links({ data = [] }: any) {
    return (
        <div className="accordion v1 my-6" id="task-links">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className="accordion-button fs-6 fw-bold collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#task-links_body_1"
                    >
                        <span className="position-relative">
                            Links{" "}
                            <span className="count">
                                <span>{data.length}</span>
                            </span>
                        </span>
                    </button>
                </h2>

                <div
                    id="task-links_body_1"
                    className="accordion-collapse collapse"
                    data-bs-parent="#task-links"
                >
                    <div className="accordion-body">
                        {data.map((item: any, i: number) => (
                            <div
                                key={i}
                                className="d-flex justify-content-between align-items-center border rounded p-3 mb-3"
                            >
                                <div>
                                    <div className="fw-bold">{item.title}</div>

                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="fs-7 text-primary"
                                    >
                                        {item.url}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
