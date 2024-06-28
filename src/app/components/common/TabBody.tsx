import React from "react"
import CustomSkeleton from "./CustomSkeleton"
import { config } from "@/utils/constants"
import { TabBodyPropType } from "@/types/components/tab-body"
import { getArray } from "@/utils/helpers"
import CardLoader from "./CardSkeleton"

const TabBody: React.FC<TabBodyPropType> = ({
    children,
    loading,
    loaderType,
    rowCount = config.DEFAULT_TABLE_SKELETON_ROW_COUNT,
    columnCount = 1,
}) => {
    const getLoader = () => {
        switch (loaderType) {
            case config.LOADER_TYPES.CARD_SKELETON:
                return (
                    <div className="d-flex gap-5 flex-wrap">
                        {getArray(columnCount).map((item) => (
                            <div
                                style={{
                                    flexBasis: `${
                                        (rowCount / columnCount) * config.CARD_SKELETON_BASIS
                                    }%`,
                                }}
                                key={item}
                            >
                                <CardLoader key={item} style={{ width: "100%" }} />
                            </div>
                        ))}
                    </div>
                )

            case config.LOADER_TYPES.TABLE_SKELETON:
                return <CustomSkeleton rowCount={rowCount} />
            default:
                return <CustomSkeleton rowCount={rowCount} />
        }
    }
    return <>{loading ? <div className="card my-5 mb-xl-10 p-8">{getLoader()}</div> : children}</>
}

export default TabBody
