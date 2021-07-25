import React, { ReactElement, InputHTMLAttributes, ChangeEvent } from "react";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
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
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * 页面中最常用的的表单元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'vikingship'
 * ~~~
*/
export declare const Input: React.FC<InputProps>;
export default Input;
