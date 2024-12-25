import dynamic from "next/dynamic"
import IntersectionObserver from "@/app/components/demo/IntersectionObserver"
import LoadingComponent from "@/app/components/common/LoadingComponents"
import MediaQuery from "@/app/components/demo/MediaQuery"
import Scroll from "@/app/components/demo/Scroll"

const CKEditor = dynamic(() => import("../../../components/editor/CkEditor"), {
    ssr: false,
    loading: ({ error, isLoading }) => <LoadingComponent error={error} isLoading={isLoading} />,
})
const LocalStorage = dynamic(() => import("../../../components/demo/LocalStorage"), {
    ssr: false,
    loading: ({ error, isLoading }) => <LoadingComponent error={error} isLoading={isLoading} />,
})
const QuillEditor = dynamic(() => import("../../../components/editor/QuillEditor"), {
    ssr: false,
    loading: ({ error, isLoading }) => <LoadingComponent error={error} isLoading={isLoading} />,
})
const ComponentsPage = () => {
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
        </div>
    )
}

export default ComponentsPage
