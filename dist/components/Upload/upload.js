var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useState, useRef } from "react";
import UploadList from "./uploadList";
import Drag from "./drag";
import axios from "axios";
export var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, breforeUpload = props.breforeUpload, onChange = props.onChange, onRemove = props.onRemove, header = props.header, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, drag = props.drag, children = props.children;
    //const [file,setFile] = useState<any>([])
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var componentRef = useRef(null);
    var updateFileList = function (nowFile, fileAttr) {
        setFileList(function (fileList) {
            return fileList.map(function (file) {
                if (file.uid === nowFile.uid) {
                    return __assign(__assign({}, file), fileAttr);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (componentRef.current) {
            componentRef.current.value = "";
        }
    };
    var handleRemove = function (_file) {
        setFileList(function (fileList) {
            return fileList.filter(function (file) { return (file.uid !== _file.uid); });
        });
        if (onRemove) {
            onRemove(_file);
        }
    };
    var handleClick = function () {
        if (componentRef.current) {
            componentRef.current.click();
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!breforeUpload) {
                post(file);
            }
            else {
                var result = breforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (data) {
                        post(data);
                    });
                }
                else {
                    if (result) {
                        post(file);
                    }
                }
            }
        });
    };
    var post = function (files) {
        var _file = {
            uid: Date.now() + 'upload_file',
            name: files.name,
            size: files.size,
            status: 'ready',
            percent: 0
        };
        setFileList(function (fileList) {
            return __spreadArray([_file], fileList);
        });
        var formData = new FormData();
        formData.append(name || 'files', files);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, header), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                updateFileList(_file, {
                    status: "uploading",
                    percent: percentage
                });
                if (percentage < 100) {
                    if (onProgress) {
                        onProgress(percentage, files);
                    }
                }
            }
        }).then(function (data) {
            updateFileList(_file, {
                status: "success",
                response: data
            });
            if (onSuccess) {
                onSuccess(data, files);
            }
            if (onChange) {
                onChange(files);
            }
        }).catch(function (err) {
            updateFileList(_file, {
                status: "error",
                error: err
            });
            if (onError) {
                onError(err, files);
            }
            if (onChange) {
                onChange(files);
            }
        });
    };
    return (React.createElement("div", { className: "viking-upload-component" },
        React.createElement("div", { className: "viking-upload-input", style: { display: 'inline-block' }, onClick: handleClick },
            React.createElement("input", { className: "viking-file-input", style: { display: 'none' }, ref: componentRef, type: "file", accept: accept, onChange: handleChange, multiple: multiple }),
            drag ? React.createElement(Drag, { onFile: function (_file) { uploadFiles(_file); } }, children)
                : children),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
export default Upload;
