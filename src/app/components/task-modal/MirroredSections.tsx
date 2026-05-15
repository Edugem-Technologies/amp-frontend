"use client"

import { useState } from "react"

interface MirroredSectionItem {
    id: number
    label: string
    checked: boolean
}

interface MirroredSectionsProps {
    items: MirroredSectionItem[]
    onChange?: (items: MirroredSectionItem[]) => void
}

const MirroredSections = ({ items, onChange }: MirroredSectionsProps) => {
    const [state, setState] = useState(items)

    const toggle = (id: number) => {
        const updated = state.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item,
        )

        setState(updated)
        onChange?.(updated)
    }

    return (
        <div className="sections-mirrored">
            <div className="fw-bold mb-2">Mirrored Sections</div>

            {state.map((item) => (
                <label
                    key={item.id}
                    className={`form-check form-check-sm form-check-custom form-check-solid mb-3 justify-content-between ${
                        item.checked ? "checked" : "not-checked"
                    }`}
                >
                    <span className="form-check-label m-0">{item.label}</span>

                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggle(item.id)}
                    />
                </label>
            ))}
        </div>
    )
}

export default MirroredSections
