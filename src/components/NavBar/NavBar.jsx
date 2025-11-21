import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget.jsx";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <h1>Medialunas calentitas</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/Promociones">Promociones</NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/Dulces">Dulces</NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/Salados">Salados</NavLink>
          </li>
        </ul>
      </nav>
      <CartWidget />
    </header>
  );
};

export default NavBar;
