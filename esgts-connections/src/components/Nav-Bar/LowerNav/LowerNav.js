import './LowerNav.css'
import {Link} from 'react-router-dom'

const LowerNav = (props) => {

    let isUserLogged = props.isLogged //boolean

    // padding top e bottom 20 px 12px left e right -- font size 14px font-weight 800 ---
    const menuLogged = (
      <nav className="lowernav" >
        <ul>
          <li>
            <Link to="/">
              <img
                src="https://siesgt.ipsantarem.pt/esgt/imagens/LogotipoSITEdtmod20220310140019"
                alt=""
              ></img>
            </Link>
          </li>
          <li>
            <Link to="/estagios">Estágios</Link>
          </li>
          <li>
            <Link to="/workshops">Workshops</Link>
          </li>
          <li>
            <Link to="/perfil">Perfil</Link>
          </li>
        </ul>
      </nav>
    );

    if(isUserLogged){
        return menuLogged
    }
        
    return (
      <nav className="lowernav">
        <ul>
          <li>
            <Link to="/">
              <img
                src="https://siesgt.ipsantarem.pt/esgt/imagens/LogotipoSITEdtmod20220310140019"
                alt=""
              ></img>
            </Link>
          </li>
          <li>
            <Link to="/estagios">
            <span>Estágios</span>
            </Link>
          </li>
          <li>
            <Link to="/workshops">
            <span>Workshops</span>
            </Link>
          </li>
          <li>
            <Link to="/registar">
              <span>Registar</span>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <span>Login</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
    
}

export default LowerNav