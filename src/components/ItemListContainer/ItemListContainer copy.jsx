import "./ItemListContainer.css";
import { Link } from "react-router-dom";
import { CartContext } from "../Providers/CartProvider";

const ItemListContainer = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <h4>{product.name}</h4>
      <img src={product.image} alt={product.name} className="product-image" />
      <p>${product.price}</p>

      <button className="add-btn" onClick={() => addToCart(product)}>
        Agregar al carrito
      </button>

      <button className="add-btn" onClick={() => addToCart(product)}>
        Agregar al carrito
      </button>
      <button className="add-btn">
        <Link to={`/detalle/${product.id}`}> Detalle</Link>
      </button>
    </div>
  );
};

export default ItemListContainer;
