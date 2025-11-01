import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget.jsx";

const NavBar = () => {
  return (
    <header>
      <h1>Medialunas calentitas</h1>
      <nav>
        <ul>
          <li>Promociones</li>
          <li>Dulces</li>
          <li>Salados</li>
        </ul>
      </nav>
      <CartWidget />
    </header>
  );
};

export default NavBar;
