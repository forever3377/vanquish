import React, { ReactElement } from "react";
import { InputProps } from "../Input/input";
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (keyword: string) => DataSourceObject[] | Promise<DataSourceObject[]>;
    onSelect?: (item: DataSourceObject) => void;
    renderOption?: (item: DataSourceObject) => ReactElement;
}
export declare const AutoComplete: React.FC<AutoCompleteProps>;
export default AutoComplete;
