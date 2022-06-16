const Footer = () =>{
    return (
      // <footer className="text-center">
      //   <p> footer content goes here</p>
      // </footer>
      <footer class="text-center text-lg-start bg-light text-muted">
        <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div class="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a
              href="https://www.facebook.com/ESGT.Santarem"
              class="me-4 text-reset"
              target="_blank"
              rel="noreferrer"
            >
              <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/escola-superior-de-gestao-e-tecnologia-de-santarem/"
              class="me-4 text-reset"
              target="_blank"
              rel="noreferrer"
            >
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://twitter.com/ESGT_Santarem"
              class="me-4 text-reset"
              target="_blank"
              rel="noreferrer"
            >
              <i class="fa-brands fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com/esgt.santarem/"
              class="me-4 text-reset"
              target="_blank"
              rel="noreferrer"
            >
              <i class="fa-brands fa-instagram"></i>
            </a>
          </div>
        </section>

        <section class="">
          <div class="container text-center text-md-start mt-5">
            <div class="row mt-3">
              <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">
                  <i class="fas fa-school"></i> Escola Superior de Gestão e
                  Tecnologia
                </h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>

              <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">Oportunidades:</h6>
                <p>
                  <a href="/estagios" class="text-reset">
                    Estágios
                  </a>
                </p>
                <p>
                  <a href="/workshops" class="text-reset">
                    Workshops
                  </a>
                </p>
                <p>
                  <a href="/trabalhos" class="text-reset">
                    Ofertas de trabalho
                  </a>
                </p>
              </div>

              <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 class="text-uppercase fw-bold mb-4">Contactos</h6>
                <p>
                  <i class="fas fa-home me-3"></i>
                  Complexo Andaluz, Apartado 295
                </p>
                <p>
                  <i class="fas fa-location-pin me-3"></i>
                  2001-904 Santarém
                </p>
                <p>
                  <i class="fas fa-envelope me-3"></i>
                  correio@esg.ipsantarem.pt
                </p>
                <p>
                  <i class="fas fa-phone me-3"></i> +351 243 303 200
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          class="text-center p-4"
          style={{ "background-color": "rgba(0, 0, 0, 0.05)" }}
        >
          © 2022 Copyright
          {/* <a class="text-reset fw-bold" href="/"></a> */}
        </div>
      </footer>
    );
}

export default Footer