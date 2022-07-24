import { useEffect, useState } from "react";
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

  const [errorMessage, setErrorMessage] = useState("");

  const [externoSelected, setExternoSelected] = useState(false);
  const [cargoPrincipal, setCargoPrincipal] = useState("");

  //entidade 
      const [entidadesBD, setEntidadesBD] = useState([]); // BD return a array of objects
      const [entidade, setEntidade] = useState();
      const [adicionarEntidade, setAdicionarEntidade] = useState(false);
      const [nomeEntidade, setNomeEntidade] = useState("");
      const [moradaEntidade, setMoradaEntidade] = useState("");
      const [cod_postalEntidade, setCodPostalEntidade] = useState("");
      const [NIFEntidade, setNIFEntidade] = useState("");
      const [localidadeEntidade, setLocalidadeEntidade] = useState("");
      const [dimensaoEntidade, setDimensaoEntidade] = useState("");
      const [fotoEntidade, setFotoEntidade] = useState();
      const [areas, setAreasEntidade] = useState([]);

  useEffect( () => {

    (async ()=>{
      const entidadesResult = await fetch('/api/entidades',{
        method: 'GET', 
      })
      const entidades = await entidadesResult.json();
      setEntidadesBD(entidades);
    })()

  }, []);

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

    if (event.target.value === "Externo") {
      return setExternoSelected(true);
    }

    setExternoSelected(false);
  };

  const linkedinLinkChangeHandler = (event) => {
    setLinkedinLink(event.target.value);
  };

  const avatarChangeHandler = (event) => {

    if (event.target.files[0].size > 1000141) {
      alert("A foto deve ter no máximo 1MB");
      event.target.value = "";
      return setAvatar();
    }
    setAvatar(event.target.files[0]);
  };

  const cargoPrincipalChangeHandler = (event) => {
    setCargoPrincipal(event.target.value);
  };

  const entidadeChangeHandler = (event) => {
    if (event.target.value === "criarEntidade") {
      setEntidade(undefined);
      return setAdicionarEntidade(true);
    }

    if (event.target.value === "") {
      setAdicionarEntidade(false);
      return setEntidade(undefined);
    }

    setEntidade(event.target.value);
    setAdicionarEntidade(false);
  };

  const nomeEntidadeChangeHandler = async (event) => {
    setNomeEntidade(event.target.value);
  };

  const moradaEntidadeChangeHandler = (event) => {
    setMoradaEntidade(event.target.value);
  };

  const codPostalEntidadeChangeHandler = (event) => {
    setCodPostalEntidade(event.target.value);
  };

  const NIFEntidadeChangeHandler = (event) => {
    setNIFEntidade(event.target.value);
  };

  const localidadeEntidadeChangeHandler = (event) => {
    setLocalidadeEntidade(event.target.value);
  };

  const dimensaoEntidadeChangeHandler = (event) => {
    setDimensaoEntidade(event.target.value);
  };

  const fotoEntidadeChangeHandler = (event) => {
    if (event.target.files[0].size > 1000141) {
      alert("A foto deve ter no máximo 1MB");
      event.target.value = "";
      return setFotoEntidade();
    }

    setFotoEntidade(event.target.files[0]);
  };

  const areasEntidadeChangeHandler = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setAreasEntidade([...areas, value]);
    } else {
      setAreasEntidade(areas.filter((area) => area !== value));
    }
  };


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
    if (externoSelected && !adicionarEntidade) { //externo e nao cria entidade
      fd.append("cargoPrincipal", cargoPrincipal);
      fd.append("entidade", entidade); //id da entidade a que vamos adicionar o externo
    }
    if(externoSelected && adicionarEntidade){ //externo e cria entidade
      fd.append("cargoPrincipal", cargoPrincipal);
      fd.append("nomeEntidade", nomeEntidade);
      fd.append("moradaEntidade", moradaEntidade);
      fd.append("cod_postalEntidade", cod_postalEntidade);
      fd.append("NIFEntidade", NIFEntidade);
      fd.append("localidadeEntidade", localidadeEntidade);
      fd.append("dimensaoEntidade", dimensaoEntidade);
      fd.append("fotoEntidade", fotoEntidade);
      fd.append("areas", areas);
    }
    
    const result = await fetch("/api/utilizador", {
      method: "POST",
      body: fd,
    });

    if (result.status !== 200) {
      return setErrorMessage("Erro ao registar utilizador");
    }

    setNome("");
    setEmail("");
    setTelefone("");
    setPassword("");
    setTipoDeConta("");
    setLinkedinLink("");
    setAvatar();
    setCargoPrincipal("");
    setEntidade("");
    setNomeEntidade("");
    setMoradaEntidade("");
    setCodPostalEntidade("");
    setNIFEntidade("");
    setLocalidadeEntidade("");
    setDimensaoEntidade("");
    setFotoEntidade();
    setAreasEntidade([]);
    navigate("/login", {
      state: { id: 1, message: "Registo efectuado com sucesso" },
    });
  }

  const registarNovaEntidade = (
    <>
      <div className="form-group required mb-4">
        <label htmlFor="nomeEmpresa" className="form-label control-label">
          Nome da entidade:
        </label>
        <input
          type="text"
          id="nomeEmpresa"
          className="form-control"
          value={nomeEntidade}
          onChange={nomeEntidadeChangeHandler}
          required
        />
      </div>
      <div className="form-group required mb-4">
        <label htmlFor="moradaEmpresa" className="form-label control-label">
          Morada da sede:
        </label>
        <input
          type="text"
          id="moradaEmpresa"
          className="form-control"
          value={moradaEntidade}
          onChange={moradaEntidadeChangeHandler}
          required
        />
      </div>
      <div className="form-group required mb-4">
        <label htmlFor="codPostalEmpresa" className="form-label control-label">
          Código Postal:
        </label>
        <input
          type="text"
          id="codPostalEmpresa"
          className="form-control"
          value={cod_postalEntidade}
          onChange={codPostalEntidadeChangeHandler}
          required
        />
      </div>
      <div className="form-group required mb-4">
        <label htmlFor="localidadeEmpresa" className="form-label control-label">
          Localidade:
        </label>
        <input
          type="text"
          id="localidadeEmpresa"
          className="form-control"
          value={localidadeEntidade}
          onChange={localidadeEntidadeChangeHandler}
          required
        />
      </div>
      <div className="form-group required mb-4">
        <label htmlFor="NIFEmpresa" className="form-label control-label">
          NIF:
        </label>
        <input
          type="text"
          id="NIFEmpresa"
          className="form-control"
          value={NIFEntidade}
          onChange={NIFEntidadeChangeHandler}
          required
        />
      </div>
      <div className="form-group required mb-4">
        <label htmlFor="dimensaoEmpresa" className="form-label control-label">
          Dimensão/Faturação da entidade:
        </label>
        <select
          className="form-select"
          id="dimensaoEmpresa"
          onChange={dimensaoEntidadeChangeHandler}
          required
        >
          <option value="" selected>
            Escolher dimensão/faturação ...
          </option>
          <option value="<= 1M">Até 1 milhão</option>
          <option value="<= 10M">Entre 1 milhão e 10 milhões</option>
          <option value="> 10M">Acima de 10 milhões</option>
        </select>
      </div>
      <div className="form-group required mb-4">
        <label htmlFor="fotoEmpresa" className="form-label control-label">
          Logótipo da entidade:
        </label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="foto"
          name="foto"
          className="form-control"
          onChange={fotoEntidadeChangeHandler}
          required
        />
      </div>
      <div className="form-group required mb-4">
        <label className="form-label control-label mb-4">
          Áreas de atuação:
        </label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="informatica"
            value="Informática"
            id="flexCheckDefault"
            onChange={areasEntidadeChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Informática
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="gestao"
            value="Gestão"
            id="flexCheckDefault"
            onChange={areasEntidadeChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Gestão
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="contabilidade"
            value="Contabilidade"
            id="flexCheckDefault"
            onChange={areasEntidadeChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Contabilidade
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="marketing"
            value="Marketing"
            id="flexCheckDefault"
            onChange={areasEntidadeChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Marketing
          </label>
        </div>
      </div>
    </>
  );

  const externoForm = (
    <>
      <div className="form-group required mb-4">
        <label htmlFor="nome" className="form-label control-label">
          Cargo Principal:
        </label>
        <input
          type="text"
          id="cargoPrincipal"
          className="form-control"
          value={cargoPrincipal}
          onChange={cargoPrincipalChangeHandler}
          required
        />
      </div>
      <div className="form-group required mb-4">
        <label htmlFor="escolherEmpresa" className="form-label control-label">
          Entidade:
        </label>
        <select
          className="form-select"
          id="dimensaoEmpresa"
          onChange={entidadeChangeHandler}
          required
        >
          <option value="" selected>
            Escolher entidade ...
          </option>
          {entidadesBD.map((entidade) => <option key={entidade.id} value={entidade.id}>{entidade.nome}</option>)}
          <option value="criarEntidade">Adicionar entidade</option>
        </select>
      </div>
      {adicionarEntidade ? registarNovaEntidade : ""}
    </>
  );

  return (
    <div className="container" style={{ maxWidth: 500 }}>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <form
        onSubmit={submitHandler}
        className="text-center"
        encType="multipart/form-data"
      >
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
            accept="image/png, image/jpeg, image/jpg"
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
        {externoSelected ? externoForm : ""}

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
