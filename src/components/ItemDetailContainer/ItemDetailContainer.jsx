import { useState, useEffect } from "react";
import { getProductById } from "../../AsyncMock.js";
import { useParams } from "react-router-dom";

import { ItemDetail } from "../ItemDetail/ItemDetail.jsx";

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState(null);
  const params = useParams();

  useEffect(() => {
    getProductById(params.id)
      .then((prod) => setProducto(prod))
      .catch((error) => console.error(error));
  }, [params.id]);
  return (
    <div>
      <ItemDetail {...producto} />
    </div>
  );
};

export default ItemDetailContainer;
