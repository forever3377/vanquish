import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from './menu';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
var MenuItem = function (props) {
    var index = props.index, children = props.children, className = props.className, disabled = props.disabled, style = props.style;
    var content = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': index === content.index
    });
    var handleClick = function () {
        if (content.onSelect && !disabled && typeof index === 'string') {
            content.onSelect(index);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
