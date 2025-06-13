"use client"

import { FetchHelper } from "@/services/fetch-helper"
import { Any } from "@/types/common/helper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { showSweetAlertWithRedirect } from "@/utils/helpers"
import { generateErrorMessage } from "@/utils/message-generator"
import { permissionJSON } from "@/utils/permission"
import { RoleDetailsSchema, RoleDetailsSchemaType } from "@/validations/auth/role"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../button/Button"
import CheckboxInput from "../common/CheckboxInput"
import ShowFormError from "../common/ShowFormError"
import TabBody from "../common/TabBody"
import TextInputField from "../input/TextInput"

const RoleDetails = () => {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()
    const isEdit = searchParams.get("edit")
    const roleId = params.id
    const [loading, setLoading] = useState(false)
    const {
        register,
        formState: { errors, isSubmitting, submitCount },
        handleSubmit,
        setValue,
        getValues,
        watch,
        clearErrors,
        setError,
        reset,
    } = useForm<RoleDetailsSchemaType>({
        resolver: zodResolver(RoleDetailsSchema),
    })
    const getDefaultValue = async () => {
        try {
            setLoading(true)
            // TODO: update URL as per the project requirement
            const url = new URL(`${CONFIG.API_ENDPOINTS.CREATE_USER}/${roleId}`)
            const response = await FetchHelper.get(url)
            if (response?.status && response?.data) {
                const defaultValue: RoleDetailsSchemaType = {
                    permissions: response?.data?.permissions,
                    details: {
                        name: response?.data?.roles?.name,
                        description: response?.data?.roles?.description,
                    },
                }
                reset({ ...defaultValue })
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    const submitHandler = async (data: RoleDetailsSchemaType) => {
        try {
            let response
            if (isEdit) {
                // TODO: update URL as per the project requirement
                const url = new URL(`${CONFIG.API_ENDPOINTS.CREATE_USER}/${roleId}`)
                response = await FetchHelper.patch(url, data)
            } else {
                // TODO: update URL as per the project requirement
                response = await FetchHelper.post(CONFIG.API_ENDPOINTS.CREATE_USER, data)
            }
            if (response?.status) {
                showSweetAlertWithRedirect({
                    icon: ALERT_ICON_TYPE.success,
                    router,
                    text: response?.message,
                    url: "/roles",
                })
            }
        } catch (error) {
            handleError(error)
        }
    }
    useEffect(() => {
        if (roleId) {
            getDefaultValue()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <TabBody loading={loading}>
                <form className="card-body" onSubmit={handleSubmit(submitHandler)}>
                    <div className="row mb-4 class-detail-form">
                        <div className="col-md-3">
                            <TextInputField
                                label="Name"
                                required
                                {...register("details.name")}
                                errorMsg={errors?.details?.name?.message}
                            />
                        </div>
                        <div className="col-md-3">
                            <TextInputField
                                {...register("details.description")}
                                label="Description"
                                errorMsg={errors.details?.description?.message?.toString()}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="row mb-4 class-detail-form">
                        <div className="col-md-12 form-section-title">
                            Permissions <span className="text-danger"> *</span>
                        </div>

                        <div className="row fw-bold">
                            <div className="col-md-3">Module</div>
                            <div className="col-md-3">View(Listing, Download)</div>
                            <div className="col-md-3">Manage(View, CRUD, Upload)</div>
                        </div>
                        {Object.values(permissionJSON).map((item) => {
                            const itemPermissions = Object.values(item.permissions)
                            return (
                                <div className="row" key={item.code}>
                                    <div className="col-md-3">{item.label}</div>
                                    {itemPermissions.map((permission) => (
                                        <div className="col-md-3" key={permission.code}>
                                            <CheckboxInput
                                                disabled={
                                                    watch("permissions")?.includes(
                                                        `${item.code}_MANAGE`,
                                                    ) && permission.code === `${item.code}_VIEW`
                                                        ? true
                                                        : false
                                                }
                                                key={watch("permissions") as Any}
                                                checked={getValues("permissions")?.includes(
                                                    permission.code,
                                                )}
                                                onChange={() => {
                                                    const prevValue = getValues("permissions")
                                                    if (prevValue?.includes(permission.code)) {
                                                        const newValue = prevValue?.filter(
                                                            (item: string) =>
                                                                item !== permission.code,
                                                        )
                                                        setValue("permissions", [...newValue])
                                                        clearErrors("permissions")
                                                    } else {
                                                        let updatedValue = [] as unknown as Set<Any>
                                                        if (permission.code.includes("MANAGE")) {
                                                            const newValue = itemPermissions.map(
                                                                (item) => item.code,
                                                            )
                                                            updatedValue = prevValue
                                                                ? new Set([
                                                                      ...prevValue,
                                                                      ...newValue,
                                                                  ])
                                                                : new Set([...newValue])
                                                        } else {
                                                            updatedValue = prevValue
                                                                ? new Set([
                                                                      ...prevValue,
                                                                      permission.code,
                                                                  ])
                                                                : new Set([permission.code])
                                                        }
                                                        setValue(
                                                            "permissions",
                                                            Array.from(updatedValue),
                                                        )
                                                        clearErrors("permissions")
                                                    }
                                                    if (
                                                        submitCount &&
                                                        watch("permissions")?.length === 0
                                                    ) {
                                                        setError("permissions", {
                                                            message:
                                                                generateErrorMessage("Permissions"),
                                                        })
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                        <ShowFormError message={errors?.permissions?.message} />
                    </div>
                    <hr />
                    <Button buttonTitle="Submit" isSubmitting={isSubmitting} />
                </form>
            </TabBody>
        </>
    )
}

export default RoleDetails
