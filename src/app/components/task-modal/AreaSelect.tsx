// AreaSelect.tsx
"use client"

import { useState } from "react"
import { Option } from "@/types/components/ReactSelect"
import BaseStaticSelect from "../input/BaseStaticSelect"

const areaOptions: Option[] = [
    {
        label: "Outmin",
        value: "Outmin",
        data: "Outmin",
    },
    {
        label: "XYZ",
        value: "XYZ",
        data: "XYZ",
    },
    {
        label: "Customs Window",
        value: "Customs Window",
        data: "Customs Window",
    },
    {
        label: "Splink",
        value: "Splink",
        data: "Splink",
    },
    {
        label: "Workflow",
        value: "Workflow",
        data: "Workflow",
    },
    {
        label: "Linkie",
        value: "Linkie",
        data: "Linkie",
    },
]

const AreaSelect = () => {
    const [selectedAreas, setSelectedAreas] = useState<Option[]>([])

    return (
        <div className="c-menus area">
            <BaseStaticSelect
                isMulti
                isCheckBoxDropdowns
                options={areaOptions}
                selectedOptionValue={selectedAreas}
                onSelected={(selected) =>
                    setSelectedAreas(selected as Option[])
                }
                placeholder="Projects"
                className="min-w-200px"
            />
        </div>
    )
}

export default AreaSelect