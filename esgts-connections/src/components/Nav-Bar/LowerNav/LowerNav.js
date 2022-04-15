import './LowerNav.css'

const LowerNav = (props) => {

    let isUserLogged = props.isLogged //boolean

    // padding top e bottom 20 px 12px left e right -- font size 14px font-weight 800 ---
    const menuLogged = (
      <nav className="lowernav">
        <ul>
          <li>
            <a href="/">
              <img
                src="https://siesgt.ipsantarem.pt/esgt/imagens/LogotipoSITEdtmod20220310140019"
                alt=""
              ></img>
            </a>
          </li>
          <li>
            <a href="/estagios">Estágios</a>
          </li>
          <li>
            <a href="/workshops">Workshops</a>
          </li>
          <li>
            <a href="/perfil">Perfil</a>
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
            <a href="/">
              <img
                src="https://siesgt.ipsantarem.pt/esgt/imagens/LogotipoSITEdtmod20220310140019"
                alt=""
              ></img>
            </a>
          </li>
          <li>
            <a href="/estagios">
            <span>Estágios</span>
            </a>
          </li>
          <li>
            <a href="/workshops">
            <span>Workshops</span>
            </a>
          </li>
          <li>
            <a href="/perfil">
              <span>Registar</span>
            </a>
          </li>
          <li>
            <a href="/login">
              <span>Login</span>
            </a>
          </li>
        </ul>
      </nav>
    );
    
}

export default LowerNav