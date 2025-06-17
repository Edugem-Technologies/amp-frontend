import { CustomPhoneInputType } from "@/types/components/customPhoneInput"
import { checkValidPhoneNumber } from "@/utils/helpers"
import PhoneInput, { CountryData } from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import ShowFormError from "../common/ShowFormError"

/**
 * A custom phone input component that utilizes react-phone-input-2.
 *
 * @param {object} props - The props object containing various input properties.
 * @param {string} props.inputClass - CSS class for the input field.
 * @param {string} props.value - Current value of the phone number.
 * @param {function} props.setPhoneNumberValue - Function to set the phone number value.
 * @param {function} props.setCountryCodeValue - Function to set the country code value.
 * @param {function} props.clearPhoneNumberErrors - Function to clear any phone number errors.
 * @param {function} props.setPhoneNumberErrors - Function to set phone number errors.
 * @param {string} props.errorMessage - Error message to display.
 * @returns {JSX.Element} CustomPhoneInput component.
 */

const CustomPhoneInput: React.FC<CustomPhoneInputType> = ({
    inputClass,
    value,
    setPhoneNumberValue,
    setCountryCodeValue,
    clearPhoneNumberErrors,
    setPhoneNumberErrors,
    errorMessage,
    setCountry,
    ...props
}) => {
    return (
        <>
            <div>
                <PhoneInput
                    inputClass={inputClass}
                    value={value}
                    onChange={(data, _country, e, formattedValue) => {
                        const countryCode = (_country as CountryData)?.dialCode
                        // Find the first occurrence of the country code
                        const firstOccurrenceIndex = data.indexOf(countryCode)
                        let number = ""

                        // Ensure the country code is at the start
                        if (firstOccurrenceIndex === 0) {
                            // Split only at the first occurrence
                            number = data.slice(countryCode.length).trim()
                        }
                        setCountry && setCountry(_country as CountryData)
                        // Setting the phone number and country code values
                        setPhoneNumberValue(number)
                        if (number?.trim().length) {
                            setCountryCodeValue(`+${(_country as CountryData).dialCode}`)
                        } else {
                            setCountryCodeValue("")
                            setPhoneNumberValue(formattedValue)
                        }

                        // Checking if the entered number is valid
                        const result = checkValidPhoneNumber({
                            country: _country,
                            data,
                        })

                        // Handling error messages based on the validity result
                        if (result) {
                            clearPhoneNumberErrors()
                        } else {
                            setPhoneNumberErrors()
                        }
                    }}
                    {...props}
                />
            </div>

            {/* Display error message if any  */}
            <ShowFormError message={errorMessage} />
        </>
    )
}

export default CustomPhoneInput
