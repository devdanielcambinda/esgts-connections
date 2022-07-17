import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  // tipos: aluno, professor, externo
  const [tipoDeConta, setTipoDeConta] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [avatar, setAvatar] = useState();

  const[errorMessage,setErrorMessage] = useState("");


  const navigate = useNavigate();

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

  const avatarChangeHandler = (event) => {
    setAvatar(event.target.files[0]);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const fd = new FormData();
    fd.append("nome", nome);
    fd.append("email", email);
    fd.append("telefone", telefone);
    fd.append("password", password);
    fd.append("tipoDeConta", tipoDeConta);
    fd.append("linkedinLink", linkedinLink);
    fd.append("avatar", avatar);

    const result = await fetch("/api/utilizador", {
      method: "POST",
      body: fd
      // headers: { "Content-Type": "application/json" },
    });


    if(!(result.status === 200)) {
      return setErrorMessage("Erro ao registar utilizador");
    }

    setNome("");
    setEmail("");
    setTelefone("");
    setPassword("");
    setTipoDeConta("");
    setLinkedinLink("");
    setAvatar();
    navigate("/login",{state:{id:1,message:"Registo efectuado com sucesso"}});
    
  }

  return (
    <div className="container" style={{ maxWidth: 500 }}>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <form onSubmit={submitHandler} className="text-center" encType="multipart/form-data">
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
          <label htmlFor="avatar" className="form-label control-label">
            Avatar:
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            className="form-control"
            onChange={avatarChangeHandler}
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
