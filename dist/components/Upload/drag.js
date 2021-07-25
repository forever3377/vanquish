import React, { useState } from "react";
import classNames from "classnames";
export var Drag = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragover = _a[0], setDragover = _a[1];
    var classes = classNames("viking-uploader-dragger", {
        'is-dragover': dragover
    });
    var handleDragOver = function (e, over) {
        e.preventDefault();
        setDragover(over);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setDragover(false);
        onFile(e.dataTransfer.files);
    };
    return (React.createElement("div", { className: classes, onDragOver: function (e) { return handleDragOver(e, true); }, onDragLeave: function (e) { return handleDragOver(e, false); }, onDrop: handleDrop }, children));
};
export default Drag;
