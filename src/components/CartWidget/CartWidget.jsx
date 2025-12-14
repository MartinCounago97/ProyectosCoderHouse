import { Link } from "react-router-dom";
import "./CartWidget.css";
import { CartContext } from "../Providers/CartContext";
import { useContext } from "react";

const CartWidget = () => {
  const { cartList } = useContext(CartContext);

  const carritoImg =
    "https://media.istockphoto.com/id/517056560/es/vector/cesta-icono-vector-ilustración.jpg?s=612x612&w=0&k=20&c=hhUqGl79GRcaKDjajX6UT29fvU294_bk9LjnAflDS0A=";

  return (
    <Link to="/cart">
      <div className="cart-widget">
        <img src={carritoImg} alt="Carrito" className="cart-icon" />

        {cartList.length > 0 && (
          <span className="cart-count">{cartList.length}</span>
        )}
      </div>
    </Link>
  );
};

export default CartWidget;
