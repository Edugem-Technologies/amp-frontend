"use client"
import UserInfo from "@/app/components/user/UserInfo"
import PageTitle from "@/app/components/common/PageTitle"
import TabSection from "@/app/components/common/TabSection"
import { CONFIG } from "@/utils/constants"
import { useParams } from "next/navigation"

const Index = () => {
    const params = useParams()
    const tab = params.tab as string
    const COMPONENT_MAPPING = {
        [CONFIG.EDIT_USER_STEP_TABS["details"].path]: UserInfo,
    }

    const renderTabContent = () => {
        const Component = COMPONENT_MAPPING[tab]
        return Component ? <Component /> : null
    }

    return (
        <div className="tab-content">
            <PageTitle title="Update Profile" />
            <TabSection customClassName="">{renderTabContent()}</TabSection>
        </div>
    )
}

export default Index
