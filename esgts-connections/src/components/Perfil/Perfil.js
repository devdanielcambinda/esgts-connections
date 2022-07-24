import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./Perfil.module.css";

const Perfil = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState();
  useEffect( () => {

    ( async ()=>{
      const userResult = await fetch("/api/utilizador/me", {
        method: "GET",
        credentials: "include",
      });

      const user = await userResult.json()
      setUser(user)
    })()

    

  }, []);

  const deleteAccountHandler = async () =>{
    const deleteResult = await fetch("/api/utilizador/me", {
      method: "DELETE",
      credentials: "include",
    });

    if(deleteResult.status !== 200){
      return alert("Erro ao eliminar conta")
    }

    navigate('/')
    document.location.reload()
    alert("Conta eliminada com sucesso.")
  }

  return !user ? null : (
    <div className="container mt-5 mb-4">
      <div className="row d-flex justify-content-center">
        <div className="col-md-7">
          <div className={styles.card + " p-3 py-4"}>
            <div className="text-center">
              <img
                src="/api/utilizador/me/avatar"
                width="100"
                className="rounded-circle"
                alt=""
              />
            </div>

            <div className="text-center mt-3">
              <h5 className="mt-2 mb-0">{user.nome}</h5>
              <span>{user.tipoDePerfil}</span>

              <div className="px-4 mt-1">
                <p className={styles.fonts}>Email: {user.email}</p>
                <p className={styles.fonts}>Telemóvel: {user.telefone}</p>
              </div>

              <ul className={styles.socialList}>
                <li>
                  <a href={user.linkLinkedin} target="_blank" rel="noreferrer">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>

              <div className="buttons">
                <button className="btn btn-danger px-4 ms-3" onClick={deleteAccountHandler}>
                  Apagar conta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
