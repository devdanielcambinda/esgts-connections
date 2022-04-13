import {useState} from 'react'
import LowerNav from './LowerNav/LowerNav' 
import UpperNav from './UpperNav/UpperNav'

const NavBar = (props)=>{

    const [isLogged, setLogged] = useState(props.isLogged)

    return (
    <div>
        <UpperNav/>
        <LowerNav  isLogged={isLogged} />
    </div>)

}

export default NavBar