import React from "react";
import { UploadFile } from "./upload";
export interface uploadFileProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}
export declare const UploadList: React.FC<uploadFileProps>;
export default UploadList;
