import React, { useState } from "react"
import { Dropdown } from "react-bootstrap"
import CardOptionsBtn from "./CardOptionsBtn"

interface Props {
    children: React.ReactNode
    align?: "start" | "end"
    width?: number | string
    btnClass?: string
    btnType?: string
}

const CardOptionsDropdown: React.FC<Props> = ({ children, width = 300, btnType }) => {
    const [show, setShow] = useState(false)
    const [animate, setAnimate] = useState(false)

    const handleToggle = (isOpen: boolean) => {
        setShow(isOpen)

        if (isOpen) {
            setTimeout(() => {
                setAnimate(true)
            }, 10)
        } else {
            setAnimate(false)
        }
    }
    return (
        <Dropdown
            align="end"
            autoClose="outside"
            className="card-toolbar"
            show={show}
            onToggle={handleToggle}
        >
            <Dropdown.Toggle as="div">
                <CardOptionsBtn isActive={show} btnType={btnType as string} />
            </Dropdown.Toggle>

            <Dropdown.Menu
                className={`card-options-dropdown ${animate ? "show-dropdown" : ""}`}
                style={{ width }}
            >
                {children}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CardOptionsDropdown
