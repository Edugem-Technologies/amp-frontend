"use client"
import React, { useState } from "react"
import { dashboardData } from "@/fixtures/DashboardData"
import KpiCard from "@/app/components/common/KpiCard"
import ApexProgressLineWrapper from "@/app/components/apex-charts/ApexProgressLineWrapper"
import { IconMap } from "@/app/components/icons/IconMap"
import ApexCandleChart from "@/app/components/apex-charts/ApexCandleChart"
import TaskNTodo from "@/app/components/common/TaskNTodo"
import TaskActivityTracker from "@/app/components/common/TaskActivityTracker"
import MemberStats, { MemberStatsItem } from "@/app/components/common/MemberStats"
import ColorGridCard from "@/app/components/common/ColorGridCard"
import EnclosedChartColorWrapper from "@/app/components/common/EnclosedChartColorWrapper"
import SubscriptionCard from "@/app/components/common/SubscriptionCard"
import StatsOverviewWithChart from "@/app/components/common/StatsOverviewWithChart"
import ApexBarChartWrapper from "@/app/components/apex-charts/ApexBarChartWrapper"
import ActionNeededCard from "@/app/components/common/ActionNeededCard"

const DashboardPage = () => {
    const [members, setMembers] = useState<MemberStatsItem[]>(dashboardData.memberStats)

    const handleAddMember = (data: Omit<MemberStatsItem, "id">) => {
        setMembers((prev) => [{ ...data, id: Date.now().toString() }, ...prev])
    }

    const handleDeleteMember = (id: string) => {
        setMembers((prev) => prev.filter((m) => m.id !== id))
    }

    const taskOverviewCardOptions = [
        {
            id: "status",
            type: "select",
            label: "Status",
            placeholder: "Select option",
            options: [
                { label: "Approved", value: "approved" },
                { label: "Pending", value: "pending" },
                { label: "In Process", value: "in_process" },
                { label: "Rejected", value: "rejected" },
            ],
            defaultValue: "",
        },
        {
            id: "memberType",
            type: "checkbox",
            label: "Member Type",
            options: [
                { label: "Author", value: "author" },
                { label: "Customer", value: "customer" },
            ],
            defaultValue: ["customer"],
        },
        {
            id: "notifications",
            type: "toggle",
            label: "Notifications",
            defaultValue: true,
        },
        {
            id: "actions",
            type: "actions",
        },
    ]

    const paymentMenuOptions = [
        {
            type: "item",
            label: "Create Invoice",
            id: "create_invoice",
        },
        {
            type: "item",
            label: "Create Payment",
            id: "create_payment",
        },
        {
            type: "item",
            label: "Generate Bill",
            id: "generate_bill",
        },
        {
            type: "item",
            label: "Subscription",
            id: "subscription",
            children: [
                {
                    type: "item",
                    label: "Plans",
                    id: "subscription_plans",
                },
                {
                    type: "item",
                    label: "Billing",
                    id: "subscription_billing",
                },
                {
                    type: "toggle",
                    label: "Recurring",
                    id: "subscription_recurring",
                    value: false, // default state
                },
            ],
        },
        {
            type: "item",
            label: "Settings",
            id: "settings",
        },
    ]

    return (
        <div className="dashboard-container d-flex flex-column">
            <div className="marketplace-grid d-flex">
                {dashboardData.marketplace.map((item) => (
                    <KpiCard
                        key={item.name}
                        title={item.name}
                        amount={`${item.currency ? item.currency + " " : ""}${item.revenue}`}
                        description={item.users}
                        backgroundColor="white"
                    />
                ))}
            </div>
            <div className="sale-progress-grid d-flex">
                {dashboardData.progressCharts.map((item, index) => (
                    <ApexProgressLineWrapper
                        key={index}
                        item={item}
                        about={{
                            title: item.title,
                            subTitle: item.subTitle,
                        }}
                        chartData={item.data}
                        chartType="area"
                        chartFillColor={item.chartFillColor}
                    />
                ))}
            </div>
            <div className="meetings-grid">
                {dashboardData.meetings.map((meeting) => (
                    <KpiCard
                        key={meeting.id || meeting.title}
                        title={meeting.title || "No Title"}
                        amount={meeting.time || ""}
                        description={meeting.description}
                        backgroundColor="white"
                    />
                ))}
            </div>
            <div className="sale-progress-grid sale-progress-grid-2 d-flex">
                {dashboardData.areaCharts.map((item, index) => {
                    const icon = IconMap[item.iconName as keyof typeof IconMap]
                    return (
                        <ApexProgressLineWrapper
                            key={index}
                            about={{
                                title: item.value,
                                subTitle: item.value_about,
                            }}
                            chartData={item.data}
                            icon={icon}
                            chartType="area"
                            chartFillColor={item.chartFillColor}
                        />
                    )
                })}
            </div>
            <div className="sales-grid">
                {dashboardData.salesStats.map((stat, index) => (
                    <KpiCard
                        key={index}
                        title={stat.title || "No Title"}
                        description={stat.description}
                        icon={IconMap[stat.iconName as keyof typeof IconMap]}
                        iconPlacement="top"
                        backgroundColor={stat.bgCardColor}
                    />
                ))}
            </div>
            <div
                className="business-grid"
                style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
            >
                {dashboardData.businessStats.map((stat, index) => {
                    return (
                        <KpiCard
                            key={index}
                            title={stat.desc}
                            amount={`${stat.currency}${stat.statNum}`}
                            iconPlacement="right"
                            icon={IconMap[stat.iconName as keyof typeof IconMap]}
                            cardId={stat.id}
                            backgroundColor={stat.bgCardColor}
                        />
                    )
                })}
            </div>
            <div className="user-grid">
                {dashboardData.userDetails.map((user, index) => (
                    <KpiCard
                        key={index}
                        title={user.name}
                        amount=""
                        description={user.designation}
                        avatarSrc={user.avatarSrc}
                        backgroundColor="#ffffff"
                    />
                ))}
            </div>
            <div className="progress-analysis">
                {dashboardData.kpis.map((kpi, index) => (
                    <KpiCard
                        key={index}
                        title={kpi.title}
                        amount={`${kpi.value}${kpi.unit}`}
                        quantity={kpi.quantity}
                        progress={kpi.progress}
                        showProgress
                        backgroundColor={kpi.bgCardColor}
                        fontColor={kpi.textColor}
                    />
                ))}
            </div>
            <div className="stats-bar-wrapper">
                <ApexBarChartWrapper
                    config={dashboardData.recentStatistics}
                    optionsVariant="filter"
                    cardOptions={taskOverviewCardOptions}
                />
                <ApexBarChartWrapper config={dashboardData.recentTasks} />
            </div>
            <div className="recent-stats-tab-wrapper">
                <ApexProgressLineWrapper
                    about={{ title: "Weekly Sales", subTitle: "Sales trend" }}
                    chartData={dashboardData.recentTasksLineChart.data}
                    chartType="area"
                    chartFillColor="#FFE082"
                    height={300}
                    chartConfigoptions={{
                        grid: {
                            show: true,
                            borderColor: "#e5e7eb",
                            strokeDashArray: 4,
                        },
                        xaxis: {
                            show: true,
                        },
                        yaxis: {
                            show: true,
                        },
                    }}
                />
                <ApexProgressLineWrapper
                    about={{
                        title: dashboardData.recentTasksMultiLineChart.title,
                        subTitle: dashboardData.recentTasksMultiLineChart.subTitle,
                    }}
                    chartData={dashboardData.recentTasksMultiLineChart.data}
                    chartType="area"
                    chartFillColor={dashboardData.recentTasksMultiLineChart.chartFillColor}
                    height={300}
                    chartConfigoptions={{
                        grid: {
                            show: true,
                            borderColor: "#e5e7eb",
                            strokeDashArray: 4,
                        },
                        xaxis: {
                            show: true,
                        },
                        yaxis: {
                            show: true,
                        },
                    }}
                />
            </div>
            <div className="recent-stats-tab-wrapper">
                <ApexCandleChart
                    config={dashboardData.recentTasksComparison}
                    chartFillColor="#ffffff"
                />
                <ApexCandleChart config={dashboardData.recentTasksSales} chartFillColor="#ffffff" />
            </div>
            <div className="recent-stats-tab-wrapper">
                <ApexProgressLineWrapper
                    about={{
                        title: dashboardData.detailedRecentTasksMultiLineChart.title,
                        subTitle: dashboardData.detailedRecentTasksMultiLineChart.subTitle,
                    }}
                    chartData={dashboardData.detailedRecentTasksMultiLineChart.data}
                    chartType="area"
                    chartFillColor={dashboardData.detailedRecentTasksMultiLineChart.chartFillColor}
                    height={300}
                    chartConfigoptions={{
                        grid: {
                            show: true,
                            borderColor: "#e5e7eb",
                            strokeDashArray: 4,
                        },
                        xaxis: {
                            show: true,
                        },
                        yaxis: {
                            show: true,
                        },
                    }}
                />
                <ApexProgressLineWrapper
                    about={{
                        title: dashboardData.recentTasksMultiLineChart.title,
                        subTitle: dashboardData.recentTasksMultiLineChart.subTitle,
                    }}
                    chartData={dashboardData.detailedRecentTasksMultiLineChartv2.data}
                    chartType="area"
                    chartFillColor={
                        dashboardData.detailedRecentTasksMultiLineChartv2.chartFillColor
                    }
                    height={300}
                    chartConfigoptions={{
                        grid: {
                            show: true,
                            borderColor: "#e5e7eb",
                            strokeDashArray: 4,
                        },
                        xaxis: {
                            show: true,
                        },
                        yaxis: {
                            show: true,
                        },
                    }}
                />
            </div>
            <div className="task-activity-wrapper">
                <TaskNTodo
                    data={dashboardData.tasksOverviewData}
                    showBadges={false}
                    isIcon={true}
                    cardOptions={taskOverviewCardOptions}
                    optionsVariant="filter"
                />
                <TaskActivityTracker
                    data={dashboardData.taskActivityTracker}
                    cardOptions={taskOverviewCardOptions}
                    optionsVariant="filter"
                />
                <TaskNTodo
                    data={dashboardData.todoData}
                    showBadges={true}
                    cardOptions={paymentMenuOptions}
                    optionsVariant="menu"
                />
            </div>
            <div className="task-n-meber-stats">
                <div className="task-overview-wrapper">
                    <TaskNTodo
                        data={dashboardData.tasksOverviewProgressData}
                        isIcon={true}
                        cardOptions={taskOverviewCardOptions}
                        optionsVariant="filter"
                    />
                </div>
                <div className="member-stats-wrapper">
                    <MemberStats
                        data={members}
                        onAdd={handleAddMember}
                        onDelete={handleDeleteMember}
                    />
                </div>
            </div>
            <div className="sales-summary-container">
                {dashboardData.salesSummary.map((card, index) => (
                    <ColorGridCard
                        key={index}
                        data={card}
                        bottomStatsLayout="middle"
                        cardOptions={taskOverviewCardOptions}
                        optionsVariant="filter"
                    />
                ))}
            </div>
            <div className="sales-stats-progress-wrapper">
                {dashboardData.salesStatsProgressCharts.map((item, index) => (
                    <EnclosedChartColorWrapper
                        key={index}
                        item={item}
                        lineChart
                        cardOptions={taskOverviewCardOptions}
                        optionsVariant="filter"
                    />
                ))}
            </div>

            <div className="sales-stats-progress-wrapper sales-stats-bar-wrapper">
                {dashboardData.salesProgress.map((item, index) => (
                    <EnclosedChartColorWrapper key={index} item={item} />
                ))}
            </div>

            <div className="subscriptions-list">
                {dashboardData.subscriptionsData.map((item) => (
                    <SubscriptionCard key={item.id} item={item} />
                ))}
            </div>

            <div className="common-card-container sales-overview-wrapper">
                {dashboardData.salesOverviewData.map((card) => (
                    <StatsOverviewWithChart
                        key={card.id}
                        header={card.header}
                        stats={card.stats}
                        currency={card.currency}
                        chartData={card.chart.points}
                        chartColor={card.chart.color}
                        chartHeight={120}
                    />
                ))}
            </div>

            <div className="common-card-container action-needed-wrapper">
                {dashboardData.actionNeededData.map((item) => (
                    <ActionNeededCard
                        key={item.id}
                        percentage={item.percentage}
                        color={item.color}
                        strokeWidth={item.strokeWidth}
                        buttonColor={item.buttonColor}
                    />
                ))}
            </div>
            <div className="common-card-container sale-trends-wrapper">
                {dashboardData.trendsData.map((item) => (
                    <StatsOverviewWithChart
                        key={item.id}
                        header={item.header}
                        stats={item.stats}
                        currency={item.currency}
                        chartData={item.chart.points}
                        chartColor={item.chart.color}
                        showReverse
                        chartHeight={200}
                    />
                ))}
            </div>

            <div className="common-card-container sales-overview-wrapper cumm-sales-overview-wrapper">
                {dashboardData.cummulativeSalesStats.map((card) => (
                    <StatsOverviewWithChart
                        key={card.id}
                        header={card.header}
                        stats={card.stats}
                        currency={card.currency}
                        chartData={card.chart.points}
                        chartColor={card.chart.color}
                    />
                ))}
            </div>
            <div className="sale-progress-grid d-flex">
                {dashboardData.generatedReportData.map((item, index) => (
                    <ApexProgressLineWrapper
                        key={index}
                        item={item}
                        about={{
                            title: item.title,
                            subTitle: item.subTitle,
                        }}
                        chartData={item.data}
                        chartType="area"
                        chartFillColor={item.chartFillColor}
                    />
                ))}
            </div>

            <div className="stats-bar-wrapper sales-bar-wrapper">
                {dashboardData.salesBarData.map((item, index) => {
                    return (
                        <ApexBarChartWrapper
                            key={index}
                            config={item}
                            chartConfig={{
                                height: 200,
                            }}
                        />
                    )
                })}
            </div>

            <div className="sales-stats-progress-wrapper sales-bar-wrapper">
                {dashboardData.earningTrendData.map((item, index) => (
                    <EnclosedChartColorWrapper key={index} item={item} lineChart trendValues />
                ))}
            </div>
        </div>
    )
}

export default DashboardPage
