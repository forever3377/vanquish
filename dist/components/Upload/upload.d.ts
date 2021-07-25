import React from "react";
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    name: string;
    size: number;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface uploadProps {
    /** 文件上传的地址 */
    action: string;
    /** 默认展示的列表 */
    defaultFileList?: UploadFile[];
    /** 文件开始上传之前回调 */
    breforeUpload?: (file: File) => boolean | Promise<File>;
    /** 文件上传的进度回调 */
    onProgress?: (percentage: number, file: File) => void;
    /** 文件上传的成功回调 */
    onSuccess?: (data: any, file: File) => void;
    /** 文件上传的失败回调 */
    onError?: (err: any, file: File) => void;
    /** 文件改变的回调 */
    onChange?: (file: File) => void;
    /** 文件移除的失败回调 */
    onRemove?: (file: UploadFile) => void;
    header?: {
        [key: string]: any;
    };
    name?: string;
    data?: {
        [key: string]: any;
    };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}
export declare const Upload: React.FC<uploadProps>;
export default Upload;
