import { IconName } from "@/app/components/icons/IconMap"

export interface ChartData {
    data: Record<string, number | string>[]
}

export interface ProgressChartItf {
    title: string
    subTitle: string
    delta: number
    chartFillColor: string
    iconBgClass?: string
    textColorClass: string
    data: Record<string, number | string>[]
    value_about?: string
    value?: string
    iconName?: IconName
    currency?: string
}

export interface MeetingsDataItf {
    id: number
    title: string
    time: string
    description: string
    amount?: number
}

export interface CardDropdownOptionItf {
    id: string
    type: string
    label?: string
    placeholder?: string
    options?: {
        label: string
        value: string
    }[]
    defaultValue?: string | string[] | boolean
    value?: string | boolean
    children?: CardDropdownOptionItf[]
}

export interface HeaderItf {
    title: string
    description?: string
}

export interface TaskItemItf {
    id: string
    title: string
    role?: string
    due?: string
    color: string
    completion?: number
    brandIcon?: string
}

export interface TaskNTodoDataItf {
    header: HeaderItf
    tasks?: TaskItemItf[]
    todos?: TaskItemItf[]
}

export interface SalesChartDataPoint {
    month: string
    [key: string]: string | number
}

export interface SalesChartCard {
    title: string
    icon: string
    bgColor: string
    textColor: string
    svgBtnClass: string
    value?: number | string
}
export interface SalesChartSummary {
    label: string
    value: string | number
}

export interface EnclosedChartWrapperIntf {
    id?: string
    title: string
    lineColor?: string
    chartFillColor: string
    data?: SalesChartDataPoint[]
    chart?: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: any
    }
    cards?: SalesChartCard[]
    summary?: SalesChartSummary[]
    lineWidth?: number
    currency?: string
    amount?: number | string
    trend?: string
    growth?: number
    growthLabel?: string
}

export interface SubscriptionDataIntf {
    id: string
    logo: string
    title: string
    dueDate: string
    progress: number
    progressColor: string
    team?: {
        id: string
        name: string
        image: string
    }[]
}
