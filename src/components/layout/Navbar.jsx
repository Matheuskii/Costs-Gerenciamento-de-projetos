import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import Tutorial from "./Tutorial"; 

import style from "./Navbar.module.css";
import logo from "../../img/costs_logo.png";

function Navbar() {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <nav className={style.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Costs" />
        </Link>
        <ul className={style.list}>
          <li className={style.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={style.item}>
            <Link to="/projects">Meus Projetos</Link>
          </li>
          <li className={style.item}>
            <Link to="/company">Empresa</Link>
          </li>
          <li className={style.item}>
            <Link to="/contact">Contato</Link>
          </li>
          {/* Botão de Ajuda na Navbar */}
          <li>
            <button 
              className={style.help_btn} 
              onClick={() => setShowTutorial(true)}
            >
              Ajuda ?
            </button>
          </li>
        </ul>
      </Container>

      {/* Renderiza o tutorial apenas se showTutorial for true */}
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
    </nav>
  );
}

export default Navbar;