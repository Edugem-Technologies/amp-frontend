export type OptionType = {
    label: string
    value: string
}

export type FilterGroup = {
    title: string
    options: OptionType[]
}

export const RaodmapsFiltersData: FilterGroup[] = [
    {
        title: "Priority",
        options: [
            { label: "High", value: "high" },
            { label: "Medium", value: "medium" },
            { label: "Low", value: "low" },
        ],
    },
    {
        title: "Projects",
        options: [
            { label: "Outmin", value: "outmin" },
            { label: "XYZ", value: "xyz" },
            { label: "Customs Window", value: "customs" },
            { label: "Splink", value: "splink" },
            { label: "Workflow", value: "workflow" },
            { label: "Linkie", value: "linkie" },
        ],
    },
    {
        title: "Team",
        options: [
            { label: "Jenna", value: "jenna" },
            { label: "Mark", value: "mark" },
            { label: "Tom", value: "tom" },
            { label: "Greg", value: "greg" },
            { label: "Keith", value: "keith" },
            { label: "Dayo", value: "dayo" },
            { label: "Florencia", value: "florencia" },
        ],
    },
    {
        title: "Tags",
        options: [
            { label: "Design", value: "design" },
            { label: "Develop", value: "develop" },
            { label: "Finance", value: "finance" },
        ],
    },
    {
        title: "Statuses",
        options: [
            { label: "Pending", value: "pending" },
            { label: "Completed", value: "completed" },
            { label: "Not Started", value: "not-started" },
            { label: "Problem", value: "problem" },
            { label: "In Progress", value: "in-progress" },
            { label: "On Hold", value: "on-hold" },
        ],
    },
]
export const filterData: Record<string, string[]> = {
    Priority: Array.from({ length: 5 }, (_, i) => `Priority ${i + 1}`),
    Projects: Array.from({ length: 5 }, (_, i) => `Project ${i + 1}`),
    Team: Array.from({ length: 6 }, (_, i) => `Team ${i + 1}`),
    Tags: Array.from({ length: 7 }, (_, i) => `Tag ${i + 1}`),
    Statuses: Array.from({ length: 4 }, (_, i) => `Status ${i + 1}`),
}
