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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect, useRef } from "react";
import classNames from 'classnames';
import Input from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import Transition from "../Transition/transition";
import useClickOutside from "../../hooks/useClickOutside";
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, renderOption = props.renderOption, value = props.value, restProps = __rest(props, ["fetchSuggestions", "onSelect", "renderOption", "value"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSugestions = _b[1];
    var _c = useState(false), showDropdown = _c[0], setShowDropdown = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var _e = useState(false), loading = _e[0], setLoading = _e[1];
    var debounceValue = useDebounce(inputValue, 400);
    useClickOutside(componentRef, function () {
        setSugestions([]);
        setShowDropdown(false);
    });
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            setSugestions([]);
            var result = fetchSuggestions(inputValue);
            if (result instanceof Promise) {
                setLoading(true);
                result.then(function (item) {
                    setLoading(false);
                    setSugestions(item);
                    if (item.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSugestions(result);
                if (result.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setSugestions([]);
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
    }, [debounceValue]);
    var handleChange = function (e) {
        var keyword = e.target.value.trim();
        setInputValue(keyword);
        setShowDropdown(false);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setShowDropdown(false);
        triggerSearch.current = false;
        if (onSelect) {
            onSelect(item);
        }
    };
    var keyUpDown = function (nowIndex) {
        if (nowIndex < 0) {
            nowIndex = 0;
        }
        if (nowIndex >= suggestions.length) {
            nowIndex = suggestions.length - 1;
        }
        setHighlightIndex(nowIndex);
    };
    var handlePress = function (e) {
        var key = e.key;
        switch (key) {
            case "ArrowUp":
                keyUpDown(highlightIndex - 1);
                break;
            case "ArrowDown":
                keyUpDown(highlightIndex + 1);
                break;
            case "Enter":
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case "Escape":
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, animation: "zoom-in-top", timeout: 300, onExited: function () { setSugestions([]); } },
            React.createElement("ul", { className: "viking-suggestion-list" },
                loading &&
                    React.createElement("div", { className: "suggstions-loading-icon" },
                        React.createElement(Icon, { theme: "info", icon: "spinner", spin: true })),
                suggestions.map(function (item, index) {
                    var classes = classNames('suggestion-item', {
                        'is-active': index === highlightIndex
                    });
                    return (React.createElement("li", { key: index, className: classes, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
                }))));
    };
    return (React.createElement("div", { className: "viking-auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onKeyDown: handlePress, onChange: handleChange }, restProps)),
        generateDropdown()));
};
export default AutoComplete;
