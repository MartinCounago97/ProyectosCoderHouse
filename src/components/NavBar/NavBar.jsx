import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget.jsx";
import { Link, NavLink } from "react-router-dom";
import { CargarDatos } from "../../AsyncMock.js";
import { useContext } from "react";
import { AuthContext } from "../Autenticacion/AuthContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.js";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    navigate("/");
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
            <NavLink to="/category/Promociones" className="nav-item">
              Promociones
            </NavLink>
          </li>

          <li>
            <NavLink to="/category/Dulces" className="nav-item">
              Dulces
            </NavLink>
          </li>

          <li>
            <NavLink to="/category/Salados" className="nav-item">
              Salados
            </NavLink>
          </li>
          <li>
            <NavLink to="/MisCompras" className="nav-item">
              Mis compras
            </NavLink>
          </li>

          {/*
<li>
  <button className="nav-item" onClick={CargarDatos}>
    Agregar producto
  </button>
</li>
*/}

          {!loading && (
            <>
              {user ? (
                <li>
                  <button className="nav-item" onClick={handleLogout}>
                    Salir
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/login" className="nav-item">
                      Login
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/RegistroUsuario" className="nav-item">
                      Registro
                    </NavLink>
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
