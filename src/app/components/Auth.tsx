"use clint";

import { doGetUserByAccessToken } from '@/services/user'
import { User } from '@/types/auth/user'
import { config } from '@/utils/constants'
import { deleteCookie, getCookie } from 'cookies-next'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'; // corrected import
import { useEffect, useState } from 'react'

interface WithAuthPropType {
    user?: User;
}

const WithAuth = <P extends object>(WrappedComponent: NextPage<P & WithAuthPropType>) => {
    const AuthComponent: NextPage<P & WithAuthPropType> = (props) => {
        const [authenticated, setAuthenticated] = useState(false);
        const [user, setUser] = useState()
        const router = useRouter();

        useEffect(() => {
            const fetchUser = async () => {
                const accessToken = getCookie(config.AUTH.COOKIE_NAME) as string;
                if (accessToken && accessToken.length) {
                    try {
                        const response = await doGetUserByAccessToken(accessToken);
                        if (response.status && response.data) {
                            setAuthenticated(true);
                            setUser(response.data)
                        } else {
                            deleteCookie(config.AUTH.COOKIE_NAME)
                            router.push('/login');
                        }
                    } catch (error) {
                        console.log(error, "error")
                        deleteCookie(config.AUTH.COOKIE_NAME)
                        router.push('/login');
                        throw error;
                    }
                } else {
                    deleteCookie(config.AUTH.COOKIE_NAME)
                    router.push('/login');
                }
            };

            fetchUser();
        }, []);

        if (!authenticated) {
            // Render nothing while authentication is in progress
            return null;
        }

        return <WrappedComponent {...props} user={user} />;
    };

    return AuthComponent;
};

export default WithAuth;
