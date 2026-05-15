"use client"

interface TimeRequiredProps {
    durations: number[]
    selected: number | null
    onSelect: (value: number) => void
}

const TimeRequired = ({ durations, selected, onSelect }: TimeRequiredProps) => {
    return (
        <div className="tags-duration">
            <div className="separator my-3"></div>

            <div className="fw-bolder text-purple mb-2">Time Required</div>

            <div className="b-tags">
                {durations.map((value) => {
                    const isSelected = selected === value

                    return (
                        <button
                            key={value}
                            type="button"
                            onClick={() => onSelect(value)}
                            className={`btn badge ${isSelected ? "selected" : ""}`}
                        >
                            {value}
                        </button>
                    )
                })}
            </div>

            <button className="btn btn-sm btn-light w-100 mt-5">Add Custom Time</button>
        </div>
    )
}

export default TimeRequired
