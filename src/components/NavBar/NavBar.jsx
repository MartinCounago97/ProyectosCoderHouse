import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget.jsx";
import { Link, NavLink } from "react-router-dom";
import { CargarDatos } from "../../AsyncMock.js";
import { useContext } from "react";
import { AuthContext } from "../Autenticacion/AuthContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.js";

const NavBar = () => {
  const { user, loading } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth);
  };

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

          {!loading && (
            <>
              {user ? (
                <li>
                  <button onClick={handleLogout}>Salir</button>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Registro</NavLink>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </nav>

      <CartWidget />
    </header>
  );
};

export default NavBar;
