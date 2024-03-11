"use client";
import '@/styles/scss/custom/styles.scss';
import { Amplify } from "aws-amplify";
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';


// aws configuration for amplify
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID as string,
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_WEB_CLIENT_ID as string,
      identityPoolId: ""
    }
  },
}, { ssr: true });

export default function RootLayout({ children, ...pageProps }: { children: React.ReactNode }) {
  console.log(pageProps)
  return (
    <html lang="en">
      <body>
        <Toaster />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
