export const taskData = {
    description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vero blanditiis earum natus veritatis deleniti voluptate nihil doloremque totam saepe?",

    updates: [
        {
            id: 1,
            name: "Alice Danchik",
            time: "15:59 Tue 12 Oct 23",
            message:
                "Long before you sit dow to put digital pen to paper you need to make sure you have to sit down and write.",
            avatar: "/media/avatars/150-11.jpg",
        },

        {
            id: 2,
            name: "Harris Bold",
            time: "10:54 Mon 11 Oct 23",
            message:
                "Outlines keep you honest. They stop you from indulging in poorly written structure.",
            initials: "H",
        },
    ],

    checklist: [
        {
            id: 1,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            checked: true,
        },

        {
            id: 2,
            text: "Sapiente perferendis dicta praesentium nemo sint neque.",
            checked: false,
        },
    ],

    notes: [
        {
            id: 1,
            name: "Alice Danchik",
            time: "15:59 Tue 12 Oct 23",
            message:
                "Long before you sit down to write you need to organize your thoughts properly.",
            avatar: "/media/avatars/150-11.jpg",
        },
        {
            id: 2,
            name: "Harris Bold",
            time: "10:54 Mon 11 Oct 23",
            message: "Outlines keep you honest and help structure complex writing properly.",
            initials: "H",
        },
    ],

    links: [
        {
            id: 1,
            name: "Mark",
            time: "15:59 Tue 12 Oct 23",
            title: "google.com",
            url: "https://www.google.com",
        },
        {
            id: 2,
            name: "Paul",
            time: "10:54 Mon 11 Oct 23",
            title: "Latest Digital Consumer Trends",
            url: "https://example.com",
        },
    ],
    attachments: [
        {
            id: 1,
            image: "/media/demos/demo1.png",
        },
        {
            id: 2,
            image: "/media/demos/demo2.png",
        },
        {
            id: 3,
            image: "/media/demos/demo1.png",
        },
        {
            id: 4,
            image: "/media/demos/demo2.png",
        },
    ],
    history: [
        {
            id: 1,
            time: "24 Oct (09:26)",
            badgeCss: "purple",
            name: "Updated From 70% to 90% (Paul)",
        },
        {
            id: 2,
            time: "23 Oct (18:01)",
            badgeCss: "orange",
            name: "Update Requested (Mark)",
        },
        {
            id: 3,
            time: "22 Oct (10:44)",
            badgeCss: "purple",
            name: "Updated From 30% to 50% (Mark)",
        },
    ],
    voiceNotes: [
        {
            id: 1,
            title: "Client Meeting Notes",
            duration: "02:14",
            audio: "/assets/media/audio/note1.mp3",
        },
        {
            id: 2,
            title: "Project Discussion",
            duration: "01:32",
            audio: "/assets/media/audio/note2.mp3",
        },
    ],
    dueDate: "2025-09-19",
    createdDate: "2025-07-09",
    priorityOptions: [
        {
            label: "High",
            value: "High",
            data: {
                inputType: "radio",
                name: "company",
                className: "form-check-input",
            },
        },
        {
            label: "Medium",
            value: "Medium",
            data: {
                inputType: "radio",
                name: "company",
                className: "form-check-input",
            },
        },
        {
            label: "Low",
            value: "Low",
            data: {
                inputType: "radio",
                name: "company",
                className: "form-check-input",
            },
        },
    ],

    progressOptions: Array.from({ length: 21 }, (_, index) => {
        const value = `${index * 5}%`

        return {
            label: value,
            value,
            data: {
                inputType: "radio",
                name: "company",
                className: "form-check-input",
            },
        }
    }),
    // taskData.team.ts (or inside taskData)

    team: [
        {
            id: 1,
            name: "Jenna",
            avatar: "/media/avatars/150-8.jpg",
            initial: "J",
            visible: true,
            assign: true,
        },
        {
            id: 2,
            name: "Grainne",
            avatar: "/media/avatars/150-8.jpg",
            initial: "G",
            visible: true,
            assign: false,
        },
        {
            id: 3,
            name: "Paul",
            avatar: "/media/avatars/150-8.jpg",
            initial: "P",
            visible: true,
            assign: true,
        },
        {
            id: 4,
            name: "Keith",
            avatar: "/media/avatars/150-8.jpg",
            initial: "K",
            visible: true,
            assign: false,
        },
        {
            id: 5,
            name: "Mark",
            avatar: "/media/avatars/150-8.jpg",
            initial: "M",
            visible: true,
            assign: false,
        },
        {
            id: 6,
            name: "Naga",
            avatar: "/media/avatars/150-8.jpg",
            initial: "N",
            visible: true,
            assign: false,
        },
    ],
    tags: [
        "Get requirement",
        "Design UI",
        "Design data",
        "Implement",
        "Test",
        "Fix Bug",
        "Build",
        "Deploy",
        "Copywriting",
        "Interaction",
    ],
    timeRequired: [5, 10, 15, 20, 25, 30, 45, 60, 90, 120],
    switchers: [
        { id: "ml", label: "ML", enabled: false },
        { id: "iul", label: "IUL", enabled: true },
    ],
    mirroredSections: [
        { id: 1, label: "Goals", checked: true },
        { id: 2, label: "Schedule", checked: false },
        { id: 3, label: "Roadmaps", checked: true },
        { id: 4, label: "Notes", checked: false },
    ],
}
