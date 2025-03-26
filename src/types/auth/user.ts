export interface UserEmailVerifyPropType {
    verification_code: string
    email: string
}

export interface User {
    email: string
    uuid: string
    first_name: string
    image?: string
}

export interface WithAuthPropType {
    user?: User
}
