import { Link } from "react-router-dom";

const CartWidget = () => {
  const carrito =
    "https://media.istockphoto.com/id/517056560/es/vector/cesta-icono-vector-ilustraci%C3%B3n.jpg?s=612x612&w=0&k=20&c=hhUqGl79GRcaKDjajX6UT29fvU294_bk9LjnAflDS0A=";

  return (
    <Link to="/cart">
      <div>
        <img src={carrito} alt="Carrito de compras" style={{ width: "50px" }} />
      </div>
    </Link>
  );
};

export default CartWidget;
