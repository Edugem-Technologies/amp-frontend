import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
const authOptions: AuthOptions = {
    // debug: true,
    pages: {
        signIn: "/login",
        error: "/login",
        signOut: undefined,
    },
    session: {
        strategy: "jwt",
        maxAge: 1 * 60 * 60, //expiry time of 1 hour in seconds
    },
    events: {
        signIn(message) {
            console.log("🚀 ~ signIn ~ message:", message)
        },
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                try {
                    console.log("🚀 ~ authorize ~ req:", req)
                    console.log("🚀 ~ authorize ~ credentials:", credentials)
                    // Implement your user authentication logic here
                    // For now, return a dummy user object or null
                    // const res = await fetch("https://dummyjson.com/auth/login", {
                    const res = await fetch("https://triveni-api.onalpha.co/api/v1/admin/login", {
                        method: "POST",
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                    })
                    const response = await res.json()
                    console.log("🚀 ~ authorize ~ response:", response)

                    // If no error and we have response data, return it
                    if (res.ok && response) {
                        return response
                    } else {
                        throw { data: response }
                    }
                } catch (error) {
                    console.log("🚀 ~ authorize ~ error:", error)
                    return error
                }
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
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log("🚀 ~ jwt ~ user:", user)
            console.log("🚀 ~ jwt ~ token:", token)
            return { ...token, ...user }
        },

        async session({ session, token }) {
            console.log("🚀 ~ session ~ { session, token }:", { session, token })
            return { ...session, ...token }
        },
        signIn(params) {
            console.log("🚀 ~ signIn ~ params:", params)
            return true
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
