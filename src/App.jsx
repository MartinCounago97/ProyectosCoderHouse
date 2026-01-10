import Contenedor from "./components/Contenedor/Contenedor.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import NavBar from "./components/NavBar/navBar.jsx";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart.jsx";
import ItemCategoryContainer from "./components/ItemCategoryContainer/ItemCategoryContainer.jsx";
import Login from "./components/Login/Login.jsx";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/detalle/:id" element={<ItemDetailContainer />} />
        <Route path="/category/:id" element={<ItemCategoryContainer />} />
        <Route path="/" element={<Contenedor />} />
      </Routes>
    </>
  );
}

export default App;
