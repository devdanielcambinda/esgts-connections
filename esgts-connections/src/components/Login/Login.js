import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const loginInformation = {
      //short-hand object definition
      email,
      password,
    };

    console.log(loginInformation);

    //db get req for auth token cookie

    setEmail("");
    setPassword("");
  };

  return (
    <div className='container' style={{maxWidth:500}}>
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
