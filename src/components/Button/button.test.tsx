import React from "react";
import { render,screen,fireEvent } from "@testing-library/react";
import Button,{ ButtonProps } from "./button";
const onChange = jest.fn();
const defaultButton = {
  onClick:onChange
}
const dangerButton: ButtonProps = {
  size: 'lg',
  btnType: 'danger',
  className: 'bba'
}
const linkButton: ButtonProps = {
  btnType: 'link',
  href: 'www.url.com',
  disabled: true
}
const disabledButton: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}
/* test('first test button',()=>{
  render(<Button>Nice</Button>)
  //console.log(screen.debug())
 // console.log(screen.getByText('Nice'))
  expect(screen.getByText('Nice')).toBeInTheDocument()
}) */
describe('Test Button Component',()=>{
  it('should render the correct default button',()=>{
    let wrapper = render(<Button {...defaultButton}>default</Button>)
    let element = wrapper.getByText('default') as HTMLButtonElement
    expect(element).toHaveClass('btn btn-default')
    expect(element.tagName).toEqual('BUTTON')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultButton.onClick).toHaveBeenCalled()
  })
  it('should render the correct component based on different props',()=>{
    let wrapper = render(<Button {...dangerButton}>danger</Button>)
    let element = wrapper.getByText('danger')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-danger bba btn-lg')
  })
  it('should render a link when btnType equals link and href is provided',()=>{
    let wrapper = render(<Button {...linkButton}>link</Button>)
    let element = wrapper.getByText('link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set to true',()=>{
    let wrapper = render(<Button {...disabledButton}>disable</Button>)
    let element = wrapper.getByText('disable')
    expect(element).toBeInTheDocument()
    fireEvent.click(element)
    expect(disabledButton.onClick).not.toHaveBeenCalled()
    expect(disabledButton.onClick).toHaveBeenCalledTimes(0)
  })
})