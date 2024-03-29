export interface OtpModalPropType {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    email: string
    password: string
}

export interface EmailUpdateOtpModalPropType {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    oldEmail: string
    newEmail: string
    accessToken: string
}
