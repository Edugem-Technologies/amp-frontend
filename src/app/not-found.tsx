import React from "react"
import { NextPage } from "next"
import ErrorImage from "../../public/images/404.svg"
import Link from "next/link"

const NotFoundPage: NextPage = () => {
    return (
        <section className="v-error-section v-section-padding">
            <div className="v-error-content">
                <div className="v-error-image">
                    <img src={ErrorImage.src} alt="404 image" />
                </div>
                <div className="v-text-body">
                    <h1>Page not Found</h1>
                    <p>Sorry, but the page you were looking for could not be found</p>
                    <div className="v-link">
                        <Link legacyBehavior href={"/"}>
                            <a className="v-fill-btn-hover">Go to Homepage</a>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFoundPage
