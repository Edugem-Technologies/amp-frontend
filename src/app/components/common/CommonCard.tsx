import { CommonCardInterface } from "@/types/common/CommonCard"
import { CONFIG } from "@/utils/constants"
import { formatTextToCapitalized } from "@/utils/helpers"
import { getRandomColor } from "@bombaysoftwares/tskit"
import { useRouter } from "next/navigation"
import React from "react"
import CustomButton from "../button/Button"
import SecondaryButton from "../button/SecondaryButton"
import CopyToClipboard from "./CopyToClipboard"
import ShowImageOrTextWithBackground from "./ShowImageOrTextWithBackground"

const CommonCard: React.FC<CommonCardInterface> = (props) => {
    const { isEditDisabled } = props
    const router = useRouter()
    return (
        <div className="card card-bordered h-100">
            <div className="card-body d-flex flex-center flex-column py-9 px-2 text-center">
                <ShowImageOrTextWithBackground
                    color={getRandomColor()}
                    text={props?.first_name?.[0]?.toUpperCase()}
                    imageSource={props?.avatar}
                    alt="user logo"
                    size={CONFIG.IMAGE_SIZE.USER_CARD}
                    className="symbol symbol-65px symbol-circle mb-3 listing-card-image"
                    iconName={props.iconName || ""}
                    iconHeight={props.iconHeight || 13}
                    iconWidth={props.iconWidth || 13}
                />
                <div
                    title={`${props?.first_name ?? ""} ${props?.last_name || ""}`}
                    className="card-heading text-overflow-ellipses"
                >
                    {`${props?.first_name ?? ""} ${props?.last_name || ""}`}
                </div>
                <div className="text-overflow-ellipses" title={props?.role ?? ""}>
                    {props?.role ?? ""}
                </div>
                <div className="text-overflow-ellipses" title={props?.description ?? ""}>
                    {props?.description ?? ""}
                </div>
                <div className="text-overflow-ellipses">
                    {formatTextToCapitalized(props?.status) ?? ""}
                </div>
                <div className="fw-semibold text-gray-500 mb-4 flex-center w-100">
                    <a
                        className="text-truncate"
                        title={props?.email ?? ""}
                        href={`mailto:${props?.email}`}
                    >
                        {props?.email ?? ""}
                    </a>
                    {props?.email && <CopyToClipboard textToCopy={props?.email} />}
                </div>
                <div className="mt-auto max-w-100 d-flex flex-column align-items-center">
                    {(props.onClickEditButton || props.editUserHref) && (
                        <SecondaryButton
                            disabled={isEditDisabled}
                            customClassName={`btn ${props.editButtonClass} w-200px text-center btn-flex btn-center d-block mb-3 max-w-100 mt-auto`}
                            onClick={() => {
                                if (props.editUserHref) {
                                    router.push(props.editUserHref)
                                } else {
                                    props.onClickEditButton && props.onClickEditButton()
                                }
                            }}
                            buttonTitle={`Edit ${props.buttonName ?? ""}`}
                            type="button"
                        />
                    )}

                    {props.handleDelete && (
                        <CustomButton
                            customClassName="btn btn-sm btn-danger w-200px text-center btn-flex btn-center d-block max-w-100 mt-auto"
                            onClick={() => props.handleDelete && props.handleDelete()}
                            buttonTitle={`Delete ${props.buttonName ?? ""}`}
                            type="button"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CommonCard
