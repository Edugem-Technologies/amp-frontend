export interface UserEmailVerifyPropType {
    verification_code: string
    email: string
}

export interface User {
    first_name: string
    email: string
    uuid: string
}

export interface WithAuthPropType {
    user?: User
}
