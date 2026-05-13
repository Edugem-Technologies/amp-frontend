export type TeamMember = {
    id: string
    name: string
    avatar: string
}

export type BaseRow<T = Record<string, unknown>> = {
    id: string
    name: string
    team: TeamMember[]
} & T
