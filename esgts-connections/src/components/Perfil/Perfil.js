import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import NovaOportunidade from './NovaOportunidade/NovaOportunidade';
import styles from "./Perfil.module.css";
import Cookies from "js-cookie";

const Perfil = () => {

  const navigate = useNavigate();

  const sessionCookie = Cookies.get("sessionCookie");
  const [isLogged] = useState(sessionCookie !== undefined ? true : false);

  if(!isLogged){
    navigate("/login",{state:{id:2,message:"Não tem sessão iniciada"},replace:true});
  }

  const [user, setUser] = useState();
  const [oportunidades, setOportunidades] = useState([]);
  const [criarOportunidade, setCriarOportunidade] = useState(false);
  useEffect( () => {

    const getUser =  async ()=>{
      const userResult = await fetch("/api/utilizador/me", {
        method: "GET",
        credentials: "same-origin",
      });

      if(userResult.status !== 200){
        return
      }

      const user = await userResult.json()
      setUser(user)

    }

    const getOportunidades = async () => {
      const oportunidadesResult = await fetch("/api/contacto/oportunidades", {
        method: "GET",
        credentials: "include",
      });

      if(oportunidadesResult.status !== 200){
        return setOportunidades([])
      }

      const oportunidades = await oportunidadesResult.json()
      setOportunidades(oportunidades)
    }


    getUser()
    getOportunidades()
  }, []);

  const criarOportunidadeHandler = () => {
    setCriarOportunidade(true)
  }

  const cancelarNovaOportunidadeHandler = () => {

      return setCriarOportunidade(false);

  };

  const adicionarOportunidadeHandler = async () => {
    setCriarOportunidade(false);
    window.location.reload();
  };

  const apagarOportunidadeHandler = async (event,oportunidadeId) => {
    event.preventDefault();

    const oportunidadeResult = await fetch(`/api/contacto/oportunidade/${oportunidadeId}`, {
      method: "DELETE",
      credentials: "include",
    })

    if(oportunidadeResult.status !== 200){
     return  alert("Erro ao apagar oportunidade")
    }

    window.location.reload();

  }

  const deleteAccountHandler = async () =>{

      if(window.confirm("Tem a certeza que deseja apagar a sua conta?")){
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
      
  }

  return !user ? (
    ""
  ) : (
    <>
      <div className="container mt-5 mb-4">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
            <div className={styles.card + " p-3 py-4 mb-4"}>
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

                {user.linkLinkedin !== null? <ul className={styles.socialList}>
                  <li>
                    <a
                      href={user.linkLinkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul> : ""}

                <div className="buttons">
                  {user.tipoDePerfil === "Externo"? <button
                    className="btn btn-dark px-4 ms-3"
                    onClick={criarOportunidadeHandler}
                  >
                    Criar nova oportunidade
                  </button> : ""}
                  <button
                    className="btn btn-danger px-4 ms-3"
                    onClick={deleteAccountHandler}
                  >
                    Apagar conta
                  </button>
                </div>
              </div>
            </div>
            {criarOportunidade ? (
              <NovaOportunidade
                onCancelarOportunidade={cancelarNovaOportunidadeHandler}
                onAdicionarOportunidade={adicionarOportunidadeHandler}
              />
            ) : (
              ""
            )}
            {oportunidades.map((oportunidade,key) => {
              return (
                <div  key={oportunidade.id} className="card mb-4 box-shadow">
                  <div className="card-body">
                    <h5 className="card-title">{oportunidade.titulo}</h5>
                    <p className="card-text">
                      {oportunidade.descricao}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={event => apagarOportunidadeHandler(event,oportunidade.id)}
                        >
                          Apagar
                        </button>
                      </div>
                      <small className="text-muted">{oportunidade.tipo_de_oportunidade}</small>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
