// pipeline.static.ts

import { PipelineDashboardData } from "@/types/common/PiplineStats"

export const PIPELINE_DASHBOARD_DATA: PipelineDashboardData = {
    header: {
        title: "XYZ Pipeline",
        subtitle: "High Level Stats",
    },

    stats: [
        {
            title: "90%",
            amount: 47876,
            deals: 7,
        },
        {
            title: "Live Next 7 Days",
            amount: 12912,
            deals: 2,
        },
        {
            title: "Won (Last 7 Days)",
            amount: 18450,
            deals: 3,
        },
        {
            title: "Won (Total)",
            amount: 158000,
            deals: 15,
        },
    ],

    chart: {
        currency: "€",
        points: [
            { weekLabel: "Week 01", value: 160 },
            { weekLabel: "Week 02", value: 110 },
            { weekLabel: "Week 03", value: 171 },
            { weekLabel: "Week 04", value: 160 },
            { weekLabel: "Week 05", value: 150 },
        ],
    },

    upcomingPlans: {
        header: {
            title: "Going Live (Next 7 Days)",
        },
        items: [
            {
                id: "gl-1",
                title: "Merchant Onboarding: Complete KYC for new merchants",
                subtitle: "This is the latest text update",
                users: [{ id: "u1", avatarUrl: "/images/avatars/150-1.jpg" }],
                badgeCount: 6,
            },
            {
                id: "gl-2",
                title: "Payment Gateway: Final integration and smoke testing",
                subtitle: "This is the latest text update",
                users: [
                    { id: "u2", avatarUrl: "/images/avatars/150-1.jpg" },
                    { id: "u3", avatarUrl: "/images/avatars/150-1.jpg" },
                ],
                badgeCount: 10,
            },
            {
                id: "gl-3",
                title: "Compliance: Finalize PCI DSS documentation",
                subtitle: "This is the latest text update",
                users: [
                    { id: "u2", avatarUrl: "/images/avatars/150-1.jpg" },
                    { id: "u3", avatarUrl: "/images/avatars/150-1.jpg" },
                ],
                badgeCount: 6,
            },
            {
                id: "gl-4",
                title: "Training: Conduct merchant training sessions",
                subtitle: "This is the latest text update",
                users: [{ id: "u4", avatarUrl: "/images/avatars/150-1.jpg" }],
                badgeCount: 5,
            },
            {
                id: "gl-5",
                title: "Go-Live Checklist: Final review and sign-off",
                subtitle: "This is the latest text update",
                users: [{ id: "u5", initials: "N" }],
                badgeCount: 5,
            },
        ],
    },
}

export const PIPELINES_CHECKLIST = [
    {
        id: "1",
        label: "Complete (Won)",
        taskCheckList: [
            {
                id: "c1",
                label: "Recurring Payments Review",
                desc: "This is the latest text update",
                users: [
                    { name: "User1", avatar: "/images/avatars/150-1.jpg" },
                    { name: "User2", avatar: "/images/avatars/150-3.jpg" },
                ],
            },
            {
                id: "c2",
                label: "Linkie Leads List",
                desc: "This is the latest text update",
                users: [{ name: "User3", avatar: "/images/avatars/150-4.jpg" }],
            },
            {
                id: "c3",
                label: "LyttleINC Reporting",
                desc: "This is the latest text update",
                users: [{ name: "User4", avatar: "/images/avatars/150-5.jpg" }],
            },
            {
                id: "c4",
                label: "Custom Window Solutions...",
                desc: "This is the latest text update",
                users: [
                    { name: "User5", avatar: "/images/avatars/150-6.jpg" },
                    { name: "User6", avatar: "/images/avatars/150-8.jpg" },
                ],
            },
        ],
    },

    {
        id: "2",
        label: "Verbally Agreed (90%)",
        taskCheckList: [
            {
                id: "c5",
                label: "LyttleINC Reporting",
                desc: "This is the latest text update",
                users: [
                    { name: "User1", avatar: "/images/avatars/150-9.jpg" },
                    { name: "User2", avatar: "/images/avatars/150-11.jpg" },
                ],
            },
            {
                id: "c6",
                label: "Custom Window Solutions...",
                desc: "This is the latest text update",
                users: [{ name: "User3", avatar: "/images/avatars/150-26.jpg" }],
            },
            {
                id: "c7",
                label: "XYZ Website",
                desc: "This is the latest text update",
                users: [{ name: "User4", avatar: "/images/avatars/150-3.jpg" }],
            },
            {
                id: "c8",
                label: "LyttleINC Reporting",
                desc: "This is the latest text update",
                users: [
                    { name: "User5", avatar: "/images/avatars/150-4.jpg" },
                    { name: "User6", avatar: "/images/avatars/150-5.jpg" },
                ],
            },
        ],
    },

    {
        id: "3",
        label: "Interested (50%)",
        taskCheckList: [
            {
                id: "c9",
                label: "Custom Window Solutions...",
                desc: "This is the latest text update",
                users: [
                    { name: "User1", avatar: "/images/avatars/150-6.jpg" },
                    { name: "User2", avatar: "/images/avatars/150-8.jpg" },
                ],
            },
            {
                id: "c10",
                label: "Custom Window Solutions...",
                desc: "This is the latest text update",
                users: [{ name: "User3", avatar: "/images/avatars/150-9.jpg" }],
            },
            {
                id: "c11",
                label: "Outmin Proposal Deck",
                desc: "This is the latest text update",
                users: [{ name: "User4", avatar: "/images/avatars/150-11.jpg" }],
            },
        ],
    },

    {
        id: "4",
        label: "Awaiting Demo",
        taskCheckList: [
            {
                id: "c12",
                label: "Outmin Proposal Deck",
                desc: "This is the latest text update",
                users: [{ name: "User1", avatar: "/images/avatars/150-26.jpg" }],
            },
        ],
    },

    {
        id: "5",
        label: "Qualified",
        taskCheckList: [
            {
                id: "c13",
                label: "Splink 5 Free Partners",
                desc: "This is the latest text update",
                users: [{ name: "User1", avatar: "/images/avatars/150-1.jpg" }],
            },
            {
                id: "c14",
                label: "Outmin Stage 03s Reviews",
                desc: "This is the latest text update",
                users: [{ name: "User2", avatar: "/images/avatars/150-3.jpg" }],
            },
            {
                id: "c15",
                label: "Custom Window Solutions...",
                desc: "This is the latest text update",
                users: [{ name: "User3", avatar: "/images/avatars/150-4.jpg" }],
            },
            {
                id: "c16",
                label: "Outmin Stage 03s Reviews",
                desc: "This is the latest text update",
                users: [{ name: "User4", avatar: "/images/avatars/150-5.jpg" }],
            },
        ],
    },
]
