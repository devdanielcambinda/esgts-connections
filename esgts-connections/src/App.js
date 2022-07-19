import { useState } from "react";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import { BrowserRouter as Router, Routes, Route ,useLocation} from "react-router-dom";
import NavBar from "./components/Nav-Bar/NavBar";
import Home from "./components/HomePage/Home";
import Login from "./components/Login/Login";
import Registar from "./components/Registar/Registar";
import Footer from "./components/Footer/Footer";
import Estagios from "./components/Estagios/Estagios";
import Workshops from "./components/Workshops/Workshops";
import Perfil from "./components/Perfil/Perfil";
import NoPageFound from "./components/NoPageFound/NoPageFound";
import Trabalhos from "./components/Trabalhos/Trabalhos";
import Cookies from "js-cookie";
import "./App.css";

function App() {

  const cookieConsetExists = Cookies.get("CookieConsent") !== undefined;
  console.log(cookieConsetExists);
  const cookieConsentValueIsTrue = getCookieConsentValue() === 'true';
  const [isAccepted, setIsAccepted] = useState( cookieConsetExists && cookieConsentValueIsTrue ? true : false);
  
  return (
    <Router>
      <div className='main-content'>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registar" element={<Registar />} />
          <Route path="/estagios" element={<Estagios />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/trabalhos" element={<Trabalhos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </div>
      {!isAccepted? <CookieConsent
        debug={true}
        style={{ background: "#000", textAlign: "left" }}
        buttonStyle={{ background: "#aa2424", color: "white" }}
        onAccept={() => setIsAccepted(true)}
        >
        This website uses cookies.
      </CookieConsent> : ""}
      <Footer />
    </Router>
  );
}

export default App;
