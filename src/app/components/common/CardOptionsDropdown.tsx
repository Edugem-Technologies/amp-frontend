import React from "react"
import { Dropdown } from "react-bootstrap"
import CardOptionsBtn from "./CardOptionsBtn"

interface Props {
    children: React.ReactNode
    align?: "start" | "end"
    width?: number | string
    btnClass?: string
}

const CardOptionsDropdown: React.FC<Props> = ({ children, width = 300, btnClass }) => {
    return (
        <Dropdown align="end" autoClose="outside">
            <Dropdown.Toggle as="div">
                <CardOptionsBtn btnClass={btnClass as string} />
            </Dropdown.Toggle>

            {/* <Dropdown.Menu className="filter-dropdown">
                <div className="p-3">
                    <h6 className="mb-3">Filter Options</h6>

                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select className="form-select">
                            <option value="">Select option</option>
                            <option>Approved</option>
                            <option>Pending</option>
                            <option>In Process</option>
                            <option>Rejected</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Member Type</label>
                        <div className="d-flex flex-column gap-1">
                            <label>
                                <input type="checkbox" /> Author
                            </label>
                            <label>
                                <input type="checkbox" /> Customer
                            </label>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-light btn-sm">Reset</button>
                        <button className="btn btn-success btn-sm">Apply</button>
                    </div>
                </div>
            </Dropdown.Menu> */}

            <Dropdown.Menu className="card-options-dropdown" style={{ width }}>
                {children}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CardOptionsDropdown
