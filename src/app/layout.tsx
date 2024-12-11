import "@/styles/scss/custom/styles.scss"
import { Metadata } from "next"
import { AppProvider } from "./context"
import ErrorBoundary from "./components/common/Errorboundary"

export const metadata: Metadata = {
    title: "NEXT 14",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ErrorBoundary>
                    <AppProvider>{children}</AppProvider>
                </ErrorBoundary>
            </body>
        </html>
    )
}
