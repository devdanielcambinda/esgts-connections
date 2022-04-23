import styles from './LowerNav.module.css'
import Link from 'next/link'

const LowerNav = (props) => {

    let isUserLogged = props.isLogged //boolean

    // padding top e bottom 20 px 12px left e right -- font size 14px font-weight 800 ---
    const menuLogged = (
      <nav className={styles.lowernav}>
        <ul>
          <li>
            <Link href="/">
              <img
                src="https://siesgt.ipsantarem.pt/esgt/imagens/LogotipoSITEdtmod20220310140019"
                alt=""
              ></img>
            </Link>
          </li>
          <li>
            <Link href="/estagios"><a>Estágios</a></Link>
          </li>
          <li>
            <Link href="/workshops"><a>Workshops</a></Link>
          </li>
          <li>
            <Link href="/perfil"><a>Perfil</a></Link>
          </li>
        </ul>
      </nav>
    );

    if(isUserLogged){
        return menuLogged
    }
        
    return (
      <nav className={styles.lowernav}>
        <ul>
          <li>
            <Link href="/">
            <a>
              <img
                src="https://siesgt.ipsantarem.pt/esgt/imagens/LogotipoSITEdtmod20220310140019"
                alt=""
              />
            </a>
              
            </Link>
          </li>
          <li>
            <Link href="/estagios">
              <a>Estágios</a>
            </Link>
          </li>
          <li>
            <Link href="/workshops">
              <a>Workshops</a>
            </Link>
          </li>
          <li>
            <Link href="/registar">
              <a>Registar</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
        </ul>
      </nav>
    );
    
}

export default LowerNav