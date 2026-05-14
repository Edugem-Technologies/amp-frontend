/* eslint-disable @typescript-eslint/no-explicit-any */

type Task = {
    id: string
    label: string
    count: number
    bgColor?: string
    status?: string
    isStriked?: boolean
}

type ColumnType = {
    id: string
    title: string
    colPosition?: string
    items: Task[]
}
export type BoardType = {
    id: string
    dateLabel: string
    title: string
    columns: ColumnType[]
    routineData: any
}

export const INITIAL_BOARDS: BoardType[] = [
    {
        id: "board-1",
        dateLabel: "Sat 27 Jul",
        title: "Splink: Sales Strategy",
        routineData: [
            { id: "rt-1", label: "Gym", duration: 30 },
            { id: "rt-2", label: "Coffee", duration: 30 },
            { id: "rt-3", label: "Emails", duration: 30 },
            { id: "rt-4", label: "Reading", duration: 30 },
            { id: "rt-5", label: "Walk", duration: 30 },
            { id: "rt-6", label: "Reading", duration: 30 },
            { id: "rt-7", label: "Gym", duration: 30 },
            { id: "rt-8", label: "Coffee", duration: 30 },
            { id: "rt-9", label: "Emails", duration: 30 },
            { id: "rt-10", label: "Walk", duration: 30 },
            { id: "rt-11", label: "Gym", duration: 30 },
            { id: "rt-12", label: "Coffee", duration: 30 },
            { id: "rt-13", label: "Emails", duration: 30 },
            { id: "rt-14", label: "Reading", duration: 30 },
            { id: "rt-15", label: "Walk", duration: 30 },
        ],
        columns: [
            {
                id: "col-1",
                title: "Column 1",
                colPosition: "left",
                items: [
                    {
                        id: "1",
                        label: "XYZ Video",
                        count: 120,
                        bgColor: "rgba(24,28,50,0.2)",
                    },
                    {
                        id: "2",
                        label: "Splink Product Planning",
                        count: 240,
                        bgColor: "#dff8eb",
                        status: "completed",
                    },
                    {
                        id: "3",
                        label: "XYZ Product Meeting",
                        count: 120,
                        bgColor: "#dff8eb",
                        status: "completed",
                    },
                ],
            },

            {
                id: "col-2",
                title: "Column 2",
                colPosition: "right",
                items: [
                    {
                        id: "4",
                        label: "Website",
                        count: 30,
                    },
                    {
                        id: "5",
                        label: "PWC Deck",
                        count: 30,
                    },
                    {
                        id: "6",
                        label: "Solutions Meeting",
                        count: 30,
                    },
                ],
            },
        ],
    },

    {
        id: "board-2",
        dateLabel: "Sun 28 Jul",
        title: "XYZ: Global Payments",
        routineData: [
            { id: "rt-16", label: "Gym", duration: 30 },
            { id: "rt-17", label: "Coffee", duration: 30 },
            { id: "rt-18", label: "Emails", duration: 30 },
            { id: "rt-19", label: "Reading", duration: 30 },
            { id: "rt-20", label: "Walk", duration: 30 },
        ],
        columns: [
            {
                id: "col-3",
                title: "Column 1",
                colPosition: "left",
                items: [
                    {
                        id: "7",
                        label: "Recurring Payments Review",
                        count: 30,
                    },
                    {
                        id: "8",
                        label: "5 Free Partners",
                        count: 30,
                        isStriked: true,
                    },
                ],
            },

            {
                id: "col-4",
                title: "Column 2",
                colPosition: "right",
                items: [],
            },
        ],
    },

    {
        id: "board-3",
        dateLabel: "Mon 29 Jul",
        title: "Outmin: New TDP",
        routineData: [],
        columns: [
            {
                id: "col-5",
                title: "Column 1",
                colPosition: "left",
                items: [
                    {
                        id: "10",
                        label: "XYZ Video",
                        count: 120,
                        bgColor: "#dff8eb",
                        status: "completed",
                    },
                ],
            },

            {
                id: "col-6",
                title: "Column 2",
                colPosition: "right",
                items: [
                    {
                        id: "11",
                        label: "Recurring Payments Review",
                        count: 30,
                    },
                    {
                        id: "12",
                        label: "Solutions Meeting",
                        count: 30,
                    },
                ],
            },
        ],
    },
]
