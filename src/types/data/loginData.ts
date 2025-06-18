// Interface for Role
export interface Role {
    description: string
    name: string
    slug: string
    uuid: string
}

// Interface for User Details
export interface UserDetails {
    country_code: string | null
    first_name: string
    last_name: string | null
    primary_email: string
    primary_phone: string | null
    uuid: string
}

// Main Interface for the JSON Response
export interface LoginData {
    data: {
        access_token: string
        details: UserDetails
        permissions: string[]
        refresh_token: string
        roles: Role[]
    }
    message: string
    status: boolean
}
