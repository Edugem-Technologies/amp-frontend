"use client"
import PermissionGuard from "@/app/components/auth/PermissionGuard"
import ActionColumn from "@/app/components/common/ActionColumn"
import CommonCard from "@/app/components/common/CommonCard"
import CommonList from "@/app/components/common/CommonList"
import { usePermissions } from "@/app/context/PermissionContext"
import { ModuleTypeEnum } from "@/enums/ModuleTypeEnum"
import { permissionJSON } from "@/fixtures/Permission"
import { CommonCardInterface } from "@/types/common/CommonCard"
import { AnyObject } from "@/types/common/helper"
import { CONFIG } from "@/utils/constants"
import { hasAccessPermission } from "@/utils/helpers"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

const Index = () => {
    const router = useRouter()
    const { userPermissions } = usePermissions()

    const [isTableView, setIsTableView] = useState(false)

    const columns = useMemo<ColumnDef<AnyObject>[]>(
        () => [
            {
                header: "Action",
                cell: ({ row }) => {
                    return (
                        <ActionColumn
                            handleEdit={() => {
                                router.push(
                                    `/roles/${row.original.uuid}/${CONFIG.ADD_ROLE_ITEM_STEP_TABS.details.path}?edit=true`,
                                )
                            }}
                        />
                    )
                },
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )
    return (
        <PermissionGuard
            requiredPermissions={[
                permissionJSON.ROLE.permissions.VIEW.code,
                permissionJSON.ROLE.permissions.MANAGE.code,
            ]}
        >
            <CommonList
                moduleType={ModuleTypeEnum.ROLE}
                isAddButtonDisabled={
                    !hasAccessPermission({
                        userPermissions,
                        requiredPermissions: [permissionJSON.ROLE.permissions.MANAGE.code],
                    })
                }
                extraColumns={columns}
                endpoint={CONFIG.API_ENDPOINTS.GET_ROLES}
                title="Role"
                addButtonTitle="Role"
                tableClassName="action-columns-width"
                onAddButton={() => {
                    router.push("/roles/add-role")
                }}
                isTableView={isTableView}
                setIsTableView={setIsTableView}
                renderGridView={(data) => {
                    const userCardProps: CommonCardInterface = {
                        avatar: null,
                        first_name: data.name,
                        description: data.description,
                        editButtonClass: "btn-secondary",
                        onClickEditButton: () =>
                            router.push(
                                `/roles/${data.uuid}/${CONFIG.ADD_ROLE_ITEM_STEP_TABS.details.path}?edit=true`,
                            ),
                    }
                    return (
                        <div className="pb-5 h-100">
                            {" "}
                            <CommonCard {...userCardProps} />
                        </div>
                    )
                }}
            />
        </PermissionGuard>
    )
}

export default Index
