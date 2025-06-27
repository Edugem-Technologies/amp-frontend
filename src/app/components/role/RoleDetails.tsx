"use client"
import { FetchHelper } from "@/services/fetch-helper"
import { Any } from "@/types/common/helper"
import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { showSweetAlertWithRedirect } from "@/utils/helpers"
import { generateErrorMessage } from "@/utils/message-generator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import CheckboxInput from "../common/CheckboxInput"
import ShowFormError from "../common/ShowFormError"
import TabBody from "../common/TabBody"
import TextAreaField from "../input/TextArea"
import TextInputField from "../input/TextInput"
import { useEffect, useState } from "react"
import { RoleDetailsSchema, RoleDetailsSchemaType } from "@/validations/role/RoleDetails"
import { permissionJSON } from "@/fixtures/Permission"
import FormFooter from "../common/FormFooter"

const RoleDetails = () => {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()
    const isEdit = searchParams.get(CONFIG.PARAMS.EDIT_PARAM)
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
            const url = new URL(`${CONFIG.API_ENDPOINTS.GET_ROLE_DETAIL}/${roleId}`)
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
                const url = new URL(`${CONFIG.API_ENDPOINTS.EDIT_ROLE}/${roleId}`)
                response = await FetchHelper.patch(url, data)
            } else {
                response = await FetchHelper.post(CONFIG.API_ENDPOINTS.CREATE_ROLE, data)
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

    /**
     * Determines whether a specific permission checkbox should be disabled
     * based on currently selected permissions.
     *
     * This function is used when rendering permission checkboxes in a form.
     * A checkbox should be disabled in the following cases:
     *
     * 1. If "MANAGE" permission is selected for an item, then the corresponding "VIEW" permission should be disabled.
     * 2. If "APPROVE_REJECT" permission is selected for an item, then both "VIEW" and "MANAGE" permissions should be disabled.
     *
     * @param {Object} params - The function parameters.
     * @param {string} params.itemCode - The base code of the item/module (e.g., "PURCHASE_ORDER").
     * @param {Object} params.permission - The permission object containing code and label.
     * @param {string} params.permission.code - Full permission code (e.g., "PURCHASE_ORDER_VIEW").
     * @param {string} params.permission.label - Display label for the permission (e.g., "View").
     *
     * @returns {boolean} Returns `true` if the checkbox should be disabled based on current selections.
     *
     * @example
     * // Example 1: "MANAGE" selected, checking "VIEW"
     * watch("permissions") returns ["PURCHASE_ORDER_MANAGE"]
     *
     * getCheckBoxDisabled({
     *   itemCode: "PURCHASE_ORDER",
     *   permission: { code: "PURCHASE_ORDER_VIEW", label: "View" }
     * }) ➝ true  // "VIEW" should be disabled since "MANAGE" is already selected
     *
     * @example
     * // Example 2: "APPROVE_REJECT" selected, checking "MANAGE"
     * watch("permissions") returns ["PURCHASE_ORDER_APPROVE_REJECT"]
     *
     * getCheckBoxDisabled({
     *   itemCode: "PURCHASE_ORDER",
     *   permission: { code: "PURCHASE_ORDER_MANAGE", label: "Manage" }
     * }) ➝ true  // "MANAGE" should be disabled since "APPROVE_REJECT" is selected
     *
     * @example
     * // Example 3: Only "VIEW" selected
     * watch("permissions") returns ["PURCHASE_ORDER_VIEW"]
     *
     * getCheckBoxDisabled({
     *   itemCode: "PURCHASE_ORDER",
     *   permission: { code: "PURCHASE_ORDER_MANAGE", label: "Manage" }
     * }) ➝ false  // "MANAGE" remains enabled, only "VIEW" is selected
     */
    const getCheckBoxDisabled = ({
        itemCode,
        permission,
    }: {
        itemCode: string
        permission: { code: string; label: string } | undefined
    }) => {
        const permissions = watch("permissions") || []
        if (!permission) {
            return true
        }
        const viewCode = `${itemCode}_VIEW`
        const manageCode = `${itemCode}_MANAGE`
        const approveRejectCode = `${itemCode}_APPROVE_REJECT`

        if (permissions.includes(manageCode) && permission?.code === viewCode) {
            return true
        }

        if (
            permissions.includes(approveRejectCode) &&
            (permission?.code === viewCode || permission?.code === manageCode)
        ) {
            return true
        }

        return false
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
                    <div className="row form-section">
                        <div className="col-md-12 form-section-title">Basic Details</div>
                        <div className="col-md-3">
                            <TextInputField
                                label="Name"
                                isRequired
                                {...register("details.name")}
                                errorMsg={errors?.details?.name?.message}
                            />
                        </div>
                        <div className="col-md-3">
                            <TextAreaField
                                {...register("details.description")}
                                label="Description"
                                errorMsg={errors.details?.description?.message}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="row form-section">
                        <div className="col-md-12 form-section-title">
                            Permissions <span className="text-danger"> *</span>
                        </div>

                        <div className="row fw-bold">
                            <div className="col-md-3">Module</div>
                            <div className="col-md-3">View(Listing, Download)</div>
                            <div className="col-md-3">Manage(View, CRUD, Upload)</div>
                            <div className="col-md-3">Approve/Reject</div>
                        </div>
                        {Object.values(permissionJSON).map((item) => {
                            const itemPermissions = Object.values(item.permissions)
                            return (
                                <div className="row" key={item.code}>
                                    <div className="col-md-3">{item.label}</div>
                                    {itemPermissions.map((permission) => (
                                        <div className="col-md-3" key={permission?.code}>
                                            <CheckboxInput
                                                disabled={getCheckBoxDisabled({
                                                    itemCode: item.code,
                                                    permission,
                                                })}
                                                key={watch("permissions") as Any}
                                                checked={getValues("permissions")?.includes(
                                                    permission?.code,
                                                )}
                                                onChange={() => {
                                                    // Get the currently selected permission values
                                                    const prevValue = getValues("permissions")
                                                    // If the current permission is already selected, remove it
                                                    if (prevValue?.includes(permission?.code)) {
                                                        const newValue = prevValue?.filter(
                                                            (item: string) =>
                                                                item !== permission?.code,
                                                        )
                                                        setValue("permissions", [...newValue])
                                                        clearErrors("permissions")
                                                    } else {
                                                        let updatedValue = [] as unknown as Set<Any>
                                                        // If the permission being selected is "MANAGE" or "APPROVE_REJECT"
                                                        if (
                                                            permission?.code.includes("MANAGE") ||
                                                            permission?.code.includes(
                                                                "APPROVE_REJECT",
                                                            )
                                                        ) {
                                                            // Get all permission codes related to this item
                                                            let newValue = itemPermissions.map(
                                                                (item) => item?.code,
                                                            )
                                                            // If selecting "MANAGE", exclude any "APPROVE_REJECT" permission from being added

                                                            if (
                                                                permission?.code.includes("MANAGE")
                                                            ) {
                                                                newValue = newValue.filter(
                                                                    (item) => {
                                                                        return item
                                                                            ? !item.includes(
                                                                                  "APPROVE_REJECT",
                                                                              )
                                                                            : false
                                                                    },
                                                                )
                                                            }
                                                            // Merge previously selected permissions with new values, avoiding duplicates using Set
                                                            updatedValue = prevValue
                                                                ? new Set([
                                                                      ...prevValue,
                                                                      ...newValue,
                                                                  ])
                                                                : new Set([...newValue])
                                                        } else {
                                                            // For simple permissions like "VIEW", just add the permission to the existing list
                                                            updatedValue = prevValue
                                                                ? new Set([
                                                                      ...prevValue,
                                                                      permission?.code,
                                                                  ])
                                                                : new Set([permission?.code])
                                                        }
                                                        // Update form value and clear validation error
                                                        setValue(
                                                            "permissions",
                                                            Array.from(updatedValue),
                                                        )
                                                        clearErrors("permissions")
                                                    }
                                                    // If form has been submitted at least once and no permissions are selected, trigger validation error
                                                    if (
                                                        submitCount &&
                                                        watch("permissions")?.length === 0
                                                    ) {
                                                        setError("permissions", {
                                                            message: generateErrorMessage(
                                                                CONFIG.VALIDATIONS.FIELD_NAME
                                                                    .PERMISSION,
                                                            ),
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
                    <FormFooter
                        isSubmitting={isSubmitting}
                        saveButtonTitle="Save"
                        handleCancelButton={() => router.push("/roles")}
                    />
                </form>
            </TabBody>
        </>
    )
}

export default RoleDetails
