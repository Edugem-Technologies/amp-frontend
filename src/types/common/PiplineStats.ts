export type DealStat = {
    title: string
    amount: number
    deals: number
}

export type PipelineStatsSection = {
    pipeline: DealStat
    liveNext7Days: DealStat
    wonLast7Days: DealStat
    wonTotal: DealStat
}

/* =========================
   CHART SECTION (Apex)
========================= */

export type WeeklyChartPoint = {
    weekLabel: string
    value: number
}

export type PipelineChartData = {
    currency: string
    points: WeeklyChartPoint[]
}

/* =========================
   UPCOMING / GOING LIVE
========================= */

export type UserAvatar = {
    id: string
    avatarUrl?: string
    initials?: string
}

export type GoingLiveTask = {
    id: string
    title: string
    subtitle: string
    users: UserAvatar[]
    badgeCount: number
}

export type UpcomingPlansSection = {
    header: {
        title: string
        subtitle?: string
    }
    items: GoingLiveTask[]
}

/* =========================
   ROOT DASHBOARD TYPE
========================= */

export type PipelineDashboardData = {
    header: {
        title: string
        subtitle: string
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stats: any
    chart: PipelineChartData
    upcomingPlans: UpcomingPlansSection
}
