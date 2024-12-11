import dynamic from "next/dynamic"
const QuillEditor = dynamic(() => import("../../../components/editor/QuillEditor"), { ssr: false })
const CKEditor = dynamic(() => import("../../../components/editor/CkEditor"), { ssr: false })

const page = () => {
    return (
        <div className="container">
            <h2>Quill Editor</h2>
            <QuillEditor />
            <br className="my-5" />
            <h2>CK Editor</h2>
            <CKEditor />
        </div>
    )
}

export default page
