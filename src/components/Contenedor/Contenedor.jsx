import { useEffect, useState } from "react";
import ItemListContainer from "../ItemListContainer/ItemListContainer.jsx";
import "./Contenedor.css";

const Contenedor = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/Data/Data.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);

  return (
    <div className="container">
      <h2>Productos</h2>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((p) => <ItemListContainer key={p.id} product={p} />)
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </div>
  );
};

export default Contenedor;
