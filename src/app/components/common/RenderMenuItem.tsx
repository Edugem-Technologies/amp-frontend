import { SideBarItemsType } from "@/types/components/aside"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar"

/**
 * Recursively renders a sidebar menu with menu items and nested submenus.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {SideBarItemsType[]} props.sideBarItems - An array of sidebar items to render. Each item can either be a menu item or a submenu.
 *
 * @typedef {Object} SideBarItemsType
 * @property {string} label - The name or label of the menu item.
 * @property {string} [href] - The URL to navigate to when the menu item is clicked. Optional for submenus.
 * @property {SideBarItemsType[]} [sideBarItems] - Nested sidebar items for submenus. Optional for regular menu items.
 *
 * @returns {JSX.Element} A menu component with menu items and nested submenus, rendered recursively.
 *
 */
const RenderMenuItem = ({ sideBarItems }: { sideBarItems: SideBarItemsType[] }) => {
    const pathName = usePathname()

    /**
     * Determines if a menu item is active based on the current pathname.
     *
     * @param {string | undefined} url - The URL of the menu item.
     * @returns {boolean} True if the menu item's URL matches the current pathname, false otherwise.
     */
    const isActive = (url: string | undefined) => {
        if (url) {
            return pathName === url
        }
    }

    /**
     * Generates a menu item with the appropriate styling and link.
     *
     * @param {string} name - The label of the menu item.
     * @param {string | undefined} link - The URL of the menu item.
     * @returns {JSX.Element} A styled menu item component.
     */
    const getMenuItems = (name: string, link: string | undefined) => {
        return (
            <MenuItem
                key={name}
                style={{
                    color: isActive(link) ? "#e84118" : "#181C32",
                }}
                component={link && <Link href={link} />}
            >
                <span className="bullet bullet-dot"></span>
                <span>{name}</span>
            </MenuItem>
        )
    }
    return (
        <Menu>
            {sideBarItems?.map((sideBarItem) => {
                return sideBarItem.sideBarItems && sideBarItem.sideBarItems ? (
                    /**
                     * Renders a submenu recursively if nested items are present.
                     */
                    <SubMenu label={sideBarItem.label}>
                        <RenderMenuItem sideBarItems={sideBarItem.sideBarItems} />
                    </SubMenu>
                ) : (
                    getMenuItems(sideBarItem.label, sideBarItem.href)
                )
            })}
        </Menu>
    )
}

export default RenderMenuItem
