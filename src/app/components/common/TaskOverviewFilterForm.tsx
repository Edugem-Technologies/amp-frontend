import React, { useState } from "react"
import BaseStaticSelect from "../input/BaseStaticSelect"
import { CardDropdownOptionItf } from "@/types/common/DashboardCardsTypes"

type FilterValue = string | number | boolean | string[] | null
type FilterValues = Record<string, FilterValue>

interface Props {
    options: CardDropdownOptionItf[]
    onApply: (values: FilterValues) => void
}

const TaskOverviewFilterForm: React.FC<Props> = ({ options, onApply }) => {
    const initialState: FilterValues = options.reduce((acc, opt) => {
        acc[opt.id] = opt.defaultValue ?? null
        return acc
    }, {} as FilterValues)

    const [values, setValues] = useState<FilterValues>(initialState)

    const updateValue = (id: string, value: FilterValue) => {
        setValues((prev) => ({ ...prev, [id]: value }))
    }

    const handleApply = () => {
        onApply(values)
    }

    const handleReset = () => {
        setValues(initialState)
    }

    return (
        <div className="card-filter-wrapper">
            <div className="filter-header">
                <h3>Filter options</h3>
            </div>

            <div className="filter-options">
                {options.map((field, index) => {
                    switch (field.type) {
                        case "select": {
                            const selectedPrimitiveValue = values[field.id] as
                                | string
                                | number
                                | null

                            const selectedOption =
                                field.options?.find(
                                    (opt) => opt.value === selectedPrimitiveValue,
                                ) || null

                            return (
                                <div key={index} className="from-group-wrapper">
                                    <label className="form-label">{field.label}:</label>

                                    <BaseStaticSelect
                                        options={field.options ?? []}
                                        selectedOptionValue={selectedOption}
                                        onSelected={(option) => {
                                            updateValue(
                                                field.id,
                                                option && !Array.isArray(option)
                                                    ? option.value ?? null
                                                    : null,
                                            )
                                        }}
                                        isMulti={false}
                                        isSearchable={true}
                                    />
                                </div>
                            )
                        }

                        case "checkbox":
                            return (
                                <div key={field.id} className="from-group-wrapper">
                                    <label className="form-label">{field.label}:</label>

                                    <div className="checbox-wrapper mt-2">
                                        {field.options?.map((opt, index) => {
                                            const checkedValues =
                                                (values[field.id] as string[]) || []

                                            return (
                                                <label
                                                    key={index}
                                                    className="d-flex align-items-center gap-2"
                                                >
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={checkedValues.includes(opt.value)}
                                                        onChange={(e) => {
                                                            const checked = e.target.checked

                                                            updateValue(
                                                                field.id,
                                                                checked
                                                                    ? [...checkedValues, opt.value]
                                                                    : checkedValues.filter(
                                                                          (v) => v !== opt.value,
                                                                      ),
                                                            )
                                                        }}
                                                    />

                                                    <p className="mb-0">{opt.label}</p>
                                                </label>
                                            )
                                        })}
                                    </div>
                                </div>
                            )

                        case "toggle":
                            return (
                                <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        name="notifications"
                                        onChange={(e) => updateValue(field.id, e.target.checked)}
                                        checked={Boolean(values[field.id])}
                                    ></input>
                                    <label className="form-check-label">Enabled</label>
                                </div>
                            )

                        case "actions":
                            return (
                                <div
                                    key={field.id}
                                    className="d-flex justify-content-end gap-2 actions-btn"
                                >
                                    <button
                                        className="filter-btn filter-btn-light"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </button>
                                    <button
                                        className="filter-btn filter-btn-success"
                                        onClick={handleApply}
                                    >
                                        Apply
                                    </button>
                                </div>
                            )

                        default:
                            return null
                    }
                })}
            </div>
        </div>
    )
}

export default TaskOverviewFilterForm
