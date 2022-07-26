import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginNotOK, setLoginNotOK] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const result = await fetch("/api/utilizador/login", {
      method: "POST",
      body: JSON.stringify({
        email: email.toString(),
        password: password.toString()
      }),
      headers: {"Content-Type": "application/json"},
    });

    if(result.status === 200) {
      setEmail("");
      setPassword("");
      navigate('/perfil')
      document.location.reload()
    }else {
      setLoginNotOK(true)
      setEmail("");
      setPassword("");
    }

    
  };

  return (
    <div className="container" style={{ maxWidth: 500 }}>
      {location.state && location.state.id === 1? <div style={{"color":"green"}}>{location.state.message}</div> : ""}
      {location.state && location.state.id === 2? <div style={{"color":"red"}}>{location.state.message}</div> : ""}
      {loginNotOK === true ? <div style={{"color":"red"}}>Email e&#47;ou password incorreto&#40;s&#41; </div> : ""}
      <form onSubmit={submitHandler} className="text-center">
        <h2 className="mb-5">Login</h2>
        <div className="form-group required">
          <label htmlFor="email" className="form-label control-label">
            E-mail:
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
          <label className="form-label control-label" htmlFor="password">
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
        <div className="d-grid">
          <button type="submit" className="btn btn-dark mb-4">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
