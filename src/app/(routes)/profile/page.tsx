"use client"
import { NextPage } from 'next'
import WithAuth from '../../components/auth/Auth'
import CustomLayout from '../../components/common/CustomLayout'

const Profile: NextPage<{ user: any }> = ({ user }) => {
    return (
        <CustomLayout user={user}>
            <h1>Profile Page</h1>
            <p>You are logged in as <strong>{user?.first_name}</strong></p>
        </CustomLayout>
    )
}

export default WithAuth(Profile)