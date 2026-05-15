// ProgressSelect.tsx

"use client"

import { useState } from "react"
import BaseStaticSelect from "../input/BaseStaticSelect"
import { Option } from "@/types/components/ReactSelect"

interface ProgressSelectProps {
    options: Option[]
}



const ProgressSelect = ({
    options,
}: ProgressSelectProps) => {
    const [selectedProgress, setSelectedProgress] =
        useState<Option | null>(null)

    return (
        <div className="w-100">
            <BaseStaticSelect
                options={options}
                selectedOptionValue={selectedProgress}
                onSelected={(selected) =>
                    setSelectedProgress(selected as Option)
                }
                placeholder="Progress"
                className="w-100"
                isRadioDropdown
            />
        </div>
    )
}

export default ProgressSelect