import { CustomSkeletonType } from "@/types/common/custom-skeleton"
import { CONFIG } from "@/utils/constants"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

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
                count={rowCount ? rowCount : CONFIG.SKELETON_CONFIGURATION.SKELETON_ROWS_COUNT}
                height={CONFIG.SKELETON_CONFIGURATION.SKELETON_HEIGHT}
                className={"mb-2"}
            />
        </div>
    )
}

export default CustomSkeleton
