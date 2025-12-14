import { useContext } from "react";
import { CartContext } from "../Providers/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartList, removeList } = useContext(CartContext);

  return (
    <div className="cart">
      <h3>🛒 Carrito ({cartList.length})</h3>

      {cartList.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        cartList.map((item, i) => (
          <p key={i}>
            {item.name} - ${item.price}
          </p>
        ))
      )}

      <button onClick={removeList}>Vaciar carrito</button>
    </div>
  );
};

export default Cart;
