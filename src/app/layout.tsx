import "@/styles/scss/custom/styles.scss"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "NEXT 14",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
