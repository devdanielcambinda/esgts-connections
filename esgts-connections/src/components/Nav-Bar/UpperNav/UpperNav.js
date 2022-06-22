import './UpperNav.css'
const UpperNav = () =>{

    const myFunction = () =>{
      let x = document.getElementById("uppernav");
      if (x.className === "uppernav") {
        x.className += " responsive";
      } else {
        x.className = "uppernav";
      }
    }

    return (
      <div className="uppernav" id="uppernav">
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
          <li>
            <a href="#!" className="icon" onClick={myFunction}>
              <span>
                <i className="fa-solid fa-bars fa-2x"></i>
              </span>
            </a>
          </li>
        </ul>
      </div>
    );
}

export default UpperNav