import React,{useState,DragEvent} from "react";
import classNames from "classnames";
export interface dragProps{
  onFile:(_file:FileList)=>void
}

export const Drag:React.FC<dragProps> = (props)=>{
  const {onFile,children} = props
  const [dragover,setDragover] = useState(false)
  const classes = classNames("viking-uploader-dragger",{
    'is-dragover': dragover
  })
  const handleDragOver=(e:DragEvent<HTMLElement>,over: boolean)=>{
    e.preventDefault()
    setDragover(over)
  }
  const handleDrop=(e:DragEvent<HTMLElement>)=>{
    e.preventDefault()
    setDragover(false)
    onFile(e.dataTransfer.files)
  }
  return(
    <div 
      className={classes} 
      onDragOver={e=>handleDragOver(e,true)}
      onDragLeave={e=>handleDragOver(e,false)}
      onDrop={handleDrop}
    >{children}</div>
  )
}

export default Drag