import { UseDataDeleteEffectPropsType } from "@/types/hooks/useDataDeleteEffect"
import { useEffect, useState } from "react"

/**
 * Custom hook to handle data deletion effects in a paginated table.
 *
 * @param {UseDataDeleteEffectPropsType} props - The properties passed to the hook
 * @param {Array} props.data - The current data set
 * @param {object} props.filters - The current filter state
 * @param {Function} props.setFilters - Function to update the filter state
 * @param {boolean} props.initialRender - Flag indicating if it's the initial render
 * @param {boolean} props.assetDeleted - Flag indicating if an asset has been deleted
 *
 * @returns {boolean} A flag to indicate if data should be reloaded
 */
const useDataDeleteEffect: React.FC<UseDataDeleteEffectPropsType> = (props) => {
    const { data, filters, setFilters, initialRender, assetDeleted } = props
    const [reloadData, setReloadData] = useState(false)

    useEffect(() => {
        if (data?.length <= 1 && filters.page > 1) {
            // Update the page filter if there's only one item left and it's not the first page
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setFilters((prev: any) => ({ ...prev, page: prev.page - 1 }))
        } else if (initialRender) {
            // Reload data on initial render
            setReloadData((prev) => !prev)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assetDeleted])

    return reloadData
}

export default useDataDeleteEffect
