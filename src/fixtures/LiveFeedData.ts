// activity.fixture.ts

export type ActivityStatus = "Update Requested" | "Update Added" | "Progress Update"

export interface ActivityUser {
    id: string
    name: string
    avatar?: string
    initials?: string
}

export interface ActivityItem {
    id: string
    title: string
    description: string
    status: ActivityStatus
    timeAgo: string
    user: ActivityUser
}

export const activityFixture = [
    {
        id: "1",
        title: "XYZ Video: Create new video to showcase the standalone server",
        description: "Deck created and shared with ML",
        status: "Update Requested",
        timeAgo: "Paul 2hr 22mins",
        user: {
            id: "u1",
            name: "Paul",
            avatar: "/images/avatars/150-3.jpg",
        },
    },
    {
        id: "2",
        title: "GP Integration: Review and bottom out",
        description: "Most of the Integration is done and expected for Wed",
        status: "Update Added",
        timeAgo: "Jenna 4hr 12mins",
        user: {
            id: "u2",
            name: "Jenna",
            avatar: "/images/avatars/150-1.jpg",
        },
    },
    {
        id: "3",
        title: "Stack Deck: Create new deck for stack",
        description: "Asked Keith to prioritise today",
        status: "Update Added",
        timeAgo: "Conor 9hr 7mins",
        user: {
            id: "u3",
            name: "Conor",
            avatar: "/images/avatars/150-4.jpg",
        },
    },
    {
        id: "4",
        title: "New Deck : Provide feedback",
        description: "Deck created and shared with ML",
        status: "Progress Update",
        timeAgo: "Paul 2hr 22mins",
        user: {
            id: "u4",
            name: "Florencia",
            avatar: "/images/avatars/150-9.jpg",
        },
    },
    {
        id: "5",
        title: "Sales Hire: Post job",
        description: "Most of the Integration is done and expected for Wed",
        status: "Progress Update",
        timeAgo: "Jenna 4hr 12mins",
        user: {
            id: "u5",
            name: "Nathan",
            initials: "N",
        },
    },
    {
        id: "6",
        title: "New Website: Plan new website and blocks",
        description: "Asked Keith to prioritise today",
        status: "Progress Update",
        timeAgo: "Conor 9hr 7mins",
        user: {
            id: "u6",
            name: "Keith",
            avatar: "/images/avatars/150-11.jpg",
        },
    },
    {
        id: "7",
        title: "GP Contract: Review and add comments",
        description: "Deck created and shared with ML",
        status: "Update Added",
        timeAgo: "Paul 2hr 22mins",
        user: {
            id: "u7",
            name: "Hannah",
            avatar: "/images/avatars/150-26.jpg",
        },
    },
    {
        id: "8",
        title: "Intern Contract: Review and add comments",
        description: "Most of the Integration is done and expected for Wed",
        status: "Progress Update",
        timeAgo: "Jenna 4hr 12mins",
        user: {
            id: "u8",
            name: "Conor",
            avatar: "/images/avatars/150-11.jpg",
        },
    },
    {
        id: "9",
        title: "17:15 09 Jul – Elements shared with freelancer",
        description: "Asked Keith to prioritise today",
        status: "Update Requested",
        timeAgo: "Conor 9hr 7mins",
        user: {
            id: "u9",
            name: "Paul",
            avatar: "",
        },
    },
]
