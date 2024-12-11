"use client"

import Link from "next/link"

export default function Home() {
    return (
        <div className="container">
            <h1 className="text-center mt-4">Boiler plate code for NEXT 14</h1>
            <Link href={"/components"} className="text-center d-block text-decoration-none mt-5">
                Click here to preview all components present in boilerplate
            </Link>
            <p className="text-center mt-2">More components will be added later</p>
        </div>
    )
}
