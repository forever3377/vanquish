import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
export interface BaseButtonProps {
    className?: string;
    size?: ButtonSize;
    /**button类型 */
    btnType?: ButtonType;
    /**设置 Button 的禁用 */
    disabled?: boolean;
    children: React.ReactNode;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'vikingship'
 * ~~~
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;
