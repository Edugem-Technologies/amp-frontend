import { TabBodyPropType } from "@/types/components/tab-body"
import { config } from "@/utils/constants"
import { getArray } from "@/utils/helpers"
import React from "react"
import CardLoader from "./CardSkeleton"
import CustomSkeleton from "./CustomSkeleton"

/**
 * Component to display the body of a tab with optional loading skeletons.
 *
 * @component
 * @param {React.ReactNode} props.children - The children elements to render when not loading.
 * @param {boolean} props.loading - Flag indicating if the component is in a loading state.
 * @param {string} props.loaderType - The type of loader to display (e.g., card or table skeleton).
 * @param {number} [props.rowCount=config.DEFAULT_TABLE_SKELETON_ROW_COUNT] - The number of rows for the table skeleton loader.
 * @param {number} [props.columnCount=1] - The number of columns for the card skeleton loader.
 * @returns {JSX.Element} The JSX element to render.
 */
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
