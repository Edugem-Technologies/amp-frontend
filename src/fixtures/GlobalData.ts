export type ActionButton = {
    id: string
    label: string
    icon: string
}

export type Status = {
    id: string
    label: string
}

export type TaskCheckItem = {
    id: string
    label: string
    progress: number | null
    status: string
}

export type Fence = {
    id: string
    label: string
    tasks: FenceTask[]
    taskCheckList: TaskCheckItem[]
}

export type FenceTask = {
    id: string
    title: string
    subtitle: string
    currentStatus: string
    statusList: Status[]
    users: string[]
    progressValue: number
    actions: ActionButton[]
}

export const STATUS_LIST = [
    { id: "pending", label: "Pending" },
    { id: "inprogress", label: "In Progress" },
    { id: "completed", label: "Completed" },
    { id: "notstarted", label: "Not Started" },
    { id: "problem", label: "Problem" },
    { id: "onhold", label: "On Hold" },
    { id: "blocked", label: "Blocked" },
]

export const ACTION_BUTTONS = [
    {
        id: "delete",
        label: "Delete",
        icon: "/images/logos/action-buttons/delete.svg",
    },
    {
        id: "favourite",
        label: "Favourite",
        icon: "/images/logos/action-buttons/star.svg",
    },
    {
        id: "request",
        label: "Request",
        icon: "/images/logos/action-buttons/bolt.svg",
    },
    {
        id: "complete",
        label: "Complete",
        icon: "/images/logos/action-buttons/check.svg",
    },
]

export const FENCES_FIXTURE = [
    {
        id: "this-week",
        label: "This Week",
        tasks: [
            {
                id: "t1",
                title: "XYZ Video: Create new video to showcase the standalone server",
                subtitle: "Deck created and shared with ML (Paul · 2hr 22mins)",
                currentStatus: "completed",
                statusList: STATUS_LIST,
                users: [
                    "/images/avatars/150-1.jpg",
                    "/images/avatars/150-3.jpg",
                    "/images/avatars/150-6.jpg",
                    "/images/avatars/150-11.jpg",
                ],
                actions: ACTION_BUTTONS,
                progressValue: 60,
            },
            {
                id: "t2",
                title: "GP Integration: Review and bottom out",
                subtitle: "Most of the integration is done and expected for Wed",
                currentStatus: "inprogress",
                statusList: STATUS_LIST,
                users: ["/images/avatars/150-8.jpg", "/images/avatars/150-11.jpg"],
                actions: ACTION_BUTTONS,
                progressValue: 100,
            },
            {
                id: "t3",
                title: "Stack Deck: Create new deck for stack",
                subtitle: "Asked Keith to prioritise today (Connor · 9hr 7mins)",
                currentStatus: "completed",
                statusList: STATUS_LIST,
                users: [
                    "/images/avatars/150-4.jpg",
                    "/images/avatars/150-5.jpg",
                    "/images/avatars/150-26.jpg",
                    "/images/avatars/150-11.jpg",
                ],
                actions: ACTION_BUTTONS,
                progressValue: 80,
            },
            {
                id: "t4",
                title: "New Deck: Provide feedback",
                subtitle: "Deck created and shared with ML",
                currentStatus: "notstarted",
                statusList: STATUS_LIST,
                users: ["/images/avatars/150-1.jpg"],
                actions: ACTION_BUTTONS,
                progressValue: 10,
            },
            {
                id: "t5",
                title: "Sales Hire: Post job",
                subtitle: "JD ready, pending approval",
                currentStatus: "pending",
                statusList: STATUS_LIST,
                users: [],
                actions: ACTION_BUTTONS,
                progressValue: 20,
            },
        ],
        taskCheckList: [
            { id: "c1", label: "Inflight Prototype", progress: 20, status: "inprogress" },
            { id: "c2", label: "XYZ Website", progress: null, status: "rejected" },
            { id: "c3", label: "Outmin PWC Check", progress: 40, status: "inprogress" },
            { id: "c4", label: "Outmin Responsibilities", progress: 60, status: "inprogress" },
        ],
    },
    {
        id: "next-week",
        label: "Next Week",
        tasks: [
            {
                id: "t1",
                title: "XYZ Video: Create new video to showcase the standalone server",
                subtitle: "Deck created and shared with ML (Paul · 2hr 22mins)",
                currentStatus: "problem",
                statusList: STATUS_LIST,
                users: [
                    "/images/avatars/150-1.jpg",
                    "/images/avatars/150-26.jpg",
                    "/images/avatars/150-6.jpg",
                    "/images/avatars/150-11.jpg",
                ],
                actions: ACTION_BUTTONS,
                progressValue: 30,
            },
            {
                id: "t2",
                title: "GP Integration: Review and bottom out",
                subtitle: "Most of the integration is done and expected for Wed",
                currentStatus: "inprogress",
                statusList: STATUS_LIST,
                users: [
                    "/images/avatars/150-4.jpg",
                    "/images/avatars/150-6.jpg",
                    "/images/avatars/150-8.jpg",
                ],
                actions: ACTION_BUTTONS,
                progressValue: 50,
            },
            {
                id: "t3",
                title: "Stack Deck: Create new deck for stack",
                subtitle: "Asked Keith to prioritise today (Connor · 9hr 7mins)",
                currentStatus: "completed",
                statusList: STATUS_LIST,
                users: ["/images/avatars/150-4.jpg"],
                actions: ACTION_BUTTONS,
                progressValue: 50,
            },
            {
                id: "t4",
                title: "New Deck: Provide feedback",
                subtitle: "Deck created and shared with ML",
                currentStatus: "notstarted",
                statusList: STATUS_LIST,
                users: ["/images/avatars/150-8.jpg"],
                actions: ACTION_BUTTONS,
                progressValue: 50,
            },
            {
                id: "t5",
                title: "Sales Hire: Post job",
                subtitle: "JD ready, pending approval",
                currentStatus: "pending",
                statusList: STATUS_LIST,
                users: [],
                actions: ACTION_BUTTONS,
                progressValue: 50,
            },
        ],
        taskCheckList: [
            { id: "c1", label: "Inflight Prototype", progress: 20, status: "inprogress" },
            { id: "c2", label: "XYZ Website", progress: null, status: "rejected" },
            { id: "c3", label: "Outmin PWC Check", progress: 40, status: "inprogress" },
            { id: "c4", label: "Outmin Responsibilities", progress: 60, status: "inprogress" },
        ],
    },
]

export const STATUS_COLOR_MAP: Record<string, string> = {
    notstarted: "#fff1e5",
    completed: "#ffffff",
    problem: "#ffe5e5",
    pending: "#fffbe6",
    inprogress: "#e5f0ff",
    onhold: "#f0f0f0",
    blocked: "#ffd6d6",
}

export const getStatusColor = (statusId: string): string => {
    return STATUS_COLOR_MAP[statusId] || "#ffffff"
}
