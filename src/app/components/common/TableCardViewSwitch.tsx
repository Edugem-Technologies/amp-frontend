import { TableCardViewSwitchPropType } from "@/types/common/TableCardViewSwitch"
import React from "react"
import CustomTooltip from "./CustomTooltip"

const TableCardViewSwitch: React.FC<TableCardViewSwitchPropType> = ({
    tableView,
    setTableView,
}) => {
    return (
        <ul className="nav nav-pills mb-0 align-items-center" role="tablist">
            <li
                className="nav-item m-0 me-2"
                data-bs-toggle="tooltip"
                data-tooltip-id="v-status-tooltip"
                data-tooltip-content="Table View"
            >
                <a
                    className={`btn btn-sm btn-icon btn-dark btn-active-dark ${
                        tableView ? "active" : ""
                    }`}
                    onClick={() => setTableView(true)}
                >
                    <span className="svg-icon svg-icon-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 26 22"
                            fill="none"
                        >
                            <path
                                d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z"
                                fill="white"
                            ></path>
                            <path
                                opacity="0.3"
                                d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                                fill="white"
                            ></path>
                        </svg>
                    </span>
                </a>
            </li>
            <li
                className="nav-item m-0"
                data-bs-toggle="tooltip"
                data-tooltip-id="v-status-tooltip"
                data-tooltip-content="Thumbnail View"
            >
                <a
                    className={`btn btn-sm btn-icon btn-dark btn-active-dark me-3 ${
                        tableView ? "" : "active"
                    }`}
                    data-bs-toggle="tab"
                    onClick={() => setTableView(false)}
                >
                    <span className="svg-icon svg-icon-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                        >
                            <g stroke="none" stroke-width="1" fill="white" fill-rule="evenodd">
                                <rect x="5" y="5" width="5" height="5" rx="1"></rect>
                                <rect x="14" y="5" width="5" height="5" rx="1" opacity="0.3"></rect>
                                <rect x="5" y="14" width="5" height="5" rx="1" opacity="0.3"></rect>
                                <rect
                                    x="14"
                                    y="14"
                                    width="5"
                                    height="5"
                                    rx="1"
                                    opacity="0.3"
                                ></rect>
                            </g>
                        </svg>
                    </span>
                </a>
            </li>
            <CustomTooltip id="v-status-tooltip" />
        </ul>
    )
}

export default TableCardViewSwitch
