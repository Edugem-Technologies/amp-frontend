// PrioritySelect.tsx

"use client"

import { useMemo, useState } from "react"
import BaseStaticSelect from "../input/BaseStaticSelect"
import { Option } from "@/types/components/ReactSelect"

interface PrioritySelectProps {
    options: Option[]
    value?: Option | null
    onChange?: (value: Option | null) => void
    placeholder?: string
    className?: string
}

const PrioritySelect = ({
    options,
    value = null,
    onChange,
    placeholder = "Priority",
    className = "w-100",
}: PrioritySelectProps) => {
    const [internalValue, setInternalValue] =
        useState<Option | null>(value)

    const selectedValue = useMemo(() => {
        return value !== null ? value : internalValue
    }, [value, internalValue])

    const handleChange = (selected: Option | null) => {
        setInternalValue(selected)

        if (onChange) {
            onChange(selected)
        }
    }

    return (
        <div className={className}>
            <BaseStaticSelect
                options={options}
                selectedOptionValue={selectedValue}
                onSelected={(selected) =>
                    handleChange(selected as Option)
                }
                placeholder={placeholder}
                className="w-100"
            />
        </div>
    )
}

export default PrioritySelect