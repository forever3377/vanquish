import { useEffect } from 'react';
function useClickOutside(ref, callback) {
    useEffect(function () {
        var lister = function (e) {
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            }
            callback();
        };
        document.addEventListener('click', lister);
        return function () {
            document.removeEventListener('click', lister);
        };
    }, [ref, callback]);
}
export default useClickOutside;
