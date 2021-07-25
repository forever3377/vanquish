import React from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
declare type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
interface TransitionBaseProps {
    animation?: AnimationName;
    wrapper?: boolean;
}
declare type TransitionProps = CSSTransitionProps & TransitionBaseProps;
declare const Transition: React.FC<TransitionProps>;
export default Transition;
