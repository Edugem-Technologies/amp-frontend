"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import React, { useState } from "react"
import CardOptionsBtn from "./CardOptionsBtn"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { CardDropdownOptionItf } from "@/types/common/DashboardCardsTypes"

interface Props {
    options: CardDropdownOptionItf[]
    btnType?: string
}

const PaymentMenuDropdown: React.FC<Props> = ({ options, btnType }) => {
    // const [toggleState, setToggleState] = useState<Record<string, boolean>>({})
    const [open, setOpen] = useState(false)

    // const handleToggle = (id: string, value: boolean) => {
    //     setToggleState((prev) => ({ ...prev, [id]: value }))
    // }

    const renderItems = (items: CardDropdownOptionItf[]) =>
        items.map((item, index) => {
            // NESTED MENU
            if (item.children?.length) {
                return (
                    <DropdownMenu.Sub key={index}>
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
                // const checked = toggleState[item.id] ?? item.value ?? false

                return (
                    <div className="menu-item" key={index}>
                        <label className="form-check form-switch form-check-custom form-check-solid">
                            <input
                                className="form-check-input w-30px h-20px"
                                type="checkbox"
                                value="1"
                                name="notifications"
                            />
                            <span className="form-check-label text-muted fs-6">Recuring</span>
                        </label>
                    </div>
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
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
                <div className="menu-trigger">
                    <CardOptionsBtn btnType={btnType as string} isActive={open} />
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
