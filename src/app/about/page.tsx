"use client";
import { NextPage } from 'next';
import WithAuth from '../components/Auth';

const AboutPage: NextPage = ({ user }: { user: any }) => {
    console.log(user)
    return (
        <h1>AboutPage</h1>
    )
}

export default WithAuth(AboutPage)