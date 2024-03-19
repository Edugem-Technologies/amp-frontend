"use client"
import '@/styles/scss/custom/styles.scss'
import { Amplify } from "aws-amplify"


// aws configuration for amplify
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID as string,
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_WEB_CLIENT_ID as string,
      identityPoolId: "",
      loginWith: {
        oauth: {
          redirectSignIn: process.env.NEXT_PUBLIC_REDIRECT_SIGNIN_URL ? [process.env.NEXT_PUBLIC_REDIRECT_SIGNIN_URL] : [],
          redirectSignOut: process.env.NEXT_PUBLIC_REDIRECT_SIGNOUT_URL ? [process.env.NEXT_PUBLIC_REDIRECT_SIGNOUT_URL] : [],
          domain: process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "localhost",
          scopes: ["aws.cognito.signin.user.admin", "email", "openid", "profile"],
          responseType: "token"
        }
      }
    }
  },
}, { ssr: true })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
