import { render,fireEvent,cleanup,RenderResult,waitFor} from "@testing-library/react";
import Menu,{ menuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps:menuProps = {
  defaultIndex: '0',
  onSelect:jest.fn(),
  className: 'test'
}
const testVerProps:menuProps = {
  defaultIndex: '0',
  mode: 'vertical',
}
const generateMenu = (props: menuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
      <SubMenu title="drop">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  )
}
const createStyleFile = ()=>{
  const cssFile = `
  .viking-submenu {
    display: none;
  }
  .viking-submenu.menu-opened {
    display:block;
  }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}
let wrapper:RenderResult,menuElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement
describe("test Menu and MenuItem component in default(horizontal) mode",()=>{
  beforeEach(()=>{
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props',()=>{
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('test viking-menu')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('is-active')
    expect(disabledElement).toHaveClass('is-disabled')
  })
  it('click items should change active and call the right callback',()=>{
    fireEvent.click(activeElement)
    expect(testProps.onSelect).toHaveBeenCalled()
    expect(testProps.onSelect).toHaveBeenCalledWith('0')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('0')
  })
  it('test Menu and MenuItem component in vertical mode',()=>{
    cleanup()
    wrapper = render(generateMenu(testVerProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
    const drop = wrapper.getByText('drop')
    //expect(wrapper.queryByText('drop1')).not.toBeVisible()
    fireEvent.click(drop)
    expect(wrapper.queryByText('drop1')).toBeVisible()
    fireEvent.click(drop)
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
   /*  fireEvent.click(drop)
    expect(wrapper.queryByText('drop1')).toBeVisible()
    fireEvent.click(drop)
    expect(wrapper.queryByText('drop1')).toBeVisible() */
  })
  it('should show dropdown items when hover on subMenu',async ()=>{
    const drop = wrapper.getByText('drop')
    //expect(wrapper.queryByText('drop1')).not.toBeVisible()
    fireEvent.mouseEnter(drop)
    await waitFor(()=>expect(wrapper.queryByText('drop1')).toBeVisible())
    fireEvent.mouseLeave(drop)
    await waitFor(()=>expect(wrapper.queryByText('drop1')).not.toBeVisible())
  })
})