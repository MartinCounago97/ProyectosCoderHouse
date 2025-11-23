import { useState } from "react";
import Contenedor from "./components/Contenedor/Contenedor.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import NavBar from "./components/NavBar/navBar.jsx";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart.jsx";
import ItemCategoryContainer from "./components/ItemCategoryContainer/ItemCategoryContainer.jsx";

function App() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <NavBar cart={cart} />

      <Routes>
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/detalle/:id" element={<ItemDetailContainer />} />
        <Route
          path="/category/:id"
          element={<ItemCategoryContainer setCart={setCart} />}
        />

        <Route
          path="/"
          element={<Contenedor cart={cart} setCart={setCart} />}
        />
      </Routes>
    </>
  );
}

export default App;
