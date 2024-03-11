import { doGetUserByAccessToken } from '@/services/user';
import { config } from '@/utils/constants';
import { deleteCookie, getCookie } from 'cookies-next';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation'; // corrected import
import { useEffect, useState } from 'react';


const WithoutAuth = <P extends object>(WrappedComponent: NextPage<P>) => {
    const AuthComponent: NextPage<P> = (props) => {
        const router = useRouter();
        const [authenticated, setAuthenticated] = useState(false)
        useEffect(() => {
            const fetchUser = async () => {
                const accessToken = getCookie(config.AUTH.COOKIE_NAME) as string;
                if (accessToken && accessToken.length) {
                    try {
                        const response = await doGetUserByAccessToken(accessToken);
                        if (response.status && response.data) {
                            setAuthenticated(true)
                        } else {
                            deleteCookie(config.AUTH.COOKIE_NAME)
                            setAuthenticated(false)
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            };

            fetchUser();
        }, []);

        if (!authenticated) {
            return <WrappedComponent {...props as P} />
        } else {
            router.push("/")
        }
    };
    return AuthComponent;
};

export default WithoutAuth;
