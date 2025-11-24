import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../../AsyncMock";
import ItemListContainer from "../ItemListContainer/ItemListContainer";
import "./ItemCategoryContainer.css";

const CategoryContainer = ({ setCart }) => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsByCategory(id).then((res) => {
      setProducts(res);
    });
  }, [id]);

  return (
    <div className="category-container">
      <h2>Categoria: {id}</h2>

      {products.length === 0 ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ItemListContainer key={p.id} product={p} addToCart={setCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryContainer;
