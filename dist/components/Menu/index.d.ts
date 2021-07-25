import { FC } from "react";
import { menuProps } from "./menu";
import { MenuItemProps } from "./menuItem";
import { SubMenuProps } from "./subMenu";
export declare type IMenuComponent = FC<menuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
