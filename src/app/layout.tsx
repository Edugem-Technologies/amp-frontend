import "@/styles/scss/custom/styles.scss"
import "@/styles/scss/fonts.scss"
import { Metadata } from "next"
import ErrorBoundary from "./components/common/Errorboundary"
import TanstackQueryProvider from "./components/common/TanstackQueryProvider"
import { AppProvider } from "./context/AppContext"
import { PermissionProvider } from "./context/PermissionContext"

export const metadata: Metadata = {
    title: "AMP | Admin Dashboard",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
                />
            </head>
            <body>
                <ErrorBoundary>
                    <PermissionProvider>
                        <TanstackQueryProvider>
                            <AppProvider>{children}</AppProvider>
                        </TanstackQueryProvider>
                    </PermissionProvider>
                </ErrorBoundary>
            </body>
        </html>
    )
}
