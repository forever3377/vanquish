import React from "react";
import { render,RenderResult,fireEvent,waitFor,cleanup } from "@testing-library/react";
import AutoComplete,{AutoCompleteProps,DataSourceType} from "./autoComplete";
import { config } from 'react-transition-group';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
config.disabled = true
const testArray = [
  {value: 'ab', number: 11},
  {value: 'abc', number: 1},
  {value: 'b', number: 4},
  {value: 'c', number: 15},
]
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}
type play = {
  number:number
}
const renderOption = (item:DataSourceType)=>{
  const itemDataSource = item as DataSourceType<play>
  return (
  <div className="hello">  
  <h1 className="renderOption">{itemDataSource.value}</h1>
  <div>age: {itemDataSource.number}</div>
  </div>
  )
}
const handleFetch = (keyword: string) => {
  return fetch(`https://api.github.com/search/users?q=${keyword}`).then(res => res.json())
  .then(({ items }) => {
    return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
  })
}
const newProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
  renderOption
}
const asyncProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {return Promise.resolve(testArray.filter(item => item.value.includes(query)))},
  //fetchSuggestions: jest.fn(query => {return Promise.resolve(testArray.filter(item => item.value.includes(query)))}),
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}
let wrapper:RenderResult,inputNode:HTMLInputElement
describe("Test AutoComplete Component",()=>{
  beforeEach(()=>{
    wrapper = render(<AutoComplete {...testProps}/>)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it("test basic AutoComplete behavior",async ()=>{
    fireEvent.change(inputNode,{
      target: {
        value: 'ab'
      }
    })
    await waitFor(()=>{
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledTimes(1)
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it("AutoComplete should provide keyboard support",async ()=>{
    fireEvent.change(inputNode,{
      target: {
        value: 'ab'
      }
    })
    await waitFor(()=>{
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    let first = wrapper.queryByText('ab')
    let two = wrapper.queryByText('abc')
    fireEvent.keyDown(inputNode,{
      key: "ArrowUp"
    })
    expect(first).toHaveClass('is-active')
    fireEvent.keyDown(inputNode,{
      key: "ArrowDown"
    })
    expect(two).toHaveClass('is-active')
    fireEvent.keyDown(inputNode,{
      key: "Enter"
    })
    expect(inputNode.value).toEqual('abc')
    expect(two).not.toBeInTheDocument()
    fireEvent.change(inputNode,{
      target: {
        value: 'a'
      }
    })
    await waitFor(()=>{
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.keyDown(inputNode,{
      key: 'Escape'
    })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it("AutoComplete click outside should hide the dropdown",async ()=>{
    fireEvent.change(inputNode,{
      target: {
        value: 'ab'
      }
    })
    await waitFor(()=>{
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it("AutoComplete renderOption should generate the right template",async ()=>{
    cleanup()
    wrapper = render(<AutoComplete {...newProps}/>)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    fireEvent.change(inputNode,{
      target: {
        value: 'ab'
      }
    })
    await waitFor(()=>{
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    expect(wrapper.queryByText('ab')).toHaveClass('renderOption')
  })
  it("AutoComplete async fetchSuggestions should works fine",async ()=>{
    cleanup()
    const wrappers= render(<AutoComplete {...asyncProps}/>)
    const inputNodes = wrappers.getByPlaceholderText('auto-complete') as HTMLInputElement
    fireEvent.change(inputNodes, {target: { value: 'ab'}})
    await waitFor(() => {
       // expect(asyncProps.fetchSuggestions).toHaveBeenCalled()
       expect(wrappers.queryByText('ab')).toBeInTheDocument()
       // expect(wrappers.queryByText('ab')).toBeInTheDocument()
    })
   expect(wrappers.queryByText('abc')).toBeInTheDocument()
  })
})