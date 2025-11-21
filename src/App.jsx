import Contenedor from "./components/Contenedor/Contenedor.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import NavBar from "./components/NavBar/navBar.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Contenedor />

      <Routes>
        <Route
          path="/Promociones"
          element={
            <div>
              <h2>Promociones</h2>
            </div>
          }
        />
        <Route
          path="/Dulces"
          element={
            <div>
              <h2>Dulces</h2>
            </div>
          }
        />
        <Route
          path="/Salados"
          element={
            <div>
              <h2>Salados</h2>
            </div>
          }
        />
        <Route
          path="/cart"
          element={
            <div>
              <h2>Carrito de Compras</h2>
            </div>
          }
        />
        <Route path="/detalle/:id" element={<ItemDetailContainer />} />
      </Routes>
    </>
  );
}

export default App;
