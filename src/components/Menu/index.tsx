import { FC } from "react";
import Menu,{menuProps} from "./menu";
import MenuItem,{MenuItemProps} from "./menuItem";
import SubMenu,{SubMenuProps} from "./subMenu";

export type IMenuComponent = FC<menuProps> & {
  Item: FC<MenuItemProps>,
  SubMenu: FC<SubMenuProps>
}
const TransMenu = Menu as IMenuComponent
TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu
