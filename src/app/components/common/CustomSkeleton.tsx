import { CustomSkeletonType } from "@/types/common/custom-skeleton"
import { config } from "@/utils/constants"
import Skeleton from "react-loading-skeleton"

/**
 * Custom skeleton loader component.
 * @param {CustomSkeletonType} props - Props for the custom skeleton loader.
 * @returns {JSX.Element} - Custom skeleton loader element.
 */
const CustomSkeleton: React.FC<CustomSkeletonType> = ({
    rowCount,
    stopHorizontalScrolling,
    stopVh,
}) => {
    return (
        <div className={`${stopVh ? "" : "vh-100"} ${stopHorizontalScrolling ? "p-8" : ""}`}>
            <Skeleton
                count={rowCount ? rowCount : config.SKELETON_CONFIGURATION.SKELETON_ROWS_COUNT}
                height={config.SKELETON_CONFIGURATION.SKELETON_HEIGHT}
                className={"mb-2"}
            />
        </div>
    )
}

export default CustomSkeleton
