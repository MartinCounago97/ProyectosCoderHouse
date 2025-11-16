import React from "react";
import "./ItemDetail.css";

export const ItemDetail = ({ id, name, price, image }) => {
  return (
    <div className="item-detail-container">
      <div className="item-detail-image">
        <img src={image} alt={name} />
      </div>

      <div className="item-detail-info">
        <h2>{name}</h2>
        <p>ID: {id}</p>

        <p className="item-detail-price">${price}</p>
      </div>
    </div>
  );
};

export default ItemDetail;
