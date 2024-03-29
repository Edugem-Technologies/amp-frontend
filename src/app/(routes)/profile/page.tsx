"use client"
import { NextPage } from 'next'
import WithAuth from '../../components/auth/Auth'
import CustomLayout from '../../components/common/CustomLayout'
import { User } from '@/types/auth/user'

const Profile: NextPage<{ user: User }> = ({ user }) => {
    return (
        <CustomLayout user={user}>
            <section className='text-center mt-4'>
                <h1>Profile Page</h1>
                <p>You are logged in as <strong>{user?.first_name}</strong></p>
            </section>
        </CustomLayout>
    )
}

export default WithAuth(Profile)