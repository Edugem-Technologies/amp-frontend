import { ALERT_ICON_TYPE, CONFIG } from "@/utils/constants"
import Icon from "./Icon"
import { handleError } from "@/utils/handle-error"
import { showSweetAlert } from "@/utils/helpers"

const CopyToClipboard = ({ textToCopy }: { textToCopy: string }) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy)
            ALERT_ICON_TYPE.success,
                showSweetAlert({
                    icon: ALERT_ICON_TYPE.success,
                    text: CONFIG.MESSAGES.COPIED_SUCCESSFULLY,
                })
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <button className="btn btn-sm px-2 pt-1" onClick={() => handleCopy()}>
            <Icon iconName="copy" width={13} height={13} />
        </button>
    )
}

export default CopyToClipboard
