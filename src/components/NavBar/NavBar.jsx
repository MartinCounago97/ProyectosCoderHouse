import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget.jsx";

const NavBar = () => {
  return (
    <header>
      <h1>App</h1>
      <nav>
        <ul>
          <li>Profesores</li>
          <li>Estudiantes</li>
          <li>Clases</li>
        </ul>
      </nav>
      <CartWidget />
    </header>
  );
};

export default NavBar;
