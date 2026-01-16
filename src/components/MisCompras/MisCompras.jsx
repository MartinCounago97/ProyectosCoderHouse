import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Autenticacion/AuthContext.jsx";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { useNavigate } from "react-router-dom";
import "./MisCompras.css";

const MisCompras = () => {
  const { user, loading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);
        const userOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(userOrders);
      } catch (error) {
        console.error("Error cargando compras:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user, loading, navigate]);

  if (loading || loadingOrders) {
    return <p className="loading">Cargando tus compras...</p>;
  }

  return (
    <div className="mis-compras">
      <h2>🧾 Mis compras</h2>

      {orders.length === 0 ? (
        <p>No realizaste compras aún</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <p className="productos">Productos:</p>
            <ul className="productos-list">
              {order.items.map((item, i) => (
                <li key={i} className="producto-item">
                  <span className="producto-nombre">
                    {item.name} x {item.qty}
                  </span>
                  <span className="producto-precio">
                    ${item.price * item.qty}
                  </span>
                </li>
              ))}
            </ul>

            <p className="total">
              <strong>Total:</strong> ${order.total}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MisCompras;
