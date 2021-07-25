import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import AutoComplete,{AutoCompleteProps,DataSourceType} from "./autoComplete";

type player = {
  name: string,
  age: number
}
const newSuggestion = ['curry','kobe','jeams','ad','thomes','paul','jim']
const newSuggestion1:player[] = [
  {name: 'curry', age: 33},
  {name: 'kobe', age: 38},
  {name: 'jeams', age: 36},
  {name: 'ad', age: 27},
  {name: 'thomes', age: 30},
  {name: 'paul', age: 36},
  {name: 'jim', age: 18}
]
const fetchSuggestions = (keyword: string)=>{
  return newSuggestion.filter(name => name.includes(keyword)).map(name => ({value: name}))
}
const fetchSuggestions1 = (keyword: string)=>{
  return newSuggestion1.filter(item => item.name.includes(keyword)).map(item => ({value: item.name,...item}))
}
const handleFetch = (keyword: string) => {
  return fetch(`https://api.github.com/search/users?q=${keyword}`).then(res => res.json())
  .then(({ items }) => {
    return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
  })
}
const onSelect = (item:DataSourceType)=>{
  console.log('item:', item)
}
/* const renderOption = (item:DataSourceType)=>{
  const itemDataSource = item as DataSourceType<player>
  return (
  <>  
  <h1>{itemDataSource.value}</h1>
  <div>age: {itemDataSource.age}</div>
  </>
  )
} */
const defaultAutoComplete = ()=> (
  <AutoComplete fetchSuggestions={handleFetch} onSelect={onSelect}></AutoComplete>
)
storiesOf('AutoComplete Component',module)
.add('AutoComplete',defaultAutoComplete)