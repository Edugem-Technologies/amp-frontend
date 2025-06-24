/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddressTypeEnum } from "@/enums/AddressTypeEnum"
import {
    AddressData,
    AddressPropType,
    AddressPropTypeWithAddMore,
} from "@/types/components/Address"
import { Option } from "@/types/components/ReactSelect"
import { CONFIG } from "@/utils/constants"
import { getOptionFromEnum } from "@/utils/helpers"
import React, { useState } from "react"
import BaseStaticSelect from "../input/BaseStaticSelect"
import Label from "../input/Label"
import TextAreaField from "../input/TextArea"
import TextInputField from "../input/TextInput"
import AddMore from "./AddMore"
import ShowFormError from "./ShowFormError"

const Address: React.FC<AddressPropType> = ({
    onChange,
    errors,
    addressValue,
    inputColClass = "col-md-6",
    showAddMore,
    ...props
}) => {
    const [manualAddress, setManualAddress] = useState<AddressData>(
        addressValue ? addressValue : CONFIG.ADDRESS_DEFAULT_VALUE,
    )

    /**
     * Handles manual changes to address fields.
     *
     * Updates the specified field in the manual address state and triggers the `onChange` callback
     * with the updated address data.
     *
     * @param field - The name of the address field to update (e.g., "street", "city").
     * @param value - The new value for the specified address field.
     */
    const handleManualChange = (field: string, value: string | Option) => {
        const updatedAddress = { [field]: value }
        setManualAddress((prev) => {
            const newAddressData = { ...prev, ...updatedAddress }
            onChange(newAddressData)
            return newAddressData
        })
    }

    return (
        <>
            <div
                className={`manual-address-fields ${
                    (props as AddressPropTypeWithAddMore).index !== 0 ? "mt-4" : ""
                }`}
            >
                <div className="row">
                    <div className={inputColClass}>
                        <TextAreaField
                            label="Address"
                            className="form-control form-control-solid"
                            value={manualAddress?.address}
                            autoComplete="off"
                            onChange={(e) => handleManualChange("address", e.target.value)}
                            errorMsg={errors?.address?.message}
                        />
                    </div>
                    <div className={inputColClass}>
                        <Label label="Address Type" />
                        <BaseStaticSelect
                            value={manualAddress?.address_type}
                            options={getOptionFromEnum(AddressTypeEnum)}
                            onSelected={(binType) =>
                                handleManualChange("address_type", binType as Option)
                            }
                        />
                        <ShowFormError message={errors?.address_type?.message} />
                    </div>
                    <div className={inputColClass}>
                        <TextInputField
                            label="City"
                            className="form-control form-control-solid"
                            value={manualAddress?.city}
                            autoComplete="off"
                            onChange={(e) => handleManualChange("city", e.target.value)}
                            errorMsg={errors?.city?.message}
                        />
                    </div>
                    <div className={inputColClass}>
                        <TextInputField
                            label="State"
                            className="form-control form-control-solid"
                            autoComplete="off"
                            value={manualAddress?.state}
                            onChange={(e) => handleManualChange("state", e.target.value)}
                            errorMsg={errors?.state?.message}
                        />
                    </div>
                    <div className={inputColClass}>
                        <TextInputField
                            label="Pincode"
                            className="form-control form-control-solid"
                            autoComplete="off"
                            value={manualAddress?.pincode}
                            onChange={(e) => handleManualChange("pincode", e.target.value)}
                            errorMsg={errors?.pincode?.message}
                        />
                    </div>
                    <div className={inputColClass}>
                        <TextInputField
                            label="Country"
                            className="form-control form-control-solid"
                            autoComplete="off"
                            value={manualAddress?.country}
                            onChange={(e) => handleManualChange("country", e.target.value)}
                            errorMsg={errors?.country?.message}
                        />
                    </div>
                    {showAddMore && (
                        <div className={inputColClass}>
                            <AddMore
                                sectionCustomClass={
                                    (props as AddressPropTypeWithAddMore).addMoreSectionCustomClass
                                }
                                index={(props as AddressPropTypeWithAddMore).index}
                                handleOnClick={() =>
                                    (props as AddressPropTypeWithAddMore).append(
                                        CONFIG.ADDRESS_DEFAULT_VALUE,
                                    )
                                }
                                fieldLength={(props as AddressPropTypeWithAddMore).fieldLength}
                                handleOnRemove={() =>
                                    (props as AddressPropTypeWithAddMore).remove(
                                        (props as AddressPropTypeWithAddMore).index,
                                    )
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Address
