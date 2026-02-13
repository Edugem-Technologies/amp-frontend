"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import React, { useState } from "react"
import Switch from "@mui/material/Switch"
import CardOptionsBtn from "./CardOptionsBtn"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { CardDropdownOptionItf } from "@/types/common/DashboardCardsTypes"

interface Props {
    options: CardDropdownOptionItf[]
    btnClass?: string
}

const PaymentMenuDropdown: React.FC<Props> = ({ options, btnClass }) => {
    const [toggleState, setToggleState] = useState<Record<string, boolean>>({})

    const handleToggle = (id: string, value: boolean) => {
        setToggleState((prev) => ({ ...prev, [id]: value }))
    }

    const renderItems = (items: CardDropdownOptionItf[]) =>
        items.map((item) => {
            // NESTED MENU
            if (item.children?.length) {
                return (
                    <DropdownMenu.Sub key={item.id}>
                        <DropdownMenu.SubTrigger className="menu-item submenu-trigger">
                            <span>{item.label}</span>
                            <ChevronRightIcon className="submenu-arrow" fontSize="large" />
                        </DropdownMenu.SubTrigger>

                        <DropdownMenu.Portal>
                            <DropdownMenu.SubContent className="menu-content cascader-dropdown">
                                {renderItems(item.children)}
                            </DropdownMenu.SubContent>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Sub>
                )
            }

            if (item.type === "toggle") {
                const checked = toggleState[item.id] ?? item.value ?? false

                return (
                    <DropdownMenu.Item
                        key={item.id}
                        className="toggle-item"
                        onSelect={(e) => e.preventDefault()}
                    >
                        <span>{item.label}</span>

                        <Switch
                            checked={checked}
                            onChange={(e) => handleToggle(item.id, e.target.checked)}
                            color="success"
                        />
                    </DropdownMenu.Item>
                )
            }

            return (
                <DropdownMenu.Item
                    key={item.id}
                    className="menu-item"
                    onSelect={() => console.log("CLICK 👉", item.id)}
                >
                    {item.label}
                </DropdownMenu.Item>
            )
        })

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <div className="menu-trigger">
                    <CardOptionsBtn btnClass={btnClass as string} />
                </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="menu-content cascader-dropdown"
                    sideOffset={8}
                    align="end"
                >
                    <DropdownMenu.Label className="menu-header">
                        <h3>Payments</h3>
                    </DropdownMenu.Label>

                    <DropdownMenu.Separator className="menu-separator" />

                    {renderItems(options)}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

export default PaymentMenuDropdown
