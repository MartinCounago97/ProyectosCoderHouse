import { useState } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  const addToCart = (item, qty = 1) => {
    setCartList((prev) => [...prev, { ...item, qty }]);
  };

  const removeList = () => {
    setCartList([]);
  };

  const deleteItem = (id) => {
    setCartList((prev) => prev.filter((item) => item.id !== id));
  };

  const cantidad = cartList.length;

  return (
    <CartContext.Provider
      value={{
        cartList,
        addToCart,
        removeList,
        deleteItem,
        cantidad,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
