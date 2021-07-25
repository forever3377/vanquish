import { keyword } from "color-convert/route";
import { link } from "fs";
import React, { ChangeEvent, ReactElement, useState, useEffect, KeyboardEvent,useRef} from "react";
import classNames from 'classnames';
import Input,{InputProps} from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import Transition from "../Transition/transition";
import useClickOutside from "../../hooks/useClickOutside"
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps,'onSelect'>{
  fetchSuggestions:(keyword:string) => DataSourceObject[] | Promise<DataSourceObject[]>;
  onSelect?:(item:DataSourceObject) => void;
  renderOption?:(item: DataSourceObject) => ReactElement;
}

export const AutoComplete:React.FC<AutoCompleteProps>=(props)=>{
    const {
      fetchSuggestions,
      onSelect,
      renderOption,
      value,
      ...restProps
    } = props
    const [ inputValue, setInputValue ] = useState(value as string)
    const [ suggestions, setSugestions ] = useState<DataSourceType[]>([])
    const [ showDropdown, setShowDropdown] = useState(false)
    const [ highlightIndex, setHighlightIndex] = useState(-1)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const [loading, setLoading] = useState(false)
    const debounceValue=useDebounce(inputValue,400)
    useClickOutside(componentRef,()=>{
      setSugestions([])
      setShowDropdown(false)
    })
    useEffect(()=>{
      if(debounceValue && triggerSearch.current){
        setSugestions([])
        let result=fetchSuggestions(inputValue)
        if(result instanceof Promise){
          setLoading(true)
          result.then(item=>{
            setLoading(false)
            setSugestions(item)
            if(item.length>0){
              setShowDropdown(true)
            }
          })
        }else{
          setSugestions(result)
          if(result.length>0){
            setShowDropdown(true)
          }
        }
      }else{
        setSugestions([])
        setShowDropdown(false)
      }
      setHighlightIndex(-1)
    },[debounceValue])
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
      let keyword = e.target.value.trim()
      setInputValue(keyword)
      setShowDropdown(false)
      triggerSearch.current = true
    }
    const handleSelect = (item:DataSourceType)=>{
      setInputValue(item.value)
      setShowDropdown(false)
      triggerSearch.current = false
      if(onSelect){
        onSelect(item)
      }
    }
    const keyUpDown = (nowIndex:number)=>{
      if(nowIndex<0){
        nowIndex = 0
      }
      if(nowIndex>=suggestions.length){
        nowIndex = suggestions.length-1
      }
      setHighlightIndex(nowIndex)
    }
    const handlePress = (e: KeyboardEvent<HTMLInputElement>)=>{
      let key = e.key;
      switch(key){
        case "ArrowUp":
          keyUpDown(highlightIndex - 1)
          break
        case "ArrowDown":
          keyUpDown(highlightIndex + 1)
          break
        case "Enter":
          if(suggestions[highlightIndex]){
            handleSelect(suggestions[highlightIndex])
          }
          break
        case "Escape":
          setShowDropdown(false)
          break
        default:
          break  
      }
    }
    const renderTemplate = (item:DataSourceType)=>{
      return renderOption ? renderOption(item) : item.value
    }
    const generateDropdown = ()=>{
      return (
        <Transition 
        in={showDropdown||loading}  
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {setSugestions([])}}
        >
           <ul className="viking-suggestion-list">
            {loading &&
            <div className="suggstions-loading-icon">
              <Icon theme="info" icon="spinner" spin/>
            </div>}
            {
              suggestions.map((item,index)=>{
                const classes = classNames('suggestion-item',{
                  'is-active': index === highlightIndex
                })
                return (<li key={index} className={classes} onClick={()=>handleSelect(item)}>{renderTemplate(item)}</li>)
              })
            }
          </ul>
        </Transition>
      )
    }
    return(
      <div className="viking-auto-complete" ref={componentRef}>
        <Input value={inputValue} onKeyDown={handlePress} onChange={handleChange} {...restProps}></Input>
        {generateDropdown()}
      </div>
    )
}

export default AutoComplete