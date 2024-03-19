"use client"
import { User } from '@/types/auth/user'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'

const CustomLayout = ({ children, user }: { children: React.ReactNode, user?: User }) => {
    return (
        <div>
            <Toaster />
            <Navbar user={user} />
            {children}
        </div>
    )
}

export default CustomLayout