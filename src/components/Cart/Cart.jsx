const Cart = ({ cart }) => {
  return (
    <div className="cart">
      <h3>🛒 Carrito ({cart.length})</h3>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        cart.map((item, i) => (
          <p key={i}>
            {item.name} - ${item.price}
          </p>
        ))
      )}
    </div>
  );
};

export default Cart;
