"use client"
import TabBody from "@/app/components/common/TabBody"
import { useFetchData, useMutateData } from "@/app/hooks/useFetchHelper"
import { AnyObject } from "@/types/common/helper"
import { handleError } from "@/utils/handle-error"
import React from "react"
import toast from "react-hot-toast"

const Page = () => {
    // toast.success("Data added successfully")

    // For implementation, I have used dummy APIs
    const { data, isFetching } = useFetchData({
        url: new URL(`https://random-data-api.com/api/v2/users?size=10`),
        tanstackQueryOption: {
            queryKey: ["users"],
        },
    })
    const addUserMutation = useMutateData({
        method: "post",
        url: new URL(`https://jsonplaceholder.typicode.com/posts`),
        queryKeys: ["users"],
    })
    const deleteUserMutation = useMutateData({
        method: "delete",
        url: new URL(`https://jsonplaceholder.typicode.com/posts/1`),
        queryKeys: ["users"],
    })

    return (
        <div className="container mb-5">
            <h1>fetching users data by tanstack Query</h1>

            <TabBody loading={isFetching}>
                <ul>
                    {data?.map((item: AnyObject) => (
                        <li key={item.id}>
                            {item?.first_name ?? ""} {item?.last_name ?? ""}
                        </li>
                    ))}
                </ul>
            </TabBody>
            <h2>Add Data using tanstack mutation</h2>
            <h6>This will update the above user list by refetching them</h6>
            <div className="d-flex flex-wrap gap-2">
                <button
                    className="btn btn-primary"
                    onClick={async () => {
                        await addUserMutation.mutateAsync(
                            {
                                data: {
                                    title: "foo",
                                    body: "bar",
                                    userId: 1,
                                },
                            },
                            {
                                onSuccess() {
                                    toast.success("data added successfully")
                                },
                                onError(error) {
                                    handleError(error)
                                },
                            },
                        )
                    }}
                >
                    Add Random Data
                </button>
                <button
                    className="btn btn-danger"
                    onClick={async () => {
                        await deleteUserMutation.mutateAsync(
                            {},
                            {
                                onSuccess() {
                                    toast.success("data deleted successfully")
                                },
                                onError(error) {
                                    handleError(error)
                                },
                            },
                        )
                    }}
                >
                    Delete Random Data
                </button>
            </div>
        </div>
    )
}

export default Page
