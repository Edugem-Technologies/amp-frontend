import Image from "next/image"

const AccessDenied = () => {
    return (
        <div className="text-center access-denied">
            {" "}
            <h1 className="text-danger">
                <Image
                    src={"/icons/access-denied-logo.svg"}
                    width={50}
                    height={60}
                    alt="access-denied-logo"
                />{" "}
                Access Denied
            </h1>{" "}
            <h4>You do not have required permission to access this section.</h4>
            <Image
                src={"/images/access-denied-img.svg"}
                width={300}
                height={300}
                alt="access-denied-img"
            />
        </div>
    )
}

export default AccessDenied
