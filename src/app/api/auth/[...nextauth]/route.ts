import { Any } from "@/types/common/Helper"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    // Send a request to the API for user authentication (update YOUR_API with the correct URL)
                    const res = await fetch("YOUR_API", {
                        method: "POST",
                        // Payload for authentication API
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                    })
                    // Parse the response as JSON
                    const response = await res.json()

                    // If the response is successful and contains data, return it
                    if (res.ok && response) {
                        return { data: response } as Any // Return the response data wrapped in an object
                    } else {
                        // Throw an error with the response data for unsuccessful requests
                        throw { data: response }
                    }
                } catch (error) {
                    // Return the error if the try block fails
                    return error
                }
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/login",
        signOut: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 1 * 60 * 60, //expiry time of 1 hour in seconds
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },

        async session({ session, token }) {
            return { ...session, ...token }
        },
        async signIn({ account, profile, user }) {
            // Check if the login provider is Google
            if (account?.provider === "google") {
                // Send a POST request to the API for authentication (update YOUR_API with the correct URL)
                const response = await fetch("YOUR_API", {
                    method: "POST",
                    // Payload for authentication API
                    body: JSON.stringify({
                        email: profile?.email,
                        password: "1234",
                    }),
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                })
                // If a response is received, attach the API response data to the user object
                if (response) {
                    Object.assign(user, { data: await response.json() })
                    return true // Allow sign-in to proceed
                }
                // Check if the login provider is credentials
            } else if (account?.provider === "credentials") {
                return true
            }
            // If neither Google nor credentials provider, reject the sign-in
            return false
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
