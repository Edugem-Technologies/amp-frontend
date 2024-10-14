import "@/styles/scss/custom/styles.scss"
import { Metadata } from "next"
import { MyProvider } from "./context"

export const metadata: Metadata = {
    title: "NEXT 14",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <MyProvider>
            <html lang="en">
                <body>{children}</body>
            </html>
        </MyProvider>
    )
}
