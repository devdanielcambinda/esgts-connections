import './UpperNav.css'
const UpperNav = () =>{
    return (
      <div className="uppernav">
        <ul>
          <li>
            <a
              href="https://www.ipsantarem.pt/apresentacao-e-estatutos/"
              rel="noreferrer"
              target="_blank"
            >
              <span>O POLITÉCNICO DE SANTARÉM</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.ipsantarem.pt/noticias/"
              rel="noreferrer"
              target="_blank"
            >
              <span>NOTÍCIAS</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.ipsantarem.pt/contactos/"
              rel="noreferrer"
              target="_blank"
            >
              <span>CONTACTOS</span>
            </a>
          </li>
        </ul>
      </div>
    );
}

export default UpperNav