import { TaskSection } from "@/types/common/TeamSection"

export const TEAM_TASKS = [
    {
        id: "1",
        userName: "Jenna",
        userImage: "/images/avatars/150-1.jpg",
        taskCheckList: [
            {
                id: "c1",
                label: "Outmin Responsibilities",
                progress: 70,
            },
            {
                id: "c2",
                label: "Outmin PWC Deck",
                progress: 40,
            },
            {
                id: "c3",
                label: "Custom Window Solutions Meeting",
                progress: 80,
            },
            {
                id: "c4",
                label: "Recurring Payments Review",
                progress: 70,
            },
        ],
    },
    {
        id: "2",
        userName: "Mark",
        userImage: "/images/avatars/150-4.jpg",
        taskCheckList: [
            {
                id: "c5",
                label: "Outmin Responsibilities",
                progress: 70,
            },
            {
                id: "c6",
                label: "Outmin PWC Deck",
                progress: 40,
            },
            {
                id: "c7",
                label: "Custom Window Solutions Meeting",
                progress: 80,
            },
            {
                id: "c8",
                label: "Recurring Payments Review",
                progress: 70,
            },
        ],
    },
    {
        id: "3",
        userName: "Tom",
        userImage: "/images/avatars/150-3.jpg",
        taskCheckList: [
            {
                id: "c9",
                label: "Outmin Responsibilities",
                progress: 70,
            },
            {
                id: "c10",
                label: "Outmin PWC Deck",
                progress: 40,
            },
            {
                id: "c11",
                label: "Custom Window Solutions Meeting",
                progress: 80,
            },
            {
                id: "c12",
                label: "Recurring Payments Review",
                progress: 70,
            },
        ],
    },
    {
        id: "4",
        userName: "Greg",
        userImage: "/images/avatars/150-11.jpg",
        taskCheckList: [
            {
                id: "c13",
                label: "Outmin Responsibilities",
                progress: 70,
            },
            {
                id: "c14",
                label: "Outmin PWC Deck",
                progress: 40,
            },
            {
                id: "c15",
                label: "Custom Window Solutions Meeting",
                progress: 80,
            },
            {
                id: "c16",
                label: "Recurring Payments Review",
                progress: 70,
            },
        ],
    },
    {
        id: "5",
        userName: "Keith",
        userImage: "/images/avatars/150-26.jpg",
        taskCheckList: [
            {
                id: "c17",
                label: "Outmin Responsibilities",
                progress: 70,
            },
            {
                id: "c18",
                label: "Outmin PWC Deck",
                progress: 40,
            },
            {
                id: "c19",
                label: "Custom Window Solutions Meeting",
                progress: 80,
            },
            {
                id: "c20",
                label: "Recurring Payments Review",
                progress: 70,
            },
        ],
    },
    {
        id: "6",
        userName: "Dayo",
        userImage: "/images/avatars/150-8.jpg",
        taskCheckList: [
            {
                id: "c21",
                label: "Outmin Responsibilities",
                progress: 70,
            },
            {
                id: "c22",
                label: "Outmin PWC Deck",
                progress: 40,
            },
            {
                id: "c23",
                label: "Custom Window Solutions Meeting",
                progress: 80,
            },
            {
                id: "c24",
                label: "Recurring Payments Review",
                progress: 70,
            },
        ],
    },
    {
        id: "7",
        userName: "Florencia",
        userImage: "/images/avatars/150-9.jpg",
        taskCheckList: [
            {
                id: "c25",
                label: "Outmin Responsibilities",
                progress: 70,
            },
            {
                id: "c26",
                label: "Outmin PWC Deck",
                progress: 40,
            },
            {
                id: "c27",
                label: "Custom Window Solutions Meeting",
                progress: 80,
            },
            {
                id: "c28",
                label: "Recurring Payments Review",
                progress: 70,
            },
        ],
    },
]

// mockData.ts

export const TASK_SECTIONS: TaskSection[] = [
    {
        id: "jenna",
        name: "Jenna",
        rows: [
            {
                id: "task-001",
                title: "Create FireStibe branding logo, Customers Update and Project Meeting",
                assignedTo: "Me",
                progress: 0,
                priority: "High",
                details: {
                    category: "Interico",
                    priority: "High",
                    calendar: "14 Oct 2023",
                    progress: 0,
                    assignedTo: "Me",
                    dueDate: "14 Jul 22",
                    tags: ["Web", "UI", "UX"],
                    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla, maiores dolorum eum voluptas enim ad facere nemo cupiditate itaque. Sequi veniam quidem labore deleniti illo nisi, odio nobis maiores, quasi voluptatibus et fuga perspiciatis inventore tempora assumenda dicta ab corporis possimus! Similique, possimus vel exercitationem sed repellat maiores, laboriosam temporibus voluptatibus, fugiat accusantium incidunt sequi mollitia obcaecati officia pariatur aliquam.",
                    checklist: [
                        {
                            id: "chk-01",
                            label: "01 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-02",
                            label: "02 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-03",
                            label: "03 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-04",
                            label: "04 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-05",
                            label: "05 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-06",
                            label: "06 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-07",
                            label: "07 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                    ],

                    customDropdown: {
                        id: "custom-dd-1",
                        label: "Custom Drop Down",
                        value: "",
                        options: ["Option 1", "Option 2", "Option 3"],
                    },

                    media: [
                        {
                            id: "media-01",
                            name: "loremipsum.pdf",
                            type: "pdf",
                            url: "/files/loremipsum.pdf",
                            downloadable: true,
                        },
                    ],
                },
            },
            {
                id: "task-002",
                title: "Create FireStibe branding logo, Customers Update and Project Meeting",
                assignedTo: "Me",
                progress: 0,
                priority: "High",
                details: {
                    category: "Interico",
                    priority: "High",
                    calendar: "14 Oct 2023",
                    progress: 0,
                    assignedTo: "Me",
                    dueDate: "14 Jul 22",
                    tags: ["Web", "UI", "UX"],
                    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla, maiores dolorum eum voluptas enim ad facere nemo cupiditate itaque. Sequi veniam quidem labore deleniti illo nisi, odio nobis maiores, quasi voluptatibus et fuga perspiciatis inventore tempora assumenda dicta ab corporis possimus! Similique, possimus vel exercitationem sed repellat maiores, laboriosam temporibus voluptatibus, fugiat accusantium incidunt sequi mollitia obcaecati officia pariatur aliquam.",
                    checklist: [
                        {
                            id: "chk-01",
                            label: "01 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-02",
                            label: "02 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-03",
                            label: "03 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-04",
                            label: "04 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-05",
                            label: "05 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-06",
                            label: "06 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-07",
                            label: "07 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                    ],

                    customDropdown: {
                        id: "custom-dd-1",
                        label: "Custom Drop Down",
                        value: "",
                        options: ["Option 1", "Option 2", "Option 3"],
                    },

                    media: [
                        {
                            id: "media-01",
                            name: "loremipsum.pdf",
                            type: "pdf",
                            url: "/files/loremipsum.pdf",
                            downloadable: true,
                        },
                    ],
                },
            },
            {
                id: "task-003",
                title: "Create FireStibe branding logo, Customers Update and Project Meeting",
                assignedTo: "Me",
                progress: 0,
                priority: "High",
                details: {
                    category: "Interico",
                    priority: "High",
                    calendar: "14 Oct 2023",
                    progress: 0,
                    assignedTo: "Me",
                    dueDate: "14 Jul 22",
                    tags: ["Web", "UI", "UX"],
                    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla, maiores dolorum eum voluptas enim ad facere nemo cupiditate itaque. Sequi veniam quidem labore deleniti illo nisi, odio nobis maiores, quasi voluptatibus et fuga perspiciatis inventore tempora assumenda dicta ab corporis possimus! Similique, possimus vel exercitationem sed repellat maiores, laboriosam temporibus voluptatibus, fugiat accusantium incidunt sequi mollitia obcaecati officia pariatur aliquam.",
                    checklist: [
                        {
                            id: "chk-01",
                            label: "01 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-02",
                            label: "02 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-03",
                            label: "03 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-04",
                            label: "04 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-05",
                            label: "05 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-06",
                            label: "06 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-07",
                            label: "07 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                    ],

                    customDropdown: {
                        id: "custom-dd-1",
                        label: "Custom Drop Down",
                        value: "",
                        options: ["Option 1", "Option 2", "Option 3"],
                    },

                    media: [
                        {
                            id: "media-01",
                            name: "loremipsum.pdf",
                            type: "pdf",
                            url: "/files/loremipsum.pdf",
                            downloadable: true,
                        },
                    ],
                },
            },
            {
                id: "task-004",
                title: "Create FireStibe branding logo, Customers Update and Project Meeting",
                assignedTo: "Me",
                progress: 0,
                priority: "High",
                details: {
                    category: "Interico",
                    priority: "High",
                    calendar: "14 Oct 2023",
                    progress: 0,
                    assignedTo: "Me",
                    dueDate: "14 Jul 22",
                    tags: ["Web", "UI", "UX"],
                    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla, maiores dolorum eum voluptas enim ad facere nemo cupiditate itaque. Sequi veniam quidem labore deleniti illo nisi, odio nobis maiores, quasi voluptatibus et fuga perspiciatis inventore tempora assumenda dicta ab corporis possimus! Similique, possimus vel exercitationem sed repellat maiores, laboriosam temporibus voluptatibus, fugiat accusantium incidunt sequi mollitia obcaecati officia pariatur aliquam.",
                    checklist: [
                        {
                            id: "chk-01",
                            label: "01 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-02",
                            label: "02 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-03",
                            label: "03 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-04",
                            label: "04 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-05",
                            label: "05 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-06",
                            label: "06 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-07",
                            label: "07 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                    ],

                    customDropdown: {
                        id: "custom-dd-1",
                        label: "Custom Drop Down",
                        value: "",
                        options: ["Option 1", "Option 2", "Option 3"],
                    },

                    media: [
                        {
                            id: "media-01",
                            name: "loremipsum.pdf",
                            type: "pdf",
                            url: "/files/loremipsum.pdf",
                            downloadable: true,
                        },
                    ],
                },
            },
            {
                id: "task-005",
                title: "Create FireStibe branding logo, Customers Update and Project Meeting",
                assignedTo: "Me",
                progress: 0,
                priority: "High",
                details: {
                    category: "Interico",
                    priority: "High",
                    calendar: "14 Oct 2023",
                    progress: 0,
                    assignedTo: "Me",
                    dueDate: "14 Jul 22",
                    tags: ["Web", "UI", "UX"],
                    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla, maiores dolorum eum voluptas enim ad facere nemo cupiditate itaque. Sequi veniam quidem labore deleniti illo nisi, odio nobis maiores, quasi voluptatibus et fuga perspiciatis inventore tempora assumenda dicta ab corporis possimus! Similique, possimus vel exercitationem sed repellat maiores, laboriosam temporibus voluptatibus, fugiat accusantium incidunt sequi mollitia obcaecati officia pariatur aliquam.",
                    checklist: [
                        {
                            id: "chk-01",
                            label: "01 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-02",
                            label: "02 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-03",
                            label: "03 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-04",
                            label: "04 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-05",
                            label: "05 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-06",
                            label: "06 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-07",
                            label: "07 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                    ],

                    customDropdown: {
                        id: "custom-dd-1",
                        label: "Custom Drop Down",
                        value: "",
                        options: ["Option 1", "Option 2", "Option 3"],
                    },

                    media: [
                        {
                            id: "media-01",
                            name: "loremipsum.pdf",
                            type: "pdf",
                            url: "/files/loremipsum.pdf",
                            downloadable: true,
                        },
                    ],
                },
            },
        ],
    },
    {
        id: "mark",
        name: "Mark",
        rows: [
            {
                id: "task-002",
                title: "Create FireStibe branding logo, Customers Update and Project Meeting",
                assignedTo: "Me",
                progress: 0,
                priority: "High",
                details: {
                    category: "Interico",
                    priority: "High",
                    calendar: "14 Oct 2023",
                    progress: 0,
                    assignedTo: "Me",
                    dueDate: "14 Jul 22",

                    tags: ["Web", "UI", "UX"],

                    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla, maiores dolorum eum voluptas enim ad facere nemo cupiditate itaque. Sequi veniam quidem labore deleniti illo nisi, odio nobis maiores, quasi voluptatibus et fuga perspiciatis inventore tempora assumenda dicta ab corporis possimus! Similique, possimus vel exercitationem sed repellat maiores, laboriosam temporibus voluptatibus, fugiat accusantium incidunt sequi mollitia obcaecati officia pariatur aliquam.",

                    checklist: [
                        {
                            id: "chk-01",
                            label: "01 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-02",
                            label: "02 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-03",
                            label: "03 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-04",
                            label: "04 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-05",
                            label: "05 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-06",
                            label: "06 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-07",
                            label: "07 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                    ],

                    customDropdown: {
                        id: "custom-dd-1",
                        label: "Custom Drop Down",
                        value: "",
                        options: ["Option 1", "Option 2", "Option 3"],
                    },

                    media: [
                        {
                            id: "media-01",
                            name: "loremipsum.pdf",
                            type: "pdf",
                            url: "/files/loremipsum.pdf",
                            downloadable: true,
                        },
                    ],
                },
            },
            {
                id: "task-002",
                title: "Create FireStibe branding logo, Customers Update and Project Meeting",
                assignedTo: "Me",
                progress: 0,
                priority: "High",
                details: {
                    category: "Interico",
                    priority: "High",
                    calendar: "14 Oct 2023",
                    progress: 0,
                    assignedTo: "Me",
                    dueDate: "14 Jul 22",
                    tags: ["Web", "UI", "UX"],
                    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla, maiores dolorum eum voluptas enim ad facere nemo cupiditate itaque. Sequi veniam quidem labore deleniti illo nisi, odio nobis maiores, quasi voluptatibus et fuga perspiciatis inventore tempora assumenda dicta ab corporis possimus! Similique, possimus vel exercitationem sed repellat maiores, laboriosam temporibus voluptatibus, fugiat accusantium incidunt sequi mollitia obcaecati officia pariatur aliquam.",
                    checklist: [
                        {
                            id: "chk-01",
                            label: "01 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-02",
                            label: "02 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-03",
                            label: "03 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-04",
                            label: "04 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-05",
                            label: "05 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-06",
                            label: "06 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-07",
                            label: "07 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                    ],

                    customDropdown: {
                        id: "custom-dd-1",
                        label: "Custom Drop Down",
                        value: "",
                        options: ["Option 1", "Option 2", "Option 3"],
                    },

                    media: [
                        {
                            id: "media-01",
                            name: "loremipsum.pdf",
                            type: "pdf",
                            url: "/files/loremipsum.pdf",
                            downloadable: true,
                        },
                    ],
                },
            },
            {
                id: "task-003",
                title: "Create FireStibe branding logo, Customers Update and Project Meeting",
                assignedTo: "Me",
                progress: 0,
                priority: "High",
                details: {
                    category: "Interico",
                    priority: "High",
                    calendar: "14 Oct 2023",
                    progress: 0,
                    assignedTo: "Me",
                    dueDate: "14 Jul 22",
                    tags: ["Web", "UI", "UX"],
                    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla, maiores dolorum eum voluptas enim ad facere nemo cupiditate itaque. Sequi veniam quidem labore deleniti illo nisi, odio nobis maiores, quasi voluptatibus et fuga perspiciatis inventore tempora assumenda dicta ab corporis possimus! Similique, possimus vel exercitationem sed repellat maiores, laboriosam temporibus voluptatibus, fugiat accusantium incidunt sequi mollitia obcaecati officia pariatur aliquam.",
                    checklist: [
                        {
                            id: "chk-01",
                            label: "01 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-02",
                            label: "02 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-03",
                            label: "03 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-04",
                            label: "04 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-05",
                            label: "05 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-06",
                            label: "06 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-07",
                            label: "07 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                    ],

                    customDropdown: {
                        id: "custom-dd-1",
                        label: "Custom Drop Down",
                        value: "",
                        options: ["Option 1", "Option 2", "Option 3"],
                    },

                    media: [
                        {
                            id: "media-01",
                            name: "loremipsum.pdf",
                            type: "pdf",
                            url: "/files/loremipsum.pdf",
                            downloadable: true,
                        },
                    ],
                },
            },
            {
                id: "task-004",
                title: "Create FireStibe branding logo, Customers Update and Project Meeting",
                assignedTo: "Me",
                progress: 0,
                priority: "High",
                details: {
                    category: "Interico",
                    priority: "High",
                    calendar: "14 Oct 2023",
                    progress: 0,
                    assignedTo: "Me",
                    dueDate: "14 Jul 22",
                    tags: ["Web", "UI", "UX"],
                    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla, maiores dolorum eum voluptas enim ad facere nemo cupiditate itaque. Sequi veniam quidem labore deleniti illo nisi, odio nobis maiores, quasi voluptatibus et fuga perspiciatis inventore tempora assumenda dicta ab corporis possimus! Similique, possimus vel exercitationem sed repellat maiores, laboriosam temporibus voluptatibus, fugiat accusantium incidunt sequi mollitia obcaecati officia pariatur aliquam.",
                    checklist: [
                        {
                            id: "chk-01",
                            label: "01 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-02",
                            label: "02 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-03",
                            label: "03 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-04",
                            label: "04 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-05",
                            label: "05 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-06",
                            label: "06 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-07",
                            label: "07 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                    ],

                    customDropdown: {
                        id: "custom-dd-1",
                        label: "Custom Drop Down",
                        value: "",
                        options: ["Option 1", "Option 2", "Option 3"],
                    },

                    media: [
                        {
                            id: "media-01",
                            name: "loremipsum.pdf",
                            type: "pdf",
                            url: "/files/loremipsum.pdf",
                            downloadable: true,
                        },
                    ],
                },
            },
            {
                id: "task-005",
                title: "Create FireStibe branding logo, Customers Update and Project Meeting",
                assignedTo: "Me",
                progress: 0,
                priority: "High",
                details: {
                    category: "Interico",
                    priority: "High",
                    calendar: "14 Oct 2023",
                    progress: 0,
                    assignedTo: "Me",
                    dueDate: "14 Jul 22",
                    tags: ["Web", "UI", "UX"],
                    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla, maiores dolorum eum voluptas enim ad facere nemo cupiditate itaque. Sequi veniam quidem labore deleniti illo nisi, odio nobis maiores, quasi voluptatibus et fuga perspiciatis inventore tempora assumenda dicta ab corporis possimus! Similique, possimus vel exercitationem sed repellat maiores, laboriosam temporibus voluptatibus, fugiat accusantium incidunt sequi mollitia obcaecati officia pariatur aliquam.",
                    checklist: [
                        {
                            id: "chk-01",
                            label: "01 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-02",
                            label: "02 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-03",
                            label: "03 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-04",
                            label: "04 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-05",
                            label: "05 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-06",
                            label: "06 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                        {
                            id: "chk-07",
                            label: "07 : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae, consequatur.",
                            checked: false,
                        },
                    ],

                    customDropdown: {
                        id: "custom-dd-1",
                        label: "Custom Drop Down",
                        value: "",
                        options: ["Option 1", "Option 2", "Option 3"],
                    },

                    media: [
                        {
                            id: "media-01",
                            name: "loremipsum.pdf",
                            type: "pdf",
                            url: "/files/loremipsum.pdf",
                            downloadable: true,
                        },
                    ],
                },
            },
        ],
    },
]
