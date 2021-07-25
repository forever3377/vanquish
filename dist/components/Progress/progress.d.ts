import React from "react";
import { ThemeProps } from "../Icon/icon";
export interface progressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}
export declare const Progress: React.FC<progressProps>;
export default Progress;
