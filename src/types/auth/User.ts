export interface UserEmailVerifyPropType {
    verification_code: string
    email: string
}

export interface User {
    country_code: string
    created_at: string
    created_by: string | null
    email_verified_at: string | null
    first_name: string
    last_login_at: string
    last_name: string
    phone_verified_at: string | null
    primary_email: string
    primary_phone: string
    source: string
    updated_at: string
    updated_by: string | null
    uuid: string
}

export type UserWithRole = User & { role: string[] }
