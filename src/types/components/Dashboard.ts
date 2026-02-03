// =========================
// COMMON TYPES
// =========================
export type MonthlyDataPoint = {
    month: string
    value: number
}

export type CurrencyPeriod = {
    currency: string
    period: string
}

// =========================
// MARKETPLACE
// =========================
export type MarketplaceItem = {
    name: string
    revenue: number
    currency: string
    period: string
    users: string
}

// =========================
// PROGRESS CHARTS
// =========================
export type ProgressChart = {
    title: string
    subTitle: string
    delta: number
    data: MonthlyDataPoint[]
}

export type ProgressCharts = {
    weeklySales: ProgressChart
    authorsProgress: ProgressChart
}

// =========================
// MEETINGS / EVENTS
// =========================
export type Meeting = {
    id: number
    title?: string
    date?: string
    time?: string
    description: string
}

// =========================
// AREA CHARTS
// =========================
export type AreaChart = {
    value_about: string
    value: string
    data: MonthlyDataPoint[]
}

export type AreaCharts = {
    salesChange: AreaChart
    weeklyIncome: AreaChart
    newUsers: AreaChart
}

// =========================
// SALES & BUSINESS STATS
// =========================
export type SalesStatItem = {
    title: string
    desc: string
}

export type SalesStats = {
    shoppingCart: SalesStatItem
    apartments: SalesStatItem
    salesStats: SalesStatItem
    bgCardColor: string
}

export type BusinessStatItem = {
    statNum: string
    currency: string
    desc: string
}

export type BusinessStats = {
    sapProgress: BusinessStatItem
    newCustomers: BusinessStatItem
    milestoneReached: BusinessStatItem
    milestoneReachedBar: BusinessStatItem
}

// =========================
// USER DETAILS
// =========================
export type UserDetail = {
    name: string
    designation: string
}

// =========================
// KPI
// =========================
export type KPI = {
    id: string
    title: string
    value: number
    unit: string
    subtitle: string
    color: string
    progress: number
}

export type BarChartSeries = {
    name: string
    data: number[]
}

export type BarChart = {
    categories: string[]
    series: BarChartSeries[]
}

export type BarCharts = {
    recentStatistics: BarChart
    recentTasks: BarChart
}

export type DashboardData = {
    marketplace: MarketplaceItem[]
    progressCharts: ProgressCharts
    meetings: Meeting[]
    areaCharts: AreaCharts
    salesStats: SalesStats
    businessStats: BusinessStats
    userDetails: UserDetail[]
    kpis: KPI[]
    barCharts: BarCharts
}
