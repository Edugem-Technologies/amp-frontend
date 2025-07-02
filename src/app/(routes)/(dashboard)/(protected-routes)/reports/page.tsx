"use client"
import ActionColumn from "@/app/components/common/ActionColumn"
import CommonList from "@/app/components/common/CommonList"
import { ModuleTypeEnum } from "@/enums/ModuleTypeEnum"
import { QueueTaskStatusEnum } from "@/enums/QueueTaskStatusEnum"
import { FetchHelper } from "@/services/FetchHelper"
import { AnyObject } from "@/types/common/Helper"
import { CONFIG } from "@/utils/Constants"
import { handleError } from "@/utils/HandleError"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo, useState } from "react"

const Index = () => {
    const [isDownloading, setIsDownloading] = useState(null)
    const extraColumns = useMemo<ColumnDef<AnyObject>[]>(
        () => [
            {
                header: "Action",
                cell: ({ row }) => {
                    return (
                        <ActionColumn
                            isDownloading={isDownloading === row?.original?.uuid}
                            handleDownload={
                                row?.original?.output_document_uuid &&
                                row?.original?.status === QueueTaskStatusEnum.COMPLETED
                                    ? async () => {
                                          try {
                                              setIsDownloading(row.original.uuid)
                                              const response = await FetchHelper.get(
                                                  CONFIG.API_ENDPOINTS.GET_S3_DOWNLOAD_URL,
                                                  {
                                                      document_uuid:
                                                          row.original.output_document_uuid,
                                                  },
                                              )
                                              if (
                                                  response?.status &&
                                                  response?.data?.download_url
                                              ) {
                                                  window.open(response.data.download_url, "_blank")
                                              }
                                          } catch (error) {
                                              handleError(error)
                                          } finally {
                                              setIsDownloading(null)
                                          }
                                      }
                                    : undefined
                            }
                        />
                    )
                },
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )
    return (
        <CommonList
            isBackendDrivenColumns={true}
            extraColumns={extraColumns}
            sortingId="created_at"
            endpoint={CONFIG.API_ENDPOINTS.GET_QUEUE_TASKS}
            title="Reports"
            moduleType={ModuleTypeEnum.QUEUE_TASK}
            tableClassName="action-columns-width"
            sortByDesc
        />
    )
}

export default Index
