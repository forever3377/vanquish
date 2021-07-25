import React,{useState,useRef} from 'react';
import Button from './components/Button/button';
import Transition from './components/Transition/transition';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
function App() {
  const [show, setShow] = useState(true);
  return (
    <div className="App">
      <header className="App-header">
        <Menu>
          <MenuItem disabled>link1</MenuItem>
          <MenuItem>link2</MenuItem>
          <MenuItem>link3</MenuItem>
          <SubMenu title="subMenu">
            <MenuItem>link4-0</MenuItem>
            <MenuItem>link4-1</MenuItem>
          </SubMenu>
        </Menu>
        <Transition in={show} timeout={5000} animation="zoom-in-left">
          <div>
          <p>first<code>1</code>example</p>
          <p>first<code>2</code>example</p>
          </div>
        </Transition>
        <Transition in={show} timeout={5000} animation="zoom-in-left" wrapper>
          <Button btnType='primary'>show</Button>
        </Transition> 
        
        <div>
          <Button btnType='primary' onClick={()=>{setShow(!show)}}>toggle</Button>
        </div>
        {/* <Button onClick={()=>{alert('1')}}>Default</Button> */}
       {/*  <Button size={ButtonSize.Lg}>lg</Button> */}
        {/* <Button btnType={ButtonType.Primary} size={ButtonSize.Lg}>Primary</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Sm}>Danger</Button>
        <Button btnType={ButtonType.Link} href="www.baidu.com" target="_blank">link</Button>
        <Button disabled>disabled</Button>
        <Button disabled btnType={ButtonType.Link} href="www.baidu.com">disabled link</Button> */}
      </header>
    </div>
  );
}

export default App;
