"use client"

interface Switcher {
    id: string
    label: string
}

interface SwitchersProps {
    items: Switcher[]
    state: Record<string, boolean>
    onToggle: (id: string) => void
}

const Switchers = ({ items, state, onToggle }: SwitchersProps) => {
    return (
        <div className="switchers">
            <div className="separator mb-3"></div>

            <div className="items">
                {items.map((item) => {
                    const isEnabled = state[item.id]

                    return (
                        <div
                            key={item.id}
                            className="row justify-content-between switcher-row mb-3"
                        >
                            {/* SWITCH */}
                            <div className="col-auto d-flex">
                                <div className="form-check form-switch form-check-custom form-check-solid d-inline-flex align-items-center">
                                    <input
                                        className="form-check-input h-20px w-30px"
                                        type="checkbox"
                                        checked={isEnabled}
                                        onChange={() => onToggle(item.id)}
                                        id={`switch-${item.id}`}
                                    />

                                    <label
                                        className="form-check-label ms-2"
                                        htmlFor={`switch-${item.id}`}
                                    >
                                        {item.label}
                                    </label>
                                </div>
                            </div>

                            {/* ACTION BUTTON (only if NOT ml) */}
                            {item.id !== "ml" && (
                                <div className="col-auto">
                                    <button className="btn btn-light btn-sm">
                                        <span className="svg-icon svg-icon-3 me-1">
                                            {/* keep your SVG 그대로 */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M11.2166 8.50002L10.5166 7.80007C10.1166 7.40007 10.1166 6.80005 10.5166 6.40005L13.4166 3.50002C15.5166 1.40002 18.9166 1.50005 20.8166 3.90005C22.5166 5.90005 22.2166 8.90007 20.3166 10.8001L17.5166 13.6C17.1166 14 16.5166 14 16.1166 13.6L15.4166 12.9C15.0166 12.5 15.0166 11.9 15.4166 11.5L18.3166 8.6C19.2166 7.7 19.1166 6.30002 18.0166 5.50002C17.2166 4.90002 16.0166 5.10007 15.3166 5.80007L12.4166 8.69997C12.2166 8.89997 11.6166 8.90002 11.2166 8.50002ZM11.2166 15.6L8.51659 18.3001C7.81659 19.0001 6.71658 19.2 5.81658 18.6C4.81658 17.9 4.71659 16.4 5.51659 15.5L8.31658 12.7C8.71658 12.3 8.71658 11.7001 8.31658 11.3001L7.6166 10.6C7.2166 10.2 6.6166 10.2 6.2166 10.6L3.6166 13.2C1.7166 15.1 1.4166 18.1 3.1166 20.1C5.0166 22.4 8.51659 22.5 10.5166 20.5L13.3166 17.7C13.7166 17.3 13.7166 16.7001 13.3166 16.3001L12.6166 15.6C12.3166 15.2 11.6166 15.2 11.2166 15.6Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </span>
                                        Copy
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Switchers
