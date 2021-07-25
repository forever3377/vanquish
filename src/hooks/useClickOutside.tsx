import {useEffect,RefObject} from 'react';

function useClickOutside(ref:RefObject<HTMLElement>,callback:Function){
  useEffect(()=>{
    const lister = (e:MouseEvent)=>{
      if(!ref.current || ref.current.contains(e.target as HTMLElement)){
        return
      }
      callback()
    }
    document.addEventListener('click',lister)
    return ()=>{
      document.removeEventListener('click',lister)
    }
  },[ref, callback])
}

export default useClickOutside