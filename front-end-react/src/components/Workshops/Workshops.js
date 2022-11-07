import "./Workshops.css";
import React, { useState, useEffect } from "react";

const Workshops = () => {

  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const getWorkshops = async () => {
      const workshopsResult = await fetch("/api/oportunidades/workshops", {
        method: "GET",
      });

      if (workshopsResult.status !== 200) {
        return;
      }

      const workshops = await workshopsResult.json();
      setWorkshops(workshops);
    }

    getWorkshops();
  }, []);

  return (
    <div className="text-center">
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Workshops</h1>
          <p className="lead text-muted">
            Aqui pode encontrar todas as ofertas de workshops disponibilizadas
            pelas entidades registas.
          </p>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {workshops.map((workshop) => {
              return (
                <div key={workshop.id} className="col-md-4">
                  <div className="card mb-4 shadow-sm">
                    <img
                      className="card-img-top"
                      alt="ESGTS"
                      style={{ height: 200, width: "100%", display: "block", objectFit: "cover" }}
                      src={`/api/entidade/avatar/${workshop.Entidade.id}`}
                    />
                    <div className="card-body">
                      <h3 className="card-title">{workshop.titulo}</h3>
                      <p className="card-text">{workshop.descricao}</p>
                      <p>Oferecido por: {workshop.Entidade.nome}</p>
                      <p className="card-text">
                        Localidade: {workshop.Entidade.localidade}
                      </p>
                      <p className="card-text">
                        Data de Inicio: {workshop.data_de_inicio}
                      </p>
                      <p className="card-text">
                        Data de Fim: {workshop.data_de_fim}
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
                          {workshop.tipo_de_oportunidade}
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

export default Workshops;
