const Home = () => {
  return (
    <div className="text-center">
      <div
        id="carouselExampleCaptions"
        className="carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={"/ESGTS-1.jpg"}
              className="d-block w-100"
              style={{ maxHeight: 640 }}
              alt=""
            />
          </div>
          <div className="carousel-item">
            <img
              src="/ipsesgtslogo.png"
              className="d-block w-100"
              style={{ maxHeight: 640 }}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: 30 }}>
        <div className="row">
          <div className="col-md-4">
            <h2>Estágio</h2>
            <p>
              Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
              tellus ac cursus commodo, tortor mauris condimentum nibh, ut
              fermentum massa justo sit amet risus. Etiam porta sem malesuada
              magna mollis euismod. Donec sed odio dui.{" "}
            </p>
            <p>
              <a className="btn btn-danger" href="/estagios" role="button">
                Ver estágios »
              </a>
            </p>
          </div>
          <div className="col-md-4">
            <h2>Workshops</h2>
            <p>
              Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
              tellus ac cursus commodo, tortor mauris condimentum nibh, ut
              fermentum massa justo sit amet risus. Etiam porta sem malesuada
              magna mollis euismod. Donec sed odio dui.{" "}
            </p>
            <p>
              <a className="btn btn-danger" href="/workshops" role="button">
                Ver workshops »
              </a>
            </p>
          </div>
          <div className="col-md-4">
            <h2>Ofertas de trabalho</h2>
            <p>
              Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
              egestas eget quam. Vestibulum id ligula porta felis euismod
              semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris
              condimentum nibh, ut fermentum massa justo sit amet risus.
            </p>
            <p>
              <a className="btn btn-danger" href="/trabalhos" role="button">
                Ver trabalhos »
              </a>
            </p>
          </div>
        </div>

        <hr />
      </div>
    </div>
  );
};

export default Home;
