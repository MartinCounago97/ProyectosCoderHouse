import React, { useState, useEffect } from "react";
import ItemListContainer from "../ItemListContainer/ItemListContainer.jsx";
import "./Contenedor.css";

const Contenedor = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/Data/Data.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className="container">
      <h2>Productos</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <ItemListContainer key={p.id} product={p} addToCart={addToCart} />
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>

      <div className="cart">
        <h3>🛒 Carrito ({cart.length})</h3>
        {cart.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          cart.map((item, i) => (
            <p key={i}>
              {item.name} - ${item.price}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default Contenedor;
