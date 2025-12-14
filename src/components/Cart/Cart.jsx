import { useContext } from "react";
import { CartContext } from "../Providers/CartContext";

const Cart = () => {
  const { cartList } = useContext(CartContext);

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
    </div>
  );
};

export default Cart;
