import React,{useContext,useState} from "react";
import classNames from "classnames";
import {MenuContext} from './menu';
import {MenuItemProps} from './menuItem'
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu:React.FC<SubMenuProps>=function({index,title,className,children}){
  const context=useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
  const [open,setOpen] = useState(isOpend)
  const classes = classNames('menu-item submenu-item',className,{
    'is-active': index === context.index,
    'is-open': open,
    'is-vertical': context.mode === 'vertical'
  })
  const handleClick = ()=>{
    setOpen(!open)
  }
  let timer: any
  const handleMouse= (e:React.MouseEvent,toggle:boolean)=>{
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e:React.MouseEvent)=>{handleMouse(e,true)},
    onMouseLeave: (e:React.MouseEvent)=>{handleMouse(e,false)}
  }:{}
  const renderChildren = ()=>{
    const subMenuClasses = classNames('viking-submenu',{
      'menu-opened': open
    })
    const childrenComponent = React.Children.map(children,(child,i)=>{
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if(childElement.type.displayName === 'MenuItem'){
        return React.cloneElement(childElement,{
          index: `${index}-${i}`
        })
      } else {
        console.error("Warning: SubMenu has a child which is not a MenuItem component")
      }
    })
    return(
      <Transition in={open} timeout={5200} animation="zoom-in-bottom">
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }
  return(<li className={classes} {...hoverEvents}>
    <div className="submenu-title" {...clickEvents}>
      {title}
      <Icon theme="primary" icon="angle-down" className="arrow-icon"/>
    </div>
      {renderChildren()}
  </li>)
}

SubMenu.displayName = 'SubMenu'
export default SubMenu