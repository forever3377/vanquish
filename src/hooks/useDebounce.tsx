import { useEffect,useState } from "react";

const useDebounce = (value:any,delay:number=300)=>{
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(()=>{
    const timer = window.setTimeout(()=>{
      console.log('value:',value)
      setDebounceValue(value)
    },delay)
    return ()=>{clearTimeout(timer)}
  },[value,delay])
  return debounceValue
}
export default useDebounce