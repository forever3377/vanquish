import React from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'
interface TransitionBaseProps{
  animation?: AnimationName
  wrapper?: boolean
}

type TransitionProps = CSSTransitionProps & TransitionBaseProps

const Transition:React.FC<TransitionProps> = (props)=>{
  const {
    children,
    classNames,
    animation,
    wrapper,
    ...resetProps
  } = props
  return(
    <CSSTransition classNames={classNames? classNames : animation} {...resetProps}>
      {wrapper?(
        <div>
          {children}
        </div>
      ):children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
}

export default Transition