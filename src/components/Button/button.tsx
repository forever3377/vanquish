import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import classNames from 'classnames'
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
export interface BaseButtonProps{
  className?: string,
  //size尺寸大小
  size?: ButtonSize,
  /**button类型 */
  btnType?: ButtonType,
  /**设置 Button 的禁用 */
  disabled?: boolean,
  //展示按钮的内容
  children: React.ReactNode,
  //链接
  href?: string
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 * 
 * ~~~js
 * import { Button } from 'vikingship'
 * ~~~
 */
export const Button:React.FC<ButtonProps>=function(props){
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props
  const classes = classNames('btn',className,{
    [`btn-${btnType}`]:btnType,
    [`btn-${size}`]:size,
    'disabled': (btnType === 'link') && disabled
  })
  if(btnType === 'link' && href){
    return(
      <a className={classes} href={href} {...restProps}>{children}</a>
    )
  }else{
    return(
      <button className={classes} disabled={disabled} {...restProps}>{children}</button>
    )
  }
}
Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}
export default Button;
