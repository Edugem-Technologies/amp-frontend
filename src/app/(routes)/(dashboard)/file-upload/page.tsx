"use client"
import CustomCard from "@/app/components/card/CustomCard"
import Button from "@/app/components/common/Button"
import Dropzone from "@/app/components/common/Dropzone"
import ReactStaticTable from "@/app/components/common/ReactStaticTable"
import { CONFIG } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo, useState } from "react"

const Upload = () => {
    const [files, setFiles] = useState<Array<File>>([])
    const columns = useMemo<ColumnDef<File>[]>(() => {
        return [
            { accessorKey: "name", cell: ({ row }) => <span>{row.original.name}</span> },
            { accessorKey: "size", cell: ({ row }) => <span>{row.original.size} bytes</span> },
            { accessorKey: "type", cell: ({ row }) => <span>{row.original.type}</span> },
        ]
    }, [])
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
                                onDrop={(file) => {
                                    const _file = file as File
                                    const allFiles = [...files, _file]
                                    setFiles(allFiles)
                                }}
                                disabled={false}
                                onError={handleError}
                                type={CONFIG.FILE_TYPE.IMAGE}
                            >
                                <p className="m-0 text-center p-5">Drop or select an image</p>
                            </Dropzone>
                        </div>
                    </CustomCard.Body>
                    <CustomCard.Footer>
                        <div className="d-flex justify-content-end gap-3">
                            <Button title="Cancel" className="btn btn-secondary" />
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
