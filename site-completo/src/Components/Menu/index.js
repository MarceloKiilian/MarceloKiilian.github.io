import React from "react";
import { Link } from "react-router-dom"; // Importando o Link do react-router-dom para navegação
import "./index.css";

const Menu = () => {
  return (
    <nav className="menu">
      <h1 className="menu-title">Marcelo Kiilian</h1>{" "}
      {/* Adicionando o título */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">Sobre</Link>
        </li>
        <li>
          <Link to="/courses">Cursos</Link>
        </li>
        <li>
          <Link to="/contact">Contato</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
