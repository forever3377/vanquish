import React,{ReactElement,InputHTMLAttributes, ChangeEvent} from "react";
import classNames from "classnames";
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type InputSize = 'lg'| 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>,'size'>{
  /** input是否为不能操作 */
  disabled?: boolean;
  /** input的尺寸大小 */
  size?: InputSize;
  /** input图标是否显示 */
  icon?: IconProp;
  /** 添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /** 添加后缀 用于配置一些固定组合  */
  append?: string | ReactElement;
  onChange?: (e:ChangeEvent<HTMLInputElement>)=>void
}

/** 
 * 页面中最常用的的表单元素，适合于完成特定的交互
 * ### 引用方法
 * 
 * ~~~js
 * import { Input } from 'vikingship'
 * ~~~
*/
export const Input:React.FC<InputProps> = (props)=>{
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    ...restProps  
  } = props
  const classes = classNames('viking-input-wrapper',{
    [`input-size-${size}`]:size,
    'is-disabled': disabled,
    'input-group': prepend||append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if('value' in props){
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  return(
    <div className={classes} data-testid="test-input">
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} theme="primary"></Icon></div>}
      <input className="viking-input-inner" disabled={disabled} {...restProps}/>
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  )
}

export default Input;