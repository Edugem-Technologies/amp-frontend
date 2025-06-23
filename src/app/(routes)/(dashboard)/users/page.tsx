"use client"
import Button from "@/app/components/button/Button"
import ReactTableWithPagination from "@/app/components/common/ReactTableWithPagination"
import AddEditUser from "@/app/components/modal/AddEditUser"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo, useState } from "react"

const Page = () => {
    const [showUserModal, setShowUserModal] = useState(false)

    const columns = useMemo<
        ColumnDef<{ first_name: string; last_name: string; email: string }>[]
    >(() => {
        return [
            {
                header: "First Name",
                accessorKey: "first_name",
                cell: ({ row }) => row.original.first_name,
            },
            {
                header: "Last Name",
                accessorKey: "last_name",
                cell: ({ row }) => row.original.last_name,
            },
            { header: "Email", accessorKey: "email", cell: ({ row }) => row.original.email },
            {
                header: "Action",
                accessorKey: "action",
                enableSorting: false,
                cell: () => (
                    <div className="d-flex align-items-center gap-3">
                        <Button
                            buttonTitle="Edit"
                            className="text-white btn btn-primary"
                            onClick={() => {
                                setShowUserModal(true)
                            }}
                        />
                        <Button buttonTitle="Delete" className="btn btn-danger text-white" />
                    </div>
                ),
            },
        ]
    }, [])

    return (
        <div className="container-fluid mb-5">
            <h4 className="m-0 fw-bold">Fetching dummy users by tanstack Query</h4>
            <div className="mt-4">
                <ReactTableWithPagination
                    isBackendDrivenColumns={false}
                    columns={columns}
                    endpoint={new URL(`https://random-data-api.com/api/v2/users?size=10`)}
                    // queryKeys={["users"]}
                    tableHeaderTitle="Users"
                    renderGridView={(user) => (
                        <div className="card text-center">
                            <div className="card-body">{user.first_name}</div>
                        </div>
                    )}
                />
            </div>
            {showUserModal && (
                <AddEditUser
                    handleClose={() => {
                        setShowUserModal(false)
                    }}
                />
            )}
        </div>
    )
}

export default Page
