import React from "react"
import { CONFIG } from "@/utils/constants"
import { BaseWrapperSelectPropType } from "@/types/components/ReactSelect"
import BaseSelect from "./BaseSelect"

const RoleSelect: React.FC<BaseWrapperSelectPropType> = (props) => {
    const { selectedOptionValue } = props
    return (
        <BaseSelect
            endpoint={CONFIG.API_ENDPOINTS.GET_ROLES}
            getOptionData={(item) => item}
            getOptionLabel={(item) => item.name}
            getOptionValue={(item) => item.uuid}
            value={selectedOptionValue}
            {...props}
        />
    )
}

export default RoleSelect
