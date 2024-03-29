"use client"
import { User } from "@/types/auth/user"
import { config } from "@/utils/constants"
import { Amplify } from "aws-amplify"
import { Toaster } from "react-hot-toast"
import Navbar from "../auth/Navbar"

// aws configuration for amplify
Amplify.configure(
    {
        Auth: {
            Cognito: {
                userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID as string,
                userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_WEB_CLIENT_ID as string,
                identityPoolId: "",
                loginWith: {
                    oauth: {
                        domain: process.env.NEXT_PUBLIC_DOMAIN_URL
                            ? process.env.NEXT_PUBLIC_DOMAIN_URL
                            : config.URL.LOCALHOST,
                        redirectSignIn: process.env.NEXT_PUBLIC_REDIRECT_SIGNIN_URL
                            ? [
                                  process.env.NEXT_PUBLIC_REDIRECT_SIGNIN_URL,
                                  `${config.URL.LOCALHOST}/google-idp-callback`,
                              ]
                            : [`${config.URL.LOCALHOST}/google-idp-callback`],
                        redirectSignOut: process.env.NEXT_PUBLIC_REDIRECT_SIGNOUT_URL
                            ? [process.env.NEXT_PUBLIC_REDIRECT_SIGNOUT_URL, config.URL.LOCALHOST]
                            : [config.URL.LOCALHOST],
                        scopes: ["aws.cognito.signin.user.admin", "email", "openid", "profile"],
                        responseType: "token",
                        providers: ["Google"],
                    },
                },
            },
        },
    },
    { ssr: true },
)

const CustomLayout = ({ children, user }: { children: React.ReactNode; user?: User }) => {
    return (
        <div>
            <Toaster />
            <Navbar user={user} />
            {children}
        </div>
    )
}

export default CustomLayout
