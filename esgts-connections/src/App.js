import './App.css';
import { useState } from "react";
import NavBar from './components/Nav-Bar/NavBar';

function App() {

  const [isLogged, setLogged] = useState(true)

  return (
    <div className="">
      <NavBar isLogged={isLogged} />
    </div>
  );
}

export default App;
