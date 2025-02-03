"use client"
import LoadingComponent from "@/app/components/common/LoadingComponents"
import IntersectionObserver from "@/app/components/demo/IntersectionObserver"
import MediaQuery from "@/app/components/demo/MediaQuery"
import Scroll from "@/app/components/demo/Scroll"
import { CONFIG } from "@/utils/constants"
import { showSweetAlert, showSweetAlertWithRedirect } from "@/utils/helpers"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const CKEditor = dynamic(() => import("../../../../components/editor/CkEditor"), {
    ssr: false,
    loading: ({ error, isLoading }) => <LoadingComponent error={error} isLoading={isLoading} />,
})
const LocalStorage = dynamic(() => import("../../../../components/demo/LocalStorage"), {
    ssr: false,
    loading: ({ error, isLoading }) => <LoadingComponent error={error} isLoading={isLoading} />,
})
const QuillEditor = dynamic(() => import("../../../../components/editor/QuillEditor"), {
    ssr: false,
    loading: ({ error, isLoading }) => <LoadingComponent error={error} isLoading={isLoading} />,
})
const ComponentsPage = () => {
    const router = useRouter()
    return (
        <div className="container mb-5">
            <h2>Quill Editor</h2>
            <QuillEditor />
            <br className="my-5" />
            <h2>CK Editor</h2>
            <CKEditor />
            <br />
            <LocalStorage />
            <br />
            <MediaQuery />
            <br />
            <Scroll />
            <br />
            <IntersectionObserver />
            <br />
            <h2>
                To check tanstack query implementation, please check{" "}
                <Link href="/users">Users</Link> page
            </h2>
            <br />
            <h2>Please click below button for sweetAlert</h2>
            <div className="d-flex flex-wrap gap-2">
                <button
                    className="btn btn-danger"
                    onClick={async () => {
                        const result = await showSweetAlert({
                            icon: CONFIG.SWEETALERT_DELETE_OPTION.icon,
                            text: `${CONFIG.SWEETALERT_DELETE_OPTION.text} ?`,
                        })
                        if (result.isConfirmed) {
                            showSweetAlert({
                                icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon,
                                text: CONFIG.MESSAGES.DATA_DELETED_SUCCESSFULLY,
                            })
                        }
                    }}
                >
                    sweet alert for delete
                </button>
                <button
                    className="btn btn-primary"
                    onClick={async () => {
                        showSweetAlertWithRedirect({
                            icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon,
                            text: "Redirecting to users page",
                            router,
                            url: "/users",
                        })
                    }}
                >
                    sweet alert for redirection(users)
                </button>
            </div>
            <br />
            <h2>Please click below button for toaster</h2>
            <div className="d-flex flex-wrap">
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        toast.success("Showing toaster")
                    }}
                >
                    show toaster
                </button>
            </div>
        </div>
    )
}

export default ComponentsPage
