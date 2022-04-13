import { useState } from "react"
import {Link} from 'react-router-dom'

const LowerNav = (props) => {

    let isUserLogged = props.isLogged //boolean

    // padding top e bottom 20 px 12px left e right -- font size 14px font-weight 800 ---
    const menuLogged = (
      <div className="lowernav">
          
      </div>
    );

    if(isUserLogged){
        return menuLogged
    }
        
    return (
    <div className="lowernav">
        
    </div>)
    
}

export default LowerNav