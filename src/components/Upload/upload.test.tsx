import React from "react";
import { render, RenderResult, fireEvent,waitFor, createEvent } from "@testing-library/react";
import Upload,{uploadProps} from './upload';
import axios from 'axios'

jest.mock('../Icon/icon', () => {
  return ({icon, onClick}:{ icon: any; onClick: any; }) => {
    return <span onClick={onClick}>{icon}</span>
  }
})

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const newUploadProps:uploadProps={
  action: 'http://www.nba.com',
  onProgress: jest.fn(),
  onChange: jest.fn(),
  onSuccess: jest.fn(),
  onError: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}
let wrapper:RenderResult,fileInputs:HTMLInputElement,uploadArea:HTMLElement
const testFile = new File(['xyz'], 'test.png', {type: 'image/png'})
const testFile1 = {hello: 'ppj'}
describe("Test Upload Component",()=>{
  beforeEach(()=>{
    wrapper = render(<Upload {...newUploadProps}>upload_file</Upload>)
    fileInputs = wrapper.container.querySelector('.viking-file-input') as HTMLInputElement
    uploadArea = wrapper.queryByText('upload_file') as HTMLElement
  })
  it("upload process should works fine",async ()=>{
    const { queryByText } = wrapper
    mockedAxios.post.mockResolvedValue({
      'data': 'cool'
    })
    expect(uploadArea).toBeInTheDocument()
    //expect(uploadArea).toHaveClass('viking-upload-input')
    fireEvent.change(fileInputs,{
      target: {
        files: [testFile ]
      }
    })
    expect(queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(newUploadProps.onChange).toHaveBeenCalledWith(testFile)
    expect(newUploadProps.onSuccess).toHaveBeenCalled()
    expect(newUploadProps.onSuccess).toHaveBeenCalledWith({data: "cool"},testFile)
    //remove fileList
    expect(queryByText('times')).toBeInTheDocument()
    const times = queryByText('times') as HTMLElement
    fireEvent.click(times)
    expect(queryByText('test.png')).not.toBeInTheDocument()
    expect(newUploadProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      name: testFile.name,
      size: testFile.size,
      status: 'success'
    }))
  })
  it('upload onError test',async ()=>{
    const { queryByText } = wrapper
    mockedAxios.post.mockRejectedValue({
      "err":'fail'
    })
    fireEvent.change(fileInputs,{
      target: {
        files: [testFile ]
      }
    })
    expect(queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(newUploadProps.onChange).toHaveBeenCalledWith(testFile)
    expect(newUploadProps.onError).toHaveBeenCalled()
  })
  it('upload drap test',async ()=>{
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    mockedAxios.post.mockResolvedValue({
      'data': 'cool'
    })
    const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile]
      }
    })
    fireEvent(uploadArea, mockDropEvent)
    expect(wrapper.queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(newUploadProps.onSuccess).toHaveBeenCalled()
   /*  fireEvent.drop(uploadArea,{
      target:{
        dataTransfer:testFile
      }
    }) */
  }) 
})