"use client"
import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export default function QuillEditor() {
    const [value, setValue] = useState("")

    return (
        <ReactQuill
            theme="snow"
            modules={{
                toolbar: [
                    ["bold", "italic", "underline", "strike"], // toggled buttons
                    ["blockquote", "code-block"],
                    ["link", "image", "video", "formula"],

                    [{ header: 1 }, { header: 2 }], // custom button values
                    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                    [{ direction: "rtl" }], // text direction

                    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],

                    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    [{ font: [] }],
                    [{ align: [] }],

                    ["clean"],
                ],
            }}
            formats={[
                "background",
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "align",
                "direction",
                "code-block",
                "formula",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
                "color",
            ]}
            value={value}
            onChange={setValue}
        />
    )
}
