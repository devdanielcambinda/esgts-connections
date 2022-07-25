import React,{useState,useEffect} from 'react';

export default function NovaOportunidade(props){

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tipoDeOportunidade, setTipoDeOportunidade] = useState('');
    const [dataDeInicio, setDataDeInicio] = useState('');
    const [dataDeFim, setDataDeFim] = useState('');

    useEffect(() => {
      const dataMinima = ()=>{
        let today = new Date();
        let dd = today.getDate()+1; // + 1 para não meter no proprio dia
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
          dd = "0" + dd;
        }

        if (mm < 10) {
          mm = "0" + mm;
        }
        today = yyyy + "-" + mm + "-" + dd;
        document.getElementById("dataDeInicio").setAttribute("min", today);
        document.getElementById("dataDeFim").setAttribute("min", today);
      }
      
      dataMinima()
    }, [])

    const tituloChangeHandler = (event) => {
        setTitulo(event.target.value);
    }

    const descricaoChangeHandler = (event) => {
        setDescricao(event.target.value);
    }

    const tipoDeOportunidadeChangeHandler = (event) => {
        setTipoDeOportunidade(event.target.value);
    }

    const dataDeInicioChangeHandler = (event) => {
        setDataDeInicio(event.target.value);
    }

    const dataDeFimChangeHandler = (event) => {
        setDataDeFim(event.target.value);
    }

    const resetFormHandler = () => {
        setTitulo('');
        setDescricao('');
        setTipoDeOportunidade('');
        setDataDeInicio('');
        setDataDeFim('');
        props.onCancelarOportunidade()
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        const result = await fetch("/api/oportunidade", {
          method: "POST",
          body: JSON.stringify({
            titulo: titulo.toString(),
            descricao: descricao.toString(),
            tipoDeOportunidade: tipoDeOportunidade.toString(),
            dataDeInicio: dataDeInicio.toString(),
            dataDeFim: dataDeFim.toString(),
          }),
          headers: { "Content-Type": "application/json" }
        });

        if(result.status === 200) {
          resetFormHandler()
          props.onAdicionarOportunidade();
        }

    }

    return (
      <form onSubmit={submitHandler} className="text-center">
        <div className="form-group required mb-4">
          <label htmlFor="titulo" className="form-label control-label">
            Titulo:
          </label>
          <input
            type="text"
            id="titulo"
            className="form-control"
            value={titulo}
            onChange={tituloChangeHandler}
            required
          />
        </div>
        <div className="form-group required mb-4">
          <label htmlFor="descricao" className="form-label control-label">
            Descrição:
          </label>
          <input
            type="text"
            id="descricao"
            className="form-control"
            value={descricao}
            onChange={descricaoChangeHandler}
            required
          />
        </div>
        <div className="form-group required mb-4">
          <label
            htmlFor="tipoDeOportunidade"
            className="form-label control-label"
          >
            Tipo de Oportunidade:
          </label>
          <select
            className="form-select"
            id="tipoDeOportunidade"
            onChange={tipoDeOportunidadeChangeHandler}
            required
          >
            <option value="" selected>
              Escolher tipo de oportunidade...
            </option>
            <option value="Estágio">Estágio</option>
            <option value="Workshop">Workshop</option>
            <option value="Trabalho">Trabalho</option>
          </select>
        </div>
        <div className="form-group required mb-4">
          <label htmlFor="dataDeInicio" className="form-label control-label">
            Data de Inicio:
          </label>
          <input
            type="date"
            id="dataDeInicio"
            className="form-control"
            value={dataDeInicio}
            onChange={dataDeInicioChangeHandler}
            required
          />
        </div>
        <div className="form-group required mb-4">
          <label htmlFor="dataDeFim" className="form-label control-label">
            Data de Fim:
          </label>
          <input
            type="date"
            id="dataDeFim"
            className="form-control"
            value={dataDeFim}
            onChange={dataDeFimChangeHandler}
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-dark mb-4">
            Adicionar
          </button>
          <button
            type="reset"
            className="btn btn-dark mb-4"
            onClick={resetFormHandler}
          >
            Cancelar
          </button>
        </div>
      </form>
    );

}