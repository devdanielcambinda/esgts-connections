import './Trabalhos.css'
import React, { useState, useEffect } from "react";

const Trabalhos = () => {

  const [trabalhos, setTrabalhos] = useState([]);

  useEffect(() => {
    const getTrabalhos = async () => {
      const trabalhosResult = await fetch("/api/oportunidades/trabalhos", {
        method: "GET",
      });

      if (trabalhosResult.status !== 200) {
        return;
      }

      const trabalhos = await trabalhosResult.json();
      setTrabalhos(trabalhos);
    }

    getTrabalhos();
  }, []);

    return (
      <div className="text-center">
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Ofertas de trabalho</h1>
            <p className="lead text-muted">
              Aqui pode encontrar todas as ofertas de trabalho disponibilizadas
              pelas entidades registas.
            </p>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {trabalhos.map((trabalho) => {
                return (
                  <div key={trabalho.id} className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                      <img
                        className="card-img-top"
                        alt="ESGTS"
                        style={{ height: 200, width: "100%", display: "block" }}
                        src="/ipsesgtslogo.png"
                      />
                      <div className="card-body">
                        <h3 className="card-title">{trabalho.titulo}</h3>
                        <p className="card-text">{trabalho.descricao}</p>
                        <p className="card-text">
                          Data de Inicio: {trabalho.data_de_inicio}
                        </p>
                        <p className="card-text">
                          Data de Fim: {trabalho.data_de_fim}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            {/* <button
                            type="button"
                            className="btn btn-sm btn-danger"
                          >
                            Ver mais
                          </button> */}
                          </div>
                          <small className="text-muted">
                            {trabalho.tipo_de_oportunidade}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );

}

export default Trabalhos;
