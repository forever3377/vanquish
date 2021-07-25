import React,{ChangeEvent, useEffect,useState,useRef} from "react";
import UploadList from "./uploadList";
import Drag from "./drag";
import axios from "axios"
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile{
  uid: string;
  name: string;
  size: number;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}
export interface uploadProps{
  /** 文件上传的地址 */
  action: string;
  /** 默认展示的列表 */
  defaultFileList?: UploadFile[];
  /** 文件开始上传之前回调 */
  breforeUpload?: (file:File) => boolean | Promise<File>;
  /** 文件上传的进度回调 */
  onProgress?: (percentage: number,file:File) => void;
  /** 文件上传的成功回调 */
  onSuccess?: (data:any,file:File) => void;
  /** 文件上传的失败回调 */
  onError?: (err:any,file:File) => void;
  /** 文件改变的回调 */
  onChange?: (file:File) => void;
  /** 文件移除的失败回调 */
  onRemove?: (file:UploadFile) => void;
  header?: {[key: string]:any};
  name?: string;
  data?: {[key: string]:any};
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
}

export const Upload:React.FC<uploadProps> = (props)=>{
  const {
    action,
    defaultFileList,
    onProgress,
    onSuccess,
    onError,
    breforeUpload,
    onChange,
    onRemove,
    header,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children
  } = props
  //const [file,setFile] = useState<any>([])
  const [fileList,setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const componentRef = useRef<HTMLInputElement>(null)
  const updateFileList = (nowFile:UploadFile,fileAttr: Partial<UploadFile>)=>{
    setFileList(fileList=>{
     return fileList.map(file=>{
        if(file.uid === nowFile.uid){
          return {...file,...fileAttr}
        }else{
          return file
        }
      })
    })
  }
  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    let files = e.target.files
    if(!files){
      return
    }
    uploadFiles(files)
    if(componentRef.current){
      componentRef.current.value = ""
    }
  }
  const handleRemove = (_file:UploadFile)=>{
    setFileList(fileList=>{
      return fileList.filter(file => (file.uid !== _file.uid))
    })
    if(onRemove){
      onRemove(_file)
    }
  }
  const handleClick = () => {
    if(componentRef.current){
      componentRef.current.click()
    }
  }
  const uploadFiles = (files:FileList)=>{
    const postFiles = Array.from(files)
    postFiles.forEach(file=>{
      if(!breforeUpload){
        post(file)
      }else{
        const result = breforeUpload(file)
        if(result && result instanceof Promise){
          result.then(data=>{
            post(data)
          })
        }else{
          if(result){
            post(file)
          }
        }
      }
    })
  }
  const post = (files:File) => {
    let _file:UploadFile = {
      uid: Date.now() + 'upload_file',
      name: files.name,
      size: files.size,
      status: 'ready',
      percent: 0
    }
    setFileList(fileList=>{
      return [_file,...fileList]
    })
    const formData = new FormData()
    formData.append(name || 'files',files)
    if(data){
      Object.keys(data).forEach(key=>{
        formData.append(key,data[key])
      })
    }
    axios.post(action,formData,{
      headers: {
        ...header,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e)=>{
        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
        updateFileList(_file,{
          status: "uploading",
          percent: percentage
        })
        if(percentage<100){
          if(onProgress){
            onProgress(percentage,files)
          }
        }
      }
    }).then(data=>{
      updateFileList(_file,{
        status:"success",
        response: data
      })
      if(onSuccess){
        onSuccess(data,files)
      }
      if(onChange){
        onChange(files)
      }
    }).catch(err=>{
      updateFileList(_file,{
        status: "error",
        error: err
      })
      if(onError){
        onError(err,files)
      }
      if(onChange){
        onChange(files)
      }
    })
  }
  return (
    <div className="viking-upload-component">
      <div className="viking-upload-input" style={{display:'inline-block'}} onClick={handleClick}>
        <input className="viking-file-input" style={{display: 'none'}} ref={componentRef} type="file" accept={accept} onChange={handleChange} multiple={multiple} />
        {
          drag ? <Drag onFile={(_file)=>{uploadFiles(_file)}}>{children}</Drag>
          : children
        }
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  )
}

export default Upload;