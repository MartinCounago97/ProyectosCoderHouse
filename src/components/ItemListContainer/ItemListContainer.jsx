import "./ItemListContainer.css";
import { Link } from "react-router-dom";
import { CartContext } from "../Providers/CartContext";
import { useContext } from "react";

const ItemListContainer = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <h4>{product.name}</h4>
      <img src={product.image} alt={product.name} className="product-image" />
      <p>${product.price}</p>

      <button className="add-btn" onClick={() => addToCart(product, 1)}>
        Agregar al carrito
      </button>

      <Link to={`/detalle/${product.id}`}>
        <button className="add-btn">Detalle</button>
      </Link>
    </div>
  );
};

export default ItemListContainer;
