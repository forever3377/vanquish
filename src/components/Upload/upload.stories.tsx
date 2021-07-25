import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Upload,{uploadProps} from "./upload";
import Button from "../Button/button";
const breforeUpload = (file:File)=>{
  let size = file.size/1024
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if(size > 20 || !isJpgOrPng){
    return false
  }
  return true
}
const breforeUploadPromise = (file: File)=>{
  const newFile = new File([file],'hello.tst')
  return Promise.resolve(newFile)
}
const header = {
  "TOKEN": "11111111"
}
const data = {
  "hello": "people"
}
const defaultUpload=()=>{
  return (
    <Upload 
      action="https://run.mocky.io/v3/3bc18cbb-2729-47c7-9f21-251b8e3b2e93" 
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
      onChange={action('change')}
      onRemove={action('remove')}
      data={data}
      name="ppj"
      withCredentials
      accept="image/png,image/jpg"
    >
      <Button btnType="primary">上传文件</Button>
    </Upload>)
}
storiesOf('Upload Component',module)
.add('Upload',defaultUpload)