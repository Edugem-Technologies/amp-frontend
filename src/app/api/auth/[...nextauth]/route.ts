import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
const authOptions: AuthOptions = {
    debug: true,
    pages: {
        signIn: "/login",
        error: "/error",
    },
    session: {
        strategy: "jwt",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                console.log("🚀 ~ authorize ~ req:", req)
                console.log("🚀 ~ authorize ~ credentials:", credentials)
                // Implement your user authentication logic here
                // For now, return a dummy user object or null
                const res = await fetch("https://dummyjson.com/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        username: "emilys",
                        password: "emilyspass",
                    }),
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                })
                const user = await res.json()
                console.log("🚀 ~ authorize ~ user:", user)

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
        async jwt({ token, user }) {
            return { ...token, ...user }
        },

        async session({ session, token }) {
            console.log("🚀 ~ session ~ { session, token }:", { session, token })
            return { ...session, ...token }
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
