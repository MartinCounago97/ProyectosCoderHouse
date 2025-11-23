import { Link } from "react-router-dom";
import "./CartWidget.css";

const CartWidget = ({ cart }) => {
  const carrito =
    "https://media.istockphoto.com/id/517056560/es/vector/cesta-icono-vector-ilustración.jpg?s=612x612&w=0&k=20&c=hhUqGl79GRcaKDjajX6UT29fvU294_bk9LjnAflDS0A=";

  return (
    <Link to="/cart">
      <div className="cart-widget">
        <img src={carrito} alt="Carrito" className="cart-icon" />
        <span className="cart-count">{cart.length}</span>
      </div>
    </Link>
  );
};

export default CartWidget;
