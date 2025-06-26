"use client"
import PermissionGuard from "@/app/components/auth/PermissionGuard"
import BulkDownloadButton from "@/app/components/button/BulkDownloadButton"
import BulkUploadButton from "@/app/components/button/BulkUploadButton"
import ActionColumn from "@/app/components/common/ActionColumn"
import CommonCard from "@/app/components/common/CommonCard"
import CommonList from "@/app/components/common/CommonList"
import InviteUserModal from "@/app/components/modal/InviteUserModal"
import { useAppContext } from "@/app/context/AppContext"
import { usePermissions } from "@/app/context/PermissionContext"
import { ModuleTypeEnum } from "@/enums/ModuleTypeEnum"
import { permissionJSON } from "@/fixtures/Permission"
import { User } from "@/types/auth/User"
import { CommonCardInterface } from "@/types/common/CommonCard"
import { CONFIG } from "@/utils/constants"
import { hasAccessPermission } from "@/utils/helpers"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

const Page = () => {
    const router = useRouter()
    const { userPermissions } = usePermissions()
    const { user } = useAppContext()
    const [refetch, setRefetch] = useState(false)
    const [isTableView, setIsTableView] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // This is a UI-driven table implementation. You must explicitly define all columns in the frontend and pass them to the CommonList component, setting isBackendDrivenColumns to false. This means the table structure is controlled by the UI code, not dynamically from the backend.
    const columns = useMemo<ColumnDef<User>[]>(() => {
        return [
            {
                header: "First Name",
                accessorKey: "first_name",
                size: CONFIG.REACT_TABLE.COLUMN_SIZE[100],
                cell: ({ row }) => row.original.first_name,
            },
            {
                header: "Last Name",
                accessorKey: "last_name",
                cell: ({ row }) => row.original.last_name ?? "N/A",
            },
            {
                header: "Email",
                accessorKey: "email",
                cell: ({ row }) => row.original.primary_email,
            },
            {
                header: "Created By",
                accessorKey: "created_by",
                cell: ({ row }) => row.original.created_by,
            },
            {
                header: "Created At",
                accessorKey: "created_at",
                cell: ({ row }) => row.original.created_at,
            },
            {
                header: "Action",
                cell: ({ row }) => {
                    return (
                        <ActionColumn
                            // The 'isEditDisabled' property determines whether the edit button for a user card should be disabled.
                            // It will be set to 'true' (disabled) unless one of the following conditions is met:
                            //   1. The currently logged-in user is viewing their own user card (i.e., user?.uuid === data.uuid).
                            //      This allows users to edit their own profile.
                            //   2. The currently logged-in user has the 'MANAGE' permission for users.
                            //      This allows users with sufficient privileges (such as admins) to edit any user's profile.
                            // If neither of these conditions is true, the edit button will be disabled for that user card.
                            isEditDisable={
                                !(
                                    (user?.uuid && user?.uuid === row.original.uuid) ||
                                    hasAccessPermission({
                                        userPermissions,
                                        requiredPermissions: [
                                            permissionJSON.USER.permissions.MANAGE.code,
                                        ],
                                    })
                                )
                            }
                            handleEdit={() => {
                                router.push(
                                    `/users/${row.original.uuid}/${CONFIG.EDIT_USER_STEP_TABS.details.path}`,
                                )
                            }}
                        />
                    )
                },
            },
        ]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <PermissionGuard
            requiredPermissions={[
                permissionJSON.USER.permissions.VIEW.code,
                permissionJSON.USER.permissions.MANAGE.code,
            ]}
        >
            <CommonList
                isBackendDrivenColumns={false}
                sortingId="first_name"
                isAddButtonDisabled={
                    !hasAccessPermission({
                        userPermissions,
                        requiredPermissions: [permissionJSON.USER.permissions.MANAGE.code],
                    })
                }
                columns={columns}
                endpoint={CONFIG.API_ENDPOINTS.GET_USERS}
                title="User"
                customAddButtonTitle="Invite User"
                tableClassName="action-columns-width"
                onAddButton={() => {
                    setIsModalOpen(true)
                }}
                dependencies={[refetch]}
                isTableView={isTableView}
                setIsTableView={setIsTableView}
                renderGridView={(data) => {
                    const userCardProps: CommonCardInterface = {
                        avatar: null,
                        first_name: data.first_name ?? "",
                        last_name: data.last_name ?? "",
                        editButtonClass: "btn-secondary",
                        email: data.primary_email,
                        role: data.roles,
                        status: data?.status,
                        // The 'isEditDisabled' property determines whether the edit button for a user card should be disabled.
                        // It will be set to 'true' (disabled) unless one of the following conditions is met:
                        //   1. The currently logged-in user is viewing their own user card (i.e., user?.uuid === data.uuid).
                        //      This allows users to edit their own profile.
                        //   2. The currently logged-in user has the 'MANAGE' permission for users.
                        //      This allows users with sufficient privileges (such as admins) to edit any user's profile.
                        // If neither of these conditions is true, the edit button will be disabled for that user card.
                        isEditDisabled: !(
                            (user?.uuid && user?.uuid === data.uuid) ||
                            hasAccessPermission({
                                userPermissions,
                                requiredPermissions: [permissionJSON.USER.permissions.MANAGE.code],
                            })
                        ),
                        onClickEditButton: () =>
                            router.push(
                                `/users/${data.uuid}/${CONFIG.EDIT_USER_STEP_TABS.details.path}`,
                            ),
                    }
                    return (
                        <div className="pb-5 h-100">
                            {" "}
                            <CommonCard {...userCardProps} />
                        </div>
                    )
                }}
                renderCustomToolbar={() => (
                    <>
                        <BulkDownloadButton
                            disabled={
                                !hasAccessPermission({
                                    userPermissions,
                                    requiredPermissions: [
                                        permissionJSON.USER.permissions.VIEW.code,
                                        permissionJSON.USER.permissions.MANAGE.code,
                                    ],
                                })
                            }
                            moduleType={ModuleTypeEnum.USER}
                        />

                        <BulkUploadButton
                            disabled={
                                !hasAccessPermission({
                                    userPermissions,
                                    requiredPermissions: [
                                        permissionJSON.USER.permissions.MANAGE.code,
                                    ],
                                })
                            }
                            moduleType={ModuleTypeEnum.USER}
                        />
                    </>
                )}
            />
            {isModalOpen && (
                <InviteUserModal
                    onClose={() => {
                        setIsModalOpen(false)
                    }}
                    onAdded={() => {
                        setRefetch((prev) => !prev)
                    }}
                />
            )}
        </PermissionGuard>
    )
}

export default Page
