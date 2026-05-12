import "@/styles/scss/fonts.scss"
import "@/styles/scss/custom/styles.scss"

// import "@/styles/scss/custom/php-styles.scss"
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
                    href="https://maxst.icons8.com/vue-static/landings/line-awesome/font-awesome-line-awesome/css/all.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@24,400,0,0"
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
