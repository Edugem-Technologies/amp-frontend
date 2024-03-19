"use client";
import WithAuth from '../../components/Auth';
import CustomLayout from '../../components/CustomLayout';

const AboutPage = ({ user }: { user: any }) => {
    return (
        <CustomLayout user={user}>
        <h1>AboutPage</h1>
        <span>{JSON.stringify(user)}</span>
        </CustomLayout>
    )
}

export default WithAuth(AboutPage)