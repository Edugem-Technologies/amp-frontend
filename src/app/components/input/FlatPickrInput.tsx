import React, { useRef } from "react"
import ShowFormError from "../common/ShowFormError"
import FlatPickr, { DateTimePickerProps } from "react-flatpickr"
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect"
import CrossIcon from "../../../../public/icons/flatpicker-cross.svg"
import dayjs from "dayjs"
import Image from "next/image"
import Label from "./Label"
import DatePicker from "react-flatpickr"

interface FlatPicktProps extends DateTimePickerProps {
    label?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorMsg?: any
    showMonthOnly?: boolean
    showCalendarIcon?: boolean
    isRequired?: boolean
    customClassName?: string
    customContainerClassName?: string
}

const FlatPickrInput: React.FC<FlatPicktProps> = (props) => {
    const {
        showCalendarIcon = false,
        isRequired = false,
        customClassName = "",
        customContainerClassName = "",
    } = props
    const ref = useRef<DatePicker>(null)
    const { showMonthOnly = false } = props
    let extraOptions
    if (showMonthOnly) {
        extraOptions = {
            plugins: [
                monthSelectPlugin({
                    shorthand: true,
                    dateFormat: "m.y",
                }),
            ],
        }
    } else {
        extraOptions = {
            plugins: [],
        }
    }
    return (
        <>
            {props.label && <Label isRequired={isRequired} label={props.label} />}
            <div
                className={`position-relative ${customContainerClassName}`}
                style={{ ...props.style }}
            >
                <FlatPickr
                    ref={ref}
                    className={`form-control form-control-solid ${customClassName}`}
                    placeholder="Select date"
                    {...props}
                    options={{
                        dateFormat: "Y-m-d",
                        disableMobile: true,
                        formatDate: (dateObj) => {
                            return dateObj ? dayjs(dateObj).format("DD MMM YYYY") : ""
                        },
                        ...extraOptions,
                        ...props.options,
                    }}
                />
                {showCalendarIcon && (
                    <Image
                        src={"/assets/media/icons/custom/calendar-icon.svg"}
                        width={18}
                        height={18}
                        className="calender-icon"
                        alt="calender-icon"
                    />
                )}
                {props.value && (
                    <button
                        className={`btn btn-sm btn-danger position-absolute p-0 ${
                            showCalendarIcon
                                ? "flatpickr-cross-icon-with-calender-icon"
                                : "flatpickr-cross-icon"
                        }`}
                        onClick={() => {
                            if (ref.current?.flatpickr) {
                                ref.current.flatpickr.clear()
                            }
                        }}
                    >
                        <Image src={CrossIcon.src} alt="Cross icon" width={20} height={10} />
                    </button>
                )}
            </div>
            <ShowFormError message={props.errorMsg} />
        </>
    )
}

export default FlatPickrInput
