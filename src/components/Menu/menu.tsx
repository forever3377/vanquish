import React, { CSSProperties,useState } from "react";
import classNames from "classnames";
import {MenuItemProps} from './menuItem'

export type MenuMode = 'horizontal' | 'vertical'
type onSelect = (selectedIndex: string) => void
export interface menuProps{
  /*默认菜单的active的索引值 */
  defaultIndex?:string;
  className?: string;
  /*菜单的展示的方向*/
  mode?: MenuMode;
  style?: CSSProperties;
  onSelect?: onSelect;
  /*默认菜单的展开项*/
  defaultOpenSubMenus?: string[]
}
export interface IMenuContext{
  index:string;
  onSelect?:onSelect;
  mode?: MenuMode;
  /*默认*/
  defaultOpenSubMenus?: string[]
}

export const MenuContext = React.createContext<IMenuContext>({
  index:'0'
})
const Menu:React.FC<menuProps>=function (props){
  const { className, mode, style, children, defaultIndex, onSelect,defaultOpenSubMenus } = props
  const [ current, setCurrent] = useState(defaultIndex)
  const handleClick = (index:string)=>{
    setCurrent(index)
    if(onSelect){
      onSelect(index)
    }
  }
  const classes = classNames('viking-menu',className,{
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal'
  })
  const initValue:IMenuContext = {
    index: current?current:'0',
    onSelect:handleClick,
    mode,
    defaultOpenSubMenus
  }
  const renderChildren = ()=>{
    return React.Children.map(children,(child,index)=>{
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if(displayName === 'MenuItem'||displayName === 'SubMenu'){
        return React.cloneElement(childElement,{
          index:index.toString()
        })
      }else{
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }
  return (<ul className={classes} style={style} data-testid="test-menu">
    <MenuContext.Provider value={initValue}>
        {renderChildren()}
    </MenuContext.Provider>    
     </ul>)
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}
export default Menu