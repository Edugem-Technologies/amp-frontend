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
import Link from "next/link"
import TrendsOverviewWithChart from "@/app/components/common/TrendsOverviewWithChart"
import EnclosedChartWrapperBar from "@/app/components/common/EnclosedChartWrapperBar"
import EnclosedChartColorWrapperLine from "@/app/components/common/EnclosedChartColorWrapperLine"

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
        <div className="dashboard-container content d-flex flex-column flex-column-fluid">
            <div className="post d-flex flex-column-fluid">
                <div className="container-fluid pages dashboard">
                    <div className="g-5 gx-xxl-8">
                        <div className="stats">
                            {dashboardData.marketplace.map((item, index) => (
                                <div className="stat" key={index}>
                                    <KpiCard
                                        key={item.name}
                                        title={item.name}
                                        amount={`${item.currency ? item.currency + " " : ""}${
                                            item.revenue
                                        }`}
                                        description={item.users}
                                        backgroundColor="white"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="row g-5 g-xl-8">
                            {dashboardData.progressCharts.map((item, index) => (
                                <div className="col-xl-4" key={index}>
                                    <ApexProgressLineWrapper
                                        key={index}
                                        iconBgClass={item.iconBgClass}
                                        about={{
                                            title: item.title,
                                            subTitle: item.subTitle,
                                            delta: item.delta,
                                        }}
                                        chartData={item.data}
                                        chartType="area"
                                        chartFillColor={item.chartFillColor}
                                        disablePadding
                                        cardClassName={
                                            index === dashboardData.progressCharts.length - 1
                                                ? "mb-5"
                                                : ""
                                        }
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="row g-5 g-xl-8">
                            {dashboardData.meetings.map((meeting, index) => (
                                <div className="col-xl-4" key={index}>
                                    {/* <KpiCard
                                        key={meeting.id || meeting.title}
                                        title={meeting.title || "No Title"}
                                        amount={meeting.time || ""}
                                        description={meeting.description}
                                        backgroundColor="white"
                                    /> */}
                                    <div
                                        className="card bgi-no-repeat card-xl-stretch mb-xl-8"
                                        style={{
                                            backgroundPosition: "right top",
                                            backgroundSize: "30% auto",
                                            backgroundImage:
                                                "url('/media/svg/shapes/abstract-4.svg')",
                                        }}
                                    >
                                        <div className="card-body">
                                            <Link
                                                href=""
                                                className="card-title fw-bolder text-muted text-hover-primary fs-4"
                                            >
                                                {meeting.title}
                                            </Link>
                                            <div className="fw-bolder text-primary my-6">
                                                {meeting.time}
                                            </div>
                                            <p className="text-dark-75 fw-bold fs-5 m-0">
                                                {meeting.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="row g-5 g-xl-8">
                            {dashboardData.areaCharts.map((item, index) => {
                                const icon = IconMap[item.iconName as keyof typeof IconMap]
                                return (
                                    <div key={index} className="col-xl-4">
                                        <ApexProgressLineWrapper
                                            about={{
                                                title: item.value,
                                                subTitle: item.value_about,
                                            }}
                                            iconBgClass={item.iconBgClass}
                                            iconClass={item.iconClass}
                                            chartData={item.data}
                                            icon={icon}
                                            chartType="area"
                                            chartFillColor={item.chartFillColor}
                                            height={150}
                                            disablePadding
                                            infoReverse
                                            cardClassName={
                                                index === dashboardData.areaCharts.length - 1
                                                    ? "mb-5"
                                                    : ""
                                            }
                                        />
                                    </div>
                                )
                            })}
                        </div>

                        <div className="row g-5 g-xl-8">
                            {dashboardData.salesStats.map((stat, index) => (
                                <div className="col-xl-4" key={index}>
                                    <Link
                                        href="#"
                                        className={`card bg-danger hoverable card-xl-stretch mb-xl-8 ${
                                            index === dashboardData.salesStats.length - 1
                                                ? "mb-5"
                                                : ""
                                        }`}
                                    >
                                        <div className="card-body">
                                            <span className="svg-icon svg-icon-white svg-icon-3x ms-n1">
                                                {IconMap[stat.iconName as keyof typeof IconMap]}
                                            </span>
                                            <div className="text-white fw-bolder fs-2 mb-2 mt-5">
                                                {stat.title}
                                            </div>
                                            <div className="fw-bold text-white">
                                                {stat.description}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="row g-5 g-xl-8">
                            {dashboardData.businessStats.map((stat, index) => {
                                return (
                                    <div className="col-xl-3" key={index}>
                                        <Link
                                            href="#"
                                            className="card bg-body hoverable card-xl-stretch mb-xl-8"
                                        >
                                            <div className="card-body">
                                                <span className="svg-icon svg-icon-primary svg-icon-3x ms-n1">
                                                    {IconMap[stat.iconName as keyof typeof IconMap]}
                                                </span>
                                                <div className="text-gray-900 fw-bolder fs-2 mb-2 mt-5">
                                                    {stat.desc}
                                                </div>
                                                <div className="fw-bold text-gray-400">
                                                    {`${stat.currency}${stat.statNum}`}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="row g-5 g-xl-8">
                            {dashboardData.userDetails.map((user, index) => (
                                <div className="col-xl-4" key={index}>
                                    <div
                                        className={`card card-xl-stretch mb-xl-8 ${
                                            index === dashboardData.salesStats.length - 1
                                                ? "mb-5"
                                                : ""
                                        }`}
                                    >
                                        <div className="card-body d-flex align-items-center pt-3 pb-0">
                                            <div className="d-flex flex-column flex-grow-1 py-2 py-lg-13 me-2">
                                                <Link
                                                    href="#"
                                                    className="fw-bolder text-dark fs-4 mb-2 text-hover-primary"
                                                >
                                                    {user.name}
                                                </Link>

                                                <span className="fw-bold text-muted fs-5">
                                                    {user.designation}
                                                </span>
                                            </div>

                                            <img
                                                src={user.avatarSrc}
                                                alt={user.name}
                                                className="align-self-end h-100px"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="row g-5 g-xl-8">
                            {dashboardData.kpis.map((kpi, index) => (
                                <div className="col-xl-4" key={index}>
                                    <div
                                        className={`card card-xl-stretch mb-xl-8 ${
                                            index === dashboardData.salesStats.length - 1
                                                ? "mb-5"
                                                : ""
                                        }`}
                                        style={{ backgroundColor: kpi.bgCardColor }}
                                    >
                                        <div className="card-body my-3">
                                            <Link
                                                href="#"
                                                className="card-title fw-bolder fs-5 mb-3 d-block"
                                                style={{ color: kpi.textColor }}
                                            >
                                                {kpi.title}
                                            </Link>

                                            <div className="py-1">
                                                <span
                                                    className="fw-bolder fs-1"
                                                    style={{ color: kpi.textColor }}
                                                >
                                                    {kpi.value}
                                                    {kpi.unit}
                                                </span>

                                                <span
                                                    className="ms-2 fw-bold"
                                                    style={{ color: kpi.textColor }}
                                                >
                                                    {kpi.quantity}
                                                </span>
                                            </div>

                                            <div
                                                className="progress h-7px mt-7"
                                                style={{
                                                    backgroundColor: `${kpi.textColor}40`,
                                                }}
                                            >
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                        width: `${kpi.progress}%`,
                                                        backgroundColor: kpi.textColor,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="row g-5 g-xl-8 ">
                            <div className="col-xl-6">
                                <ApexBarChartWrapper
                                    config={dashboardData.recentStatistics}
                                    optionsVariant="filter"
                                    cardOptions={taskOverviewCardOptions}
                                    isRecentStatType
                                    optionBtnType="primary"
                                />
                            </div>
                            <div className="col-xl-6 m-mb-5">
                                <ApexBarChartWrapper
                                    config={dashboardData.recentTasks}
                                    isRecentStatType
                                />
                            </div>
                        </div>
                        <div className="row g-5 g-xl-8">
                            <div className="col-xl-6">
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
                            </div>
                            <div className="col-xl-6 m-mb-5">
                                <ApexProgressLineWrapper
                                    about={{
                                        title: dashboardData.recentTasksMultiLineChart.title,
                                        subTitle: dashboardData.recentTasksMultiLineChart.subTitle,
                                    }}
                                    chartData={dashboardData.recentTasksMultiLineChart.data}
                                    chartType="area"
                                    chartFillColor={
                                        dashboardData.recentTasksMultiLineChart.chartFillColor
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
                        </div>
                        <div className="row g-5 g-xl-8">
                            <div className="col-xl-6">
                                <ApexCandleChart
                                    config={dashboardData.recentTasksComparison}
                                    chartFillColor="#ffffff"
                                />
                            </div>
                            <div className="col-xl-6 m-mb-5">
                                <ApexCandleChart
                                    config={dashboardData.recentTasksSales}
                                    chartFillColor="#ffffff"
                                />
                            </div>
                        </div>

                        <div className="row g-5 g-xl-8">
                            <div className="col-xl-6">
                                <ApexProgressLineWrapper
                                    about={{
                                        title: dashboardData.detailedRecentTasksMultiLineChart
                                            .title,
                                        subTitle:
                                            dashboardData.detailedRecentTasksMultiLineChart
                                                .subTitle,
                                    }}
                                    chartData={dashboardData.detailedRecentTasksMultiLineChart.data}
                                    chartType="area"
                                    chartFillColor={
                                        dashboardData.detailedRecentTasksMultiLineChart
                                            .chartFillColor
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
                            <div className="col-xl-6 m-mb-5">
                                <ApexProgressLineWrapper
                                    about={{
                                        title: dashboardData.recentTasksMultiLineChart.title,
                                        subTitle: dashboardData.recentTasksMultiLineChart.subTitle,
                                    }}
                                    chartData={
                                        dashboardData.detailedRecentTasksMultiLineChartv2.data
                                    }
                                    chartType="area"
                                    chartFillColor={
                                        dashboardData.detailedRecentTasksMultiLineChartv2
                                            .chartFillColor
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
                        </div>
                        <div className="row g-5 g-xl-8">
                            <div className="col-xl-4">
                                <TaskNTodo
                                    data={dashboardData.tasksOverviewData}
                                    showBadges={false}
                                    isIcon={true}
                                    cardOptions={taskOverviewCardOptions}
                                    optionsVariant="filter"
                                    version="v1"
                                    optionBtnType="primary"
                                />
                            </div>
                            <div className="col-xl-4">
                                <TaskActivityTracker
                                    data={dashboardData.taskActivityTracker}
                                    cardOptions={taskOverviewCardOptions}
                                    optionsVariant="filter"
                                    optionBtnType="primary"
                                />
                            </div>
                            <div className="col-xl-4 m-mb-5">
                                <TaskNTodo
                                    data={dashboardData.todoData}
                                    showBadges={true}
                                    cardOptions={paymentMenuOptions}
                                    optionsVariant="menu"
                                    version="v2"
                                    optionBtnType="primary"
                                />
                            </div>
                        </div>
                        <div className="row g-5 g-xl-8">
                            <div className="col-xl-4">
                                <TaskNTodo
                                    data={dashboardData.tasksOverviewProgressData}
                                    isIcon={true}
                                    cardOptions={taskOverviewCardOptions}
                                    optionsVariant="filter"
                                    version="v3"
                                    optionBtnType="primary"
                                />
                            </div>
                            <div className="col-xl-8">
                                <MemberStats
                                    data={members}
                                    onAdd={handleAddMember}
                                    onDelete={handleDeleteMember}
                                />
                            </div>
                        </div>
                        <div className="row g-5 g-xl-8">
                            {dashboardData.salesSummary.map((card, index) => (
                                <div
                                    className={`col-xl-4 ${
                                        index === dashboardData.salesSummary.length - 1
                                            ? "m-mb-5"
                                            : ""
                                    }`}
                                    key={index}
                                >
                                    <ColorGridCard
                                        key={index}
                                        data={card}
                                        bottomStatsLayout="middle"
                                        cardOptions={taskOverviewCardOptions}
                                        optionsVariant="filter"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* </div> */}
                        <div className="sales-stats-progress-wrapper row g-5 g-xl-8">
                            {dashboardData.salesStatsProgressCharts.map((item, index) => (
                                <div
                                    className={`col-xl-4 ${
                                        index === dashboardData.salesStatsProgressCharts.length - 1
                                            ? "m-mb-5"
                                            : ""
                                    }`}
                                    key={index}
                                >
                                    <EnclosedChartColorWrapper
                                        item={item}
                                        lineChart
                                        cardOptions={paymentMenuOptions}
                                        optionsVariant="menu"
                                        disablePadding
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="sales-stats-progress-wrapper sales-stats-bar-wrapper row g-5 g-xl-8">
                            {dashboardData.salesProgress.map((item, index) => (
                                <div className="col-xl-4" key={index}>
                                    <EnclosedChartWrapperBar
                                        item={item}
                                        cardOptions={paymentMenuOptions}
                                        optionsVariant="menu"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="row g-5 g-xl-8" style={{ marginTop: "10px" }}>
                            {dashboardData.subscriptionsData.map((item, index) => (
                                <div className="col-xl-4" key={index}>
                                    <SubscriptionCard item={item} />
                                </div>
                            ))}
                        </div>

                        <div className="row g-5 g-xl-8">
                            {dashboardData.salesOverviewData.map((card, index) => (
                                <div
                                    className={`col-xl-4 ${
                                        index === dashboardData.salesOverviewData.length - 1
                                            ? "m-mb-5"
                                            : ""
                                    }`}
                                    key={index}
                                >
                                    <StatsOverviewWithChart
                                        key={index}
                                        header={card.header}
                                        stats={card.stats}
                                        currency={card.currency}
                                        chartData={card.chart.points}
                                        chartColor={card.chart.color}
                                        chartHeight={150}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="row g-5 g-xl-8">
                            {dashboardData.actionNeededData.map((item, index) => (
                                <div
                                    className={`col-xl-4 ${
                                        index === dashboardData.actionNeededData.length - 1
                                            ? "m-mb-5"
                                            : ""
                                    }`}
                                    key={index}
                                >
                                    <ActionNeededCard
                                        percentage={item.percentage}
                                        color={item.color}
                                        strokeWidth={item.strokeWidth}
                                        buttonColor={item.buttonColor}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="row g-5 g-xl-8">
                            {dashboardData.trendsData.map((item, index) => (
                                <div
                                    key={index}
                                    className={`col-xl-4 ${
                                        index === dashboardData.trendsData.length - 1
                                            ? "m-mb-5"
                                            : ""
                                    }`}
                                >
                                    <TrendsOverviewWithChart
                                        header={item.header}
                                        stats={item.stats}
                                        currency={item.currency}
                                        chartData={item.chart.points}
                                        chartColor={item.chart.color}
                                        showReverse
                                        chartHeight={100}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="row g-5 g-xl-8">
                            {dashboardData.cummulativeSalesStats.map((card, index) => (
                                <div
                                    key={index}
                                    className={`col-xl-4 ${
                                        index === dashboardData.cummulativeSalesStats.length - 1
                                            ? "m-mb-5"
                                            : ""
                                    }`}
                                >
                                    <StatsOverviewWithChart
                                        key={card.id}
                                        header={card.header}
                                        stats={card.stats}
                                        currency={card.currency}
                                        chartData={card.chart.points}
                                        chartColor={card.chart.color}
                                        withIcon={true}
                                        chartHeight={150}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="row g-5 g-xl-8">
                            {dashboardData.generatedReportData.map((item, index) => (
                                <div
                                    className={`col-xl-4 ${
                                        index === dashboardData.generatedReportData.length - 1
                                            ? "m-mb-5"
                                            : ""
                                    }`}
                                    key={index}
                                >
                                    <ApexProgressLineWrapper
                                        key={index}
                                        item={item}
                                        about={{
                                            title: item.title,
                                            subTitle: item.subTitle,
                                            delta: item.delta,
                                        }}
                                        chartData={item.data}
                                        chartType="area"
                                        chartFillColor={item.chartFillColor}
                                        disablePadding
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="row g-5 g-xl-8">
                            {dashboardData.salesBarData.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`col-xl-4 ${
                                            index === dashboardData.salesBarData.length - 1
                                                ? "m-mb-5"
                                                : ""
                                        }`}
                                    >
                                        <ApexBarChartWrapper
                                            config={item}
                                            chartConfig={{
                                                height: 200,
                                            }}
                                        />
                                    </div>
                                )
                            })}
                        </div>

                        <div className="row g-5 g-xl-8">
                            {dashboardData.earningTrendData.map((item, index) => (
                                <div
                                    key={index}
                                    className={`col-xl-4 ${
                                        index === dashboardData.earningTrendData.length - 1
                                            ? "m-mb-5"
                                            : ""
                                    }`}
                                >
                                    <EnclosedChartColorWrapperLine
                                        item={item}
                                        lineChart
                                        trendValues
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="row g-5 g-xl-8">
                            {dashboardData.contributorData.map((item, index) => (
                                <div
                                    key={index}
                                    className={`col-xl-4 ${
                                        index === dashboardData.contributorData.length - 1
                                            ? "m-mb-5"
                                            : ""
                                    }`}
                                >
                                    <EnclosedChartColorWrapperLine
                                        item={item}
                                        barChart
                                        trendValues
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
