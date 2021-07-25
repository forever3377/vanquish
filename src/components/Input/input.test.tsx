import { render,fireEvent } from "@testing-library/react";
import Input,{InputProps} from './input';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const sizeInput: InputProps = {
  size: 'lg',
  placeholder: 'sizeInput',
  onChange: jest.fn()
}

describe('Test Input Component',()=>{
  it('should render the correct sizeInput',()=>{
    let wrapper = render(<Input {...sizeInput}></Input>)
    let element = wrapper.getByPlaceholderText('sizeInput') as HTMLInputElement
    expect(wrapper.getByTestId('test-input')).toHaveClass('input-size-lg')
    fireEvent.change(element,{
      target: {value: '123'}
    })
    expect(sizeInput.onChange).toHaveBeenCalled()
    expect(sizeInput.onChange).toBeCalledTimes(1)
    expect(element.value).toEqual('123')
  })
  it('should render the correct icon',()=>{
    let wrapper = render(<Input icon="search" placeholder="icon"></Input>)
    expect(wrapper.container.querySelectorAll('.icon-wrapper')).toHaveLength(1)
  })
  it('should render the correct disabled',()=>{
    let wrapper = render(<Input disabled placeholder="disabled"></Input>)
    let element = wrapper.getByPlaceholderText('disabled')
    expect(element).toBeTruthy()
  })
  it('should render the correct prepand and append',()=>{
    let wrapper = render(<Input append=".com" prepend="https://" placeholder="prepand"></Input>)
    let element = wrapper.container.querySelector('.viking-input-wrapper')
    expect(element).toHaveClass('viking-input-wrapper input-group input-group-append input-group-prepend')
    expect(wrapper.queryByText('.com')).toBeInTheDocument()
    expect(wrapper.queryByText('https://')).toBeInTheDocument()
  })
})