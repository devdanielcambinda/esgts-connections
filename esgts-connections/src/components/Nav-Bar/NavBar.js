import {useState} from 'react'
import './NavBar.css'
import LowerNav from './LowerNav/LowerNav' 
import UpperNav from './UpperNav/UpperNav'

const NavBar = (props)=>{

    const [isLogged, setLogged] = useState(props.isLogged)

    return (
      <div className="sticky">
        <UpperNav />
        <LowerNav isLogged={isLogged} />
      </div>
    );

}

export default NavBar