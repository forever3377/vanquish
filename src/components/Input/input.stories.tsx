import React, { ChangeEvent, useState } from "react";
import {storiesOf} from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Input from "./input";

const DefaultInput = ()=>{
  const [value, setValue] = useState('')
  return (
    <Input value={value} defaultValue={value} placeholder="defaultInput" onChange={(e)=>{setValue(e.target.value)}}></Input>
  )
}

const sizeInput = ()=>(
  <>
    <Input placeholder="sizeInput" size="sm"></Input>
    <Input placeholder="sizeInput" size="lg"></Input>
  </>
)
const disabledInput = () => (
  <Input placeholder="disabledInput" disabled></Input>
)
const iconInput = () => (
  <Input placeholder="icon" icon="search" onChange={action('hello')}></Input> 
)
const affixesInput = () => (
  <>
    <Input prepend="https://" placeholder="prepend"></Input>
    <Input append=".com" placeholder="append"></Input>
  </>
)
storiesOf('Input Component',module)
.add('Input',DefaultInput)
.add('Input的不同尺寸', sizeInput)
.add('Input是否为disabled', disabledInput)
.add('Input是否有icon',iconInput)
.add('Input是否为前后缀',affixesInput)
