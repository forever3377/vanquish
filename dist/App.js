import React, { useState } from 'react';
import Button from './components/Button/button';
import Transition from './components/Transition/transition';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
function App() {
    var _a = useState(true), show = _a[0], setShow = _a[1];
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Menu, null,
                React.createElement(MenuItem, { disabled: true }, "link1"),
                React.createElement(MenuItem, null, "link2"),
                React.createElement(MenuItem, null, "link3"),
                React.createElement(SubMenu, { title: "subMenu" },
                    React.createElement(MenuItem, null, "link4-0"),
                    React.createElement(MenuItem, null, "link4-1"))),
            React.createElement(Transition, { in: show, timeout: 5000, animation: "zoom-in-left" },
                React.createElement("div", null,
                    React.createElement("p", null,
                        "first",
                        React.createElement("code", null, "1"),
                        "example"),
                    React.createElement("p", null,
                        "first",
                        React.createElement("code", null, "2"),
                        "example"))),
            React.createElement(Transition, { in: show, timeout: 5000, animation: "zoom-in-left", wrapper: true },
                React.createElement(Button, { btnType: 'primary' }, "show")),
            React.createElement("div", null,
                React.createElement(Button, { btnType: 'primary', onClick: function () { setShow(!show); } }, "toggle")))));
}
export default App;
