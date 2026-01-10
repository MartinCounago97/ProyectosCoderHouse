import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Autenticacion/AuthContext.jsx";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
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
          where("userId", "==", user.uid),
          orderBy("date", "desc")
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
            <p>
              <strong>Fecha:</strong>{" "}
              {order.date?.toDate().toLocaleDateString()}
            </p>

            <p>
              <strong>Total:</strong> ${order.total}
            </p>

            <ul>
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} x {item.qty} — ${item.price * item.qty}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MisCompras;
