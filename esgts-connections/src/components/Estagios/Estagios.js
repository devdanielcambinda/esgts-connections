import './Estagios.css'
import React, { useState, useEffect } from "react";

const Estagios = () => {

  const [estagios, setEstagios] = useState([]);

  useEffect(() => {
    const getEstagios = async () => {
      const estagiosResult = await fetch("/api/oportunidades/estagios", {
        method: "GET",
      });

      if (estagiosResult.status !== 200) {
        return;
      }

      const estagios = await estagiosResult.json();
      setEstagios(estagios);
    }

    getEstagios();
  }, []);
  
  return (
    <div className="text-center">

      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Estágios</h1>
          <p className="lead text-muted">
            Aqui pode encontrar todas as ofertas de estágios disponibilizadas pelas entidades registas.
          </p>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {estagios.map((estagio) => {
              return (
                <div key={estagio.id} className="col-md-4">
                  <div className="card mb-4 shadow-sm">
                    <img
                      className="card-img-top"
                      alt="ESGTS"
                      style={{ height: 200, width: "100%", display: "block" }}
                      src="/ipsesgtslogo.png"
                    />
                    <div className="card-body">
                      <h3 className="card-title">{estagio.titulo}</h3>
                      <p className="card-text">{estagio.descricao}</p>
                      <p className="card-texxt">
                        {" "}
                        Data de Inicio: {estagio.data_de_inicio}
                      </p>
                      <p className="card-texxt">
                        {" "}
                        Data de Fim: {estagio.data_de_fim}
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
                          {estagio.tipo_de_oportunidade}
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
};

export default Estagios;
