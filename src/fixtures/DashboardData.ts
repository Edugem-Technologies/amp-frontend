export const dashboardData = {
    // MARKETPLACE / MERCHANTS
    marketplace: [
        {
            name: "XYZ",
            revenue: 747876,
            currency: "€",
            period: "pm",
            users: "56 Merchants",
        },
        {
            name: "Splink",
            revenue: 87451,
            currency: "€",
            period: "pm",
            users: "102 Merchants",
        },
        {
            name: "FlexEcom",
            revenue: 126989,
            currency: "€",
            period: "pm",
            users: "18 Merchants",
        },
        {
            name: "Outmin",
            revenue: 76989,
            currency: "€",
            period: "mr",
            users: "12 clients",
        },
        {
            name: "Linkie",
            revenue: 76989,
            currency: "",
            period: "",
            users: "Downloads",
        },
        {
            name: "Outmin",
            revenue: 76989,
            currency: "€",
            period: "mr",
            users: "12 clients",
        },
        {
            name: "Linkie",
            revenue: 76989,
            currency: "",
            period: "",
            users: "Downloads",
        },
        {
            name: "Outmin",
            revenue: 76989,
            currency: "€",
            period: "mr",
            users: "12 clients",
        },
        {
            name: "Linkie",
            revenue: 76989,
            currency: "",
            period: "",
            users: "Downloads",
        },
    ],

    progressCharts: {
        weeklySales: {
            title: "Weekly Sales",
            subTitle: "Your weekly Sales Chart",
            delta: 100,

            data: [
                { month: "Jan", value: 20 },
                { month: "Feb", value: 25 },
                { month: "Mar", value: 22 },
                { month: "Apr", value: 30 },
                { month: "May", value: 35 },
                { month: "Jun", value: 28 },
                { month: "Jul", value: 32 },
                { month: "Aug", value: 36 },
                { month: "Sep", value: 34 },
                { month: "Oct", value: 38 },
                { month: "Nov", value: 40 },
                { month: "Dec", value: 42 },
            ],
        },

        authorsProgress: {
            title: "Authors Progress",
            subTitle: "Marketplace Authors Chart",
            delta: -260,

            data: [
                { month: "Jan", value: 40 },
                { month: "Feb", value: 45 },
                { month: "Mar", value: 50 },
                { month: "Apr", value: 48 },
                { month: "May", value: 42 },
                { month: "Jun", value: 38 },
                { month: "Jul", value: 41 },
                { month: "Aug", value: 44 },
                { month: "Sep", value: 46 },
                { month: "Oct", value: 43 },
                { month: "Nov", value: 40 },
                { month: "Dec", value: 39 },
            ],
        },
    },

    // MEETINGS / EVENTS
    meetings: [
        {
            id: 1,
            title: "Meeting Schedule",
            time: "3:30 PM - 4:20 PM",
            description: "Create a headline that is informative and will capture readers",
        },
        {
            id: 1,
            title: "Meeting Schedule",
            time: "03 May 2020",
            description: "Great blog posts don’t just happen Even the best bloggers need it",
        },
        {
            id: 1,
            title: "UI Conference",
            time: "10AM Jan, 2021",
            description: "AirWays - A Front-end solution for airlines build with ReactJS",
        },
    ],
    areaCharts: {
        salesChange: {
            value_about: "Sales Change",
            value: "+256",

            data: [
                { month: "Jan", value: 30 },
                { month: "Feb", value: 25 },
                { month: "Mar", value: 28 },
                { month: "Apr", value: 32 },
                { month: "May", value: 31 },
                { month: "Jun", value: 40 },
            ],
        },

        weeklyIncome: {
            value_about: "Weekly Income",
            value: "750$",

            data: [
                { month: "Jan", value: 50 },
                { month: "Feb", value: 45 },
                { month: "Mar", value: 48 },
                { month: "Apr", value: 46 },
                { month: "May", value: 49 },
                { month: "Jun", value: 55 },
            ],
        },

        newUsers: {
            value_about: "New Users",
            value: "+6.6K",

            data: [
                { month: "Jan", value: 60 },
                { month: "Feb", value: 58 },
                { month: "Mar", value: 52 },
                { month: "Apr", value: 54 },
                { month: "May", value: 56 },
                { month: "Jun", value: 65 },
            ],
        },
    },

    salesStats: {
        shoppingCart: {
            title: "Shopping Cart",
            desc: "Lands, Houses, Ranchos, Farms",
            bgCardColor: "rgba(250, 97, 96, 1)",
        },
        apartments: {
            title: "Apartments",
            desc: "Flats, Shared Rooms, Duplex",
            bgCardColor: "rgba(23, 222, 134, 1)",
        },
        salesStats: {
            title: "Sales Stats",
            desc: "50% incresed for FY20",
            bgCardColor: "rgba(23, 222, 134, 1)",
        },
    },
    businessStats: {
        sapProgress: {
            statNum: "500M",
            currency: "$",
            desc: "SAP UI PROGRESS",
        },
        newCustomers: {
            statNum: "+3000",
            currency: "",
            desc: "NEW CUSTOMERS",
        },
        milestoneReached: {
            statNum: "500000",
            currency: "$",
            desc: "Milestone Reached",
        },
        milestoneReachedBar: {
            statNum: "500000",
            currency: "$",
            desc: "Milestone Reached",
        },
    },
    userDetails: [
        { name: "Arthur Goldstain", designation: "System & Software Architect" },
        { name: "Lisa Bold", designation: "Marketing & Finance Manager" },
        { name: "Nick Stone", designation: "Customer Support Team" },
    ],
    kpis: [
        {
            id: "projectProgress",
            title: "Project Progress",
            value: 50,
            unit: "%",
            subtitle: "Average",
            color: "green",
            progress: 0.5,
        },
        {
            id: "companyFinance",
            title: "Company Finance",
            value: 15,
            unit: "%",
            subtitle: "48k Goal",
            color: "yellow",
            progress: 0.15,
        },
        {
            id: "marketingAnalysis",
            title: "Marketing Analysis",
            value: 76,
            unit: "%",
            subtitle: "400k Impressions",
            color: "green",
            progress: 0.76,
        },
    ],

    // =========================
    // BAR CHARTS
    // =========================
    barCharts: {
        recentStatistics: {
            categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            series: [
                {
                    name: "Net Profit",
                    data: [45, 55, 60, 58, 61, 65],
                },
                {
                    name: "Revenue",
                    data: [70, 85, 95, 92, 88, 98],
                },
            ],
        },

        recentTasks: {
            categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            series: [
                {
                    name: "Completed Tasks",
                    data: [40, 55, 58, 56, 60, 57],
                },
                {
                    name: "Total Tasks",
                    data: [75, 85, 98, 95, 90, 100],
                },
            ],
        },
    },
}
