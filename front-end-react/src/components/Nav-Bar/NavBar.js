import './NavBar.css'
import LowerNav from './LowerNav/LowerNav' 
import UpperNav from './UpperNav/UpperNav'

const NavBar = ()=>{

    return (
      <nav id="navbar">
        <UpperNav />
        <LowerNav/>
      </nav>
    );

}

export default NavBar