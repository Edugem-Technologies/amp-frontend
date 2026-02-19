export type Status = "Active" | "Inactive"

export interface BaseEntity {
    id: string
    name: string
}

export interface TeamMember extends BaseEntity {
    role: string
    email: string
    status: Status
    profileImage: string
}

export interface Project extends BaseEntity {
    status: Status
    logo: string
}

export interface Roadmap extends BaseEntity {
    assignedTeam: TeamMember[]
}

export interface PipelineItem extends BaseEntity {
    status: string
    probability: string
    assignedTeam: TeamMember[]
}

export interface SettingsData {
    team: TeamMember[]
    projects: Project[]
    roadmaps: Roadmap[]
    pipeline: PipelineItem[]
}

export interface SettingsTab {
    id: keyof SettingsData | "general"
    label: string
    description: string
    iconType: string
}
