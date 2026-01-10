import { useContext, useState } from "react";
import { CartContext } from "../Providers/CartContext";
import { AuthContext } from "../Autenticacion/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import "./Cart.css";

const Cart = () => {
  const { cartList, removeList } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  // { type: "success" | "error" | "info", text: string }

  const total = cartList.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (!user) {
      setMessage({
        type: "info",
        text: "Debes iniciar sesión para finalizar la compra",
      });

      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    const order = {
      userId: user.uid,
      email: user.email,
      items: cartList,
      total,
      date: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "orders"), order);
      removeList();

      setMessage({
        type: "success",
        text: "¡Compra realizada con éxito! 🎉",
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Ocurrió un error al finalizar la compra",
      });
    }
  };

  return (
    <div className="cart">
      <h3>🛒 Carrito ({cartList.length})</h3>

      {/* MENSAJE */}
      {message && (
        <div className={`cart-message ${message.type}`}>{message.text}</div>
      )}

      {cartList.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        cartList.map((item, i) => (
          <p key={i}>
            {item.name} x {item.qty} — ${item.price * item.qty}
          </p>
        ))
      )}

      <h4>Total: ${total}</h4>

      <div className="cart-buttons">
        <button onClick={removeList}>Vaciar carrito</button>
        <button
          className="btn-finalizar"
          onClick={handleCheckout}
          disabled={cartList.length === 0}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default Cart;
