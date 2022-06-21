import styles from "./Perfil.module.css";
const Perfil = () => {
  return (
    <div className="container mt-5 mb-4">
      <div className="row d-flex justify-content-center">
        <div className="col-md-7">
          <div className={styles.card + " p-3 py-4"}>
            <div className="text-center">
              <img
                src="https://picsum.photos/200"
                width="100"
                className="rounded-circle"
                alt=""
              />
            </div>

            <div className="text-center mt-3">
              <h5 className="mt-2 mb-0">Daniel Cambinda</h5>
              <span>Web developer</span>

              <div className="px-4 mt-1">
                <p className={styles.fonts}>
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat.{" "}
                </p>
              </div>

              <ul className={styles.socialList}>
                <li>
                  <a href="/">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-dribbble"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-google"></i>
                  </a>
                </li>
              </ul>

              <div className="buttons">
                <button className="btn btn-outline-danger px-4">Editar Perfil</button>
                <button className="btn btn-danger px-4 ms-3">Apagar conta</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
