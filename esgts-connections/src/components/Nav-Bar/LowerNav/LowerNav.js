import { useState } from "react"

const LowerNav = (props) => {

    let isUserLogged = props.isLogged //boolean
    return <p> {isUserLogged.toString()}</p>
    


}

export default LowerNav