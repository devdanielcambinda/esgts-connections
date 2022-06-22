const Footer = () =>{
    return (
      // <footer className="text-center">
      //   <p> footer content goes here</p>
      // </footer>
      <footer className="mt-auto text-center text-lg-start bg-light text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a
              href="https://www.facebook.com/ESGT.Santarem"
              className="me-4 text-reset"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/escola-superior-de-gestao-e-tecnologia-de-santarem/"
              className="me-4 text-reset"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://twitter.com/ESGT_Santarem"
              className="me-4 text-reset"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com/esgt.santarem/"
              className="me-4 text-reset"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-school"></i> Escola Superior de Gestão e
                  Tecnologia
                </h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Oportunidades:</h6>
                <p>
                  <a href="/estagios" className="text-reset">
                    Estágios
                  </a>
                </p>
                <p>
                  <a href="/workshops" className="text-reset">
                    Workshops
                  </a>
                </p>
                <p>
                  <a href="/trabalhos" className="text-reset">
                    Ofertas de trabalho
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contactos</h6>
                <p>
                  <i className="fas fa-home me-3"></i>
                  Complexo Andaluz, Apartado 295
                </p>
                <p>
                  <i className="fas fa-location-pin me-3"></i>
                  2001-904 Santarém
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  correio@esg.ipsantarem.pt
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i> +351 243 303 200
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2022 Copyright
          {/* <a className="text-reset fw-bold" href="/"></a> */}
        </div>
      </footer>
    );
}

export default Footer