import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="d-flex justify-content-center align-items-center">
            <div className="nav-link">
                <Link href={"/"} className="text-decoration-none">
                    Home
                </Link>
            </div>
            <div className="nav-link">
                <Link href={"/profile"} className="text-decoration-none">
                    Profile
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
