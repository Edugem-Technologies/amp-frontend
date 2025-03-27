"use client"
import RoleDetails from "@/app/components/auth/RoleDetailes"
import TabBody from "@/app/components/common/TabBody"
import TabHeader from "@/app/components/common/TabHeader"
import TabSection from "@/app/components/common/TabSection"
import { Suspense } from "react"

const Index = () => {
    return (
        <div className="container-fluid">
            <TabSection>
                <TabHeader heading="Roles" />
                <TabBody>
                    <Suspense>
                        <RoleDetails />
                    </Suspense>
                </TabBody>
            </TabSection>
        </div>
    )
}

export default Index
