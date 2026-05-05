export const settingsData = {
    team: [
        {
            id: "1",
            name: "Mark Lyttleton",
            role: "Admin",
            email: "mark.l@example.com",
            status: "Active",
            profileImage: "/images/avatars/150-1.jpg",
        },
        {
            id: "2",
            name: "Adedayo Adelowokan",
            role: "Developer",
            email: "adedayo.a@example.com",
            status: "Active",
            profileImage: "/images/avatars/150-1.jpg",
        },
        {
            id: "3",
            name: "Jenna Keane",
            role: "Designer",
            email: "jenna.k@example.com",
            status: "Active",
            profileImage: "/images/avatars/150-1.jpg",
        },
        {
            id: "4",
            name: "Greg Keane",
            role: "QA Engineer",
            email: "greg.k@example.com",
            status: "Active",
            profileImage: "/images/avatars/150-1.jpg",
        },
        {
            id: "5",
            name: "Rebecca Stokes",
            role: "Business Analyst",
            email: "rebecca.s@example.com",
            status: "Inactive",
            profileImage: "/images/avatars/150-1.jpg",
        },
        {
            id: "6",
            name: "Olayide Oladimeji",
            role: "Team Member",
            email: "olayide.o@example.com",
            status: "Active",
            profileImage: "/images/avatars/150-1.jpg",
        },
        {
            id: "7",
            name: "Tom Wood",
            role: "Developer",
            email: "tom.w@example.com",
            status: "Inactive",
            profileImage: "/images/avatars/150-1.jpg",
        },
    ],

    projects: [
        { id: "1", name: "Outmin", status: "Active", logo: "/images/technology-logos/Angular.png" },
        { id: "2", name: "XYZ", status: "Active", logo: "/images/technology-logos/Angular.png" },
        {
            id: "3",
            name: "Customs Window",
            status: "Active",
            logo: "/images/technology-logos/Angular.png",
        },
        {
            id: "4",
            name: "Splink",
            status: "Inactive",
            logo: "/images/technology-logos/Angular.png",
        },
        {
            id: "5",
            name: "Workflow",
            status: "Active",
            logo: "/images/technology-logos/Angular.png",
        },
        { id: "6", name: "Linkie", status: "Active", logo: "/images/technology-logos/Angular.png" },
    ],

    roadmaps: [
        {
            id: "1",
            name: "Product Roadmap",
            assignedTeam: [
                {
                    id: "3",
                    name: "Jenna Keane",
                    role: "Designer",
                    email: "jenna.k@example.com",
                    status: "Active",
                    profileImage: "/images/avatars/150-1.jpg",
                },
                {
                    id: "5",
                    name: "Rebecca Stokes",
                    role: "Business Analyst",
                    email: "rebecca.s@example.com",
                    status: "Inactive",
                    profileImage: "/images/avatars/150-1.jpg",
                },
            ],
        },
        {
            id: "2",
            name: "Business Roadmap",
            assignedTeam: [
                {
                    id: "6",
                    name: "Olayide Oladimeji",
                    role: "Team Member",
                    email: "olayide.o@example.com",
                    status: "Active",
                    profileImage: "/images/avatars/150-1.jpg",
                },
                {
                    id: "2",
                    name: "Adedayo Adelowokan",
                    role: "Developer",
                    email: "adedayo.a@example.com",
                    status: "Active",
                    profileImage: "/images/avatars/150-1.jpg",
                },
            ],
        },
        {
            id: "3",
            name: "Business Roadmap",
            assignedTeam: [
                {
                    id: "1",
                    name: "Mark Lyttleton",
                    role: "Admin",
                    email: "mark.l@example.com",
                    status: "Active",
                    profileImage: "/images/avatars/150-1.jpg",
                },
                {
                    id: "2",
                    name: "Adedayo Adelowokan",
                    role: "Developer",
                    email: "adedayo.a@example.com",
                    status: "Active",
                    profileImage: "/images/avatars/150-1.jpg",
                },
            ],
        },
    ],

    pipeline: [
        {
            id: "1",
            name: "Outmin PWC Deck",
            status: "Complete (Won)",
            probability: "100%",
            assignedTeam: [
                {
                    id: "3",
                    name: "Jenna Keane",
                    role: "Designer",
                    email: "jenna.k@example.com",
                    status: "Active",
                    profileImage: "/images/avatars/150-1.jpg",
                },
                {
                    id: "5",
                    name: "Rebecca Stokes",
                    role: "Business Analyst",
                    email: "rebecca.s@example.com",
                    status: "Inactive",
                    profileImage: "/images/avatars/150-1.jpg",
                },
            ],
        },
        {
            id: "2",
            name: "XYZ Website",
            status: "Verbally Agreed (90%)",
            probability: "90%",
            assignedTeam: [
                {
                    id: "6",
                    name: "Olayide Oladimeji",
                    role: "Team Member",
                    email: "olayide.o@example.com",
                    status: "Active",
                    profileImage: "/images/avatars/150-1.jpg",
                },
                {
                    id: "2",
                    name: "Adedayo Adelowokan",
                    role: "Developer",
                    email: "adedayo.a@example.com",
                    status: "Active",
                    profileImage: "/images/avatars/150-1.jpg",
                },
            ],
        },
        {
            id: "3",
            name: "Outmin Proposal Deck",
            status: "Interested (50%)",
            probability: "50%",
            assignedTeam: [
                {
                    id: "2",
                    name: "Adedayo Adelowokan",
                    role: "Developer",
                    email: "adedayo.a@example.com",
                    status: "Active",
                    profileImage: "/images/avatars/150-1.jpg",
                },
            ],
        },
    ],
}

export const settingsTabs = [
    {
        id: "general",
        label: "General Settings",
        description: "The Core Settings",
        iconType: "crop_free",
    },
    { id: "team", label: "Team", description: "Manage team members", iconType: "groups" },
    {
        id: "projects",
        label: "Projects",
        description: "Create & organize projects",
        iconType: "category",
    },
    {
        id: "roadmaps",
        label: "Roadmaps",
        description: "Manage roadmaps & ordering",
        iconType: "view_timeline",
    },
    {
        id: "pipeline",
        label: "Pipeline",
        description: "Manage pipeline & ordering",
        iconType: "insights",
    },
]
