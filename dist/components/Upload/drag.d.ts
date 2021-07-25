import React from "react";
export interface dragProps {
    onFile: (_file: FileList) => void;
}
export declare const Drag: React.FC<dragProps>;
export default Drag;
