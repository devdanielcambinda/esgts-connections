import "./LowerNav.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

const LowerNav = (props) => {
  const [isLogged, setLogged] = useState(props.isLogged); //boolean

  const myFunction = () => {
    let x = document.getElementById("lowernav");
    if (x.className === "lowernav") {
      x.className += " responsive";
    } else {
      x.className = "lowernav";
    }
  };

  const logoutHandler = async () => {
    await fetch("/api/utilizador/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  };

  // padding top e bottom 20 px 12px left e right -- font size 14px font-weight 800 ---
  const menuLogged = (
    <nav className="lowernav" id="lowernav">
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
          <Link to="/trabalhos">Trabalhos</Link>
        </li>
        <li>
          <Link to="/perfil">Perfil</Link>
        </li>
        <li>
          <a id="logout" href="#!" onClick={logoutHandler}>
            {" "}
            <span>Logout</span>
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
    </nav>
  );

  if (isLogged) {
    return menuLogged;
  }

  return (
    <nav className="lowernav" id="lowernav">
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
          <Link to="/trabalhos">Trabalhos</Link>
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
        <li>
          <a href="#!" className="icon" onClick={myFunction}>
            <span>
              <i className="fa-solid fa-bars fa-2x"></i>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default LowerNav;
