import React, { CSSProperties } from "react";
export declare type MenuMode = 'horizontal' | 'vertical';
declare type onSelect = (selectedIndex: string) => void;
export interface menuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: CSSProperties;
    onSelect?: onSelect;
    defaultOpenSubMenus?: string[];
}
export interface IMenuContext {
    index: string;
    onSelect?: onSelect;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: React.FC<menuProps>;
export default Menu;
