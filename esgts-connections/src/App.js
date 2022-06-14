import './App.css';
import { useState } from "react";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/Nav-Bar/NavBar';
import Home from './components/HomePage/Home'
import Login from './components/Login/Login'
import Registar from './components/Registar/Registar'
import Footer from './components/Footer/Footer'
import Estagios from './components/Estagios/Estagios';
import Workshops from './components/Workshops/Workshops';
import Perfil from './components/Perfil/Perfil';
import NoPageFound from './components/NoPageFound/NoPageFound'

function App() {

  const [isLogged, setLogged] = useState(false)
  
  return (
    <Router>
      <div className="App">
        <NavBar isLogged={isLogged} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registar" element={<Registar />} />
          <Route path="/estagios" element={<Estagios />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/trabalhos" />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="*" element={<NoPageFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
