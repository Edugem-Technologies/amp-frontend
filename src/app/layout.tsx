import "@/styles/scss/custom/styles.scss"
import { Metadata } from "next"
import ErrorBoundary from "./components/common/Errorboundary"
import TanstackQueryProvider from "./components/common/TanstackQueryProvider"
import { AppProvider } from "./context/AppContext"
import { PermissionProvider } from "./context/PermissionContext"

export const metadata: Metadata = {
    title: "NEXT 14",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
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
