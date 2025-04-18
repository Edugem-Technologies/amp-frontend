"use client"
import CustomCard from "@/app/components/card/CustomCard"
import Button from "@/app/components/common/Button"
import Dropzone from "@/app/components/common/Dropzone"
import ReactStaticTable from "@/app/components/common/ReactStaticTable"
import { CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo, useState } from "react"

interface FileUpload extends File {
    id?: string
    url?: string
}
const Upload = () => {
    const [files, setFiles] = useState<Array<FileUpload>>([])
    const columns = useMemo<ColumnDef<FileUpload>[]>(() => {
        return [
            { accessorKey: "name", cell: ({ row }) => <span>{row.original.name}</span> },
            { accessorKey: "size", cell: ({ row }) => <span>{row.original.size} bytes</span> },
            { accessorKey: "type", cell: ({ row }) => <span>{row.original.type}</span> },
            {
                accessorKey: "_",
                header: "Action",
                enableSorting: false,
                cell: ({ row }) => (
                    <div className="d-flex align-items-center gap-3">
                        <Button
                            title="Show Preview"
                            className="btn btn-sm text-white btn-secondary"
                            onClick={() => {
                                if (row.original.url) {
                                    window.open(row.original.url, "_blank")
                                } else {
                                    // create dataURL and open in another window
                                    const url = URL.createObjectURL(row.original)
                                    window.open(url, "_blank")
                                }
                            }}
                        />

                        <Button
                            title="Remove"
                            className="btn btn-sm text-white btn-danger"
                            onClick={() => {
                                const remainingFiles = files.filter(
                                    (file) => file.name !== row.original.name,
                                )
                                setFiles(remainingFiles)
                            }}
                        />
                    </div>
                ),
            },
        ]
    }, [files])
    return (
        <section className="container-fluid">
            <div className="mt-4">
                <CustomCard>
                    <CustomCard.Title className="p-2">
                        <h4 className="fw-bold">Upload Files</h4>
                    </CustomCard.Title>
                    <CustomCard.Body className="p-2">
                        <div className={`dropzone`}>
                            <Dropzone
                                onDrop={(_files) => {
                                    const allFiles = [...files, ...(_files as File[])]
                                    setFiles(allFiles)
                                }}
                                disabled={false}
                                onError={handleError}
                                type={{ ...CONFIG.FILE_TYPE.IMAGE, ...CONFIG.FILE_TYPE.PDF }}
                                multiple
                            >
                                <p className="m-0 text-center p-5">Drop or select an image</p>
                            </Dropzone>
                        </div>
                    </CustomCard.Body>
                    <CustomCard.Footer>
                        <div className="d-flex justify-content-end gap-3">
                            <Button
                                title="Cancel"
                                className="btn btn-secondary"
                                onClick={() => setFiles([])}
                            />
                            <Button title="Save" className="btn btn-primary" />
                        </div>
                    </CustomCard.Footer>
                </CustomCard>
                <div className="mt-5">
                    <ReactStaticTable data={files} columns={columns} />
                </div>
            </div>
        </section>
    )
}

export default Upload
