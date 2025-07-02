"use client"

import PermissionGuard from "@/app/components/auth/PermissionGuard"
import PageTitle from "@/app/components/common/PageTitle"
import TabSection from "@/app/components/common/TabSection"
import RoleDetails from "@/app/components/role/RoleDetails"
import { permissionJSON } from "@/fixtures/Permission"
import { CONFIG } from "@/utils/Constants"
import { useParams, useSearchParams } from "next/navigation"
import { useState } from "react"

const Index = () => {
    const params = useParams()
    const tab = params.tab as string
    const searchParams = useSearchParams()
    const [isEdit] = useState(searchParams.get("edit") ?? "")
    const COMPONENT_MAPPING = {
        [CONFIG.ADD_ROLE_ITEM_STEP_TABS["details"].path]: RoleDetails,
    }

    const renderTabContent = () => {
        const Component = COMPONENT_MAPPING[tab]
        return Component ? <Component /> : null
    }
    return (
        <PermissionGuard requiredPermissions={[permissionJSON.ROLE.permissions.MANAGE.code]}>
            <div className="tab-content">
                <PageTitle title={`${isEdit ? "Edit" : "Create New"} Role`} />

                <TabSection customClassName="">{renderTabContent()}</TabSection>
            </div>
        </PermissionGuard>
    )
}

export default Index
