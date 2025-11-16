import { useState, useEffect } from "react";
import { getProductById } from "../../AsyncMock.js";

import { ItemDetail } from "../ItemDetail/ItemDetail.jsx";

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    getProductById(3)
      .then((prod) => setProducto(prod))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <ItemDetail {...producto} />
    </div>
  );
};

export default ItemDetailContainer;
