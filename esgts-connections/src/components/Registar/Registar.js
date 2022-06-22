import { useState } from "react";
// import { useNavigate } from "react-router-dom";
const Registar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  // tipos: aluno, professor, externo
  const [tipoDeConta, setTipoDeConta] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");

  // const navigate = useNavigate();

  const nomeChangeHandler = (event) => {
    setNome(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const telefoneChangeHandler = (event) => {
    setTelefone(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const tipoDeContaChangeHandler = (event) => {
    setTipoDeConta(event.target.value);
  };

  const linkedinLinkChangeHandler = (event) => {
    setLinkedinLink(event.target.value);
  };

  function submitHandler(event) {
    event.preventDefault();

    const registerInformation = {
      nome,
      email,
      telefone,
      password,
      tipoDeConta,
      linkedinLink,
    };

    console.log(registerInformation);

    setNome("");
    setEmail("");
    setTelefone("");
    setPassword("");
    setTipoDeConta("");
    setLinkedinLink("");

    // navigate("/login")
  }

  return (
    <div className="container" style={{ maxWidth: 500 }}>
      <form onSubmit={submitHandler} className="text-center">
        <h1 className="mb-5">Registar</h1>
        <div className="form-group required mb-4">
          <label htmlFor="nome" className="form-label control-label">
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            className="form-control"
            value={nome}
            onChange={nomeChangeHandler}
            required
          />
        </div>
        <div className="form-group required mb-4">
          <label htmlFor="email" className="form-label control-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={emailChangeHandler}
            required
          />
        </div>
        <div className="form-group required mb-4">
          <label htmlFor="telefone" className="form-label control-label">
            Telemóvel:
          </label>
          <input
            type="text"
            id="telefone"
            className="form-control"
            value={telefone}
            onChange={telefoneChangeHandler}
            required
          />
        </div>
        <div className="form-group required mb-4">
          <label htmlFor="password" className="form-label control-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={passwordChangeHandler}
            required
          />
        </div>
        <div className="form-group required mb-4">
          <label htmlFor="tipoDeConta" className="form-label control-label">
            Tipo de Conta:
          </label>
          <select
            className="form-select"
            id="tipoDeConta"
            onChange={tipoDeContaChangeHandler}
            required
          >
            <option value="" selected>
              Escolher tipo de conta...
            </option>
            <option value="Aluno">Aluno</option>
            <option value="Professor">Professor</option>
            <option value="Externo">Externo</option>
          </select>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="linkedin" className="form-label">
            LinkedIn:
          </label>
          <input
            type="url"
            id="linkedin"
            className="form-control"
            value={linkedinLink}
            onChange={linkedinLinkChangeHandler}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-dark mb-4">
            Registar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registar;
