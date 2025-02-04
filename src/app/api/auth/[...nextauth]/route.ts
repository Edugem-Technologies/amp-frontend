import NextAuth, { AuthOptions } from "next-auth"
import Google from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions: AuthOptions = {
    pages: {
        signIn: "/login",
        error: "/error",
    },

    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                console.log("🚀 ~ authorize ~ credentials:", credentials)
                // Implement your user authentication logic here
                // For now, return a dummy user object or null
                const res = await fetch("https://triveni-api.onalpha.co/api/v1/admin/login", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                })
                const user = await res.json()

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            },
        }),
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET,
        // }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",

            authorization: {
                params: {
                    max_age: 10,
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        signIn(params) {
            console.log("🚀 ~ signIn ~ params:", params)
            return true
        },
        // async signIn({ user, account, profile }) {
        //     // Call your backend API to store the user in the database
        //     try {
        //         console.log("user", user)
        //         const response = await fetch(`/api/users`, {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify({
        //                 email: user.email,
        //                 name: user.name,
        //                 image: user.image,
        //             }),
        //         })

        //         if (!response.ok) {
        //             console.error("Failed to store user in the database")
        //             return false // Cancel sign-in if storing user fails
        //         }

        //         return true // Continue with the sign-in
        //     } catch (error) {
        //         console.error("Error storing user in the database:", error)
        //         return false // Cancel sign-in on error
        //     }
        // },

        session(params) {
            console.log("session params", params)
            return params.session
        },
        jwt(params) {
            console.log("🚀 ~ jwt ~ params:", params)
            return params.token
        },
    },
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
