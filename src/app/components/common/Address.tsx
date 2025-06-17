/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddressData, AddressPropType } from "@/types/components/address"
import React, { useState } from "react"
import TextAreaField from "../input/TextArea"
import TextInputField from "../input/TextInput"
import ShowFormError from "./ShowFormError"

const Address: React.FC<AddressPropType> = ({ onChange, errorMessage, addressValue }) => {
    const [manualAddress, setManualAddress] = useState<AddressData>(
        addressValue
            ? addressValue
            : {
                  address: "",
                  address_type: "",
                  city: "",
                  pincode: "",
                  country: "",
                  state: "",
              },
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
    const handleManualChange = (field: string, value: string) => {
        const updatedAddress = { [field]: value }
        setManualAddress((prev) => {
            const newAddressData = { ...prev, ...updatedAddress }
            onChange(newAddressData)
            return newAddressData
        })
    }

    return (
        <>
            <div className="manual-address-fields">
                <div className="row">
                    <div className="col-md-6">
                        <TextAreaField
                            label="Address"
                            className="form-control form-control-solid"
                            placeholder="Line 1"
                            value={manualAddress?.address}
                            autoComplete="off"
                            onChange={(e) => handleManualChange("address", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <TextInputField
                            label="Address Type"
                            className="form-control form-control-solid"
                            placeholder="City"
                            value={manualAddress?.address_type}
                            autoComplete="off"
                            onChange={(e) => handleManualChange("address_type", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <TextInputField
                            label="City"
                            className="form-control form-control-solid"
                            placeholder="City"
                            value={manualAddress?.city}
                            autoComplete="off"
                            onChange={(e) => handleManualChange("city", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <TextInputField
                            label="Pincode"
                            className="form-control form-control-solid"
                            placeholder="Postal Code"
                            autoComplete="off"
                            value={manualAddress?.pincode}
                            onChange={(e) => handleManualChange("pincode", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <TextInputField
                            label="Country"
                            className="form-control form-control-solid"
                            placeholder="Postal Code"
                            autoComplete="off"
                            value={manualAddress?.country}
                            onChange={(e) => handleManualChange("country", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <TextInputField
                            label="State"
                            className="form-control form-control-solid"
                            placeholder="Postal Code"
                            autoComplete="off"
                            value={manualAddress?.state}
                            onChange={(e) => handleManualChange("state", e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <ShowFormError message={errorMessage} />
        </>
    )
}

export default Address
