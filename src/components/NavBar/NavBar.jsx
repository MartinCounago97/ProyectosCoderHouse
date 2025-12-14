import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget.jsx";
import { Link, NavLink } from "react-router-dom";

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
        </ul>
      </nav>

      <CartWidget />
    </header>
  );
};

export default NavBar;
