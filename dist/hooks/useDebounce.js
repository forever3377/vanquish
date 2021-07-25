import { useEffect, useState } from "react";
var useDebounce = function (value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debounceValue = _a[0], setDebounceValue = _a[1];
    useEffect(function () {
        var timer = window.setTimeout(function () {
            console.log('value:', value);
            setDebounceValue(value);
        }, delay);
        return function () { clearTimeout(timer); };
    }, [value, delay]);
    return debounceValue;
};
export default useDebounce;
