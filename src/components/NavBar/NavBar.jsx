import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget.jsx";
import { Link, NavLink } from "react-router-dom";
import { CargarDatos } from "../../AsyncMock.js";

const NavBar = () => {
  return (
    <header>
      <h1>
        <Link to="/" className="home-link">
          Medialunas calentitas
        </Link>
      </h1>

      <nav>
        <ul>
          <li>
            <NavLink to="/category/Promociones">Promociones</NavLink>
          </li>
          <li>
            <NavLink to="/category/Dulces">Dulces</NavLink>
          </li>
          <li>
            <NavLink to="/category/Salados">Salados</NavLink>
          </li>
          <li>
            <button onClick={CargarDatos}>Agregar producto</button>
          </li>
        </ul>
      </nav>

      <CartWidget />
    </header>
  );
};

export default NavBar;
