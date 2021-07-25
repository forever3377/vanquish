import React,{useContext} from "react";
import classNames from "classnames";
import {MenuContext} from './menu';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem:React.FC<MenuItemProps> = function(props){
  const {index,children,className,disabled,style} = props
  const content = useContext(MenuContext)
  const classes = classNames('menu-item',className,{
    'is-disabled': disabled,
    'is-active': index === content.index
  })
  const handleClick = ()=>{
    if(content.onSelect&&!disabled&&typeof index === 'string'){
      content.onSelect(index)
    }
  }
  return (<li className={classes} style={style} onClick={handleClick}>{children}</li>)
}
MenuItem.displayName = 'MenuItem'
export default MenuItem