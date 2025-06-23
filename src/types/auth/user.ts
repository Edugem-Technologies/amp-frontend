export interface UserEmailVerifyPropType {
    verification_code: string
    email: string
}

export interface User {
    country_code: string | null
    first_name: string
    last_name: string | null
    primary_email: string
    primary_phone: string | null
    uuid: string
}

export interface WithAuthPropType {
    user?: User
}

export type UserWithRole = User & { role: string }
