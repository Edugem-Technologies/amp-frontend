"use client"

import PermissionGuard from "@/app/components/auth/PermissionGuard"
import PageTitle from "@/app/components/common/PageTitle"
import TabSection from "@/app/components/common/TabSection"
import RoleDetails from "@/app/components/role/RoleDetails"
import { permissionJSON } from "@/fixtures/Permission"

const Page = () => {
    return (
        <PermissionGuard requiredPermissions={[permissionJSON.ROLE.permissions.MANAGE.code]}>
            <PageTitle title="Create New Role" />
            <TabSection>
                <RoleDetails />
            </TabSection>
        </PermissionGuard>
    )
}

export default Page
