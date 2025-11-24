import React from "react";
import "./ItemDetail.css";

export const ItemDetail = ({ name, price, image }) => {
  return (
    <div className="item-detail-container">
      <img src={image} alt={name} className="item-detail-image" />

      <h2 className="item-detail-title">{name}</h2>

      <p className="item-detail-price">${price}</p>
    </div>
  );
};

export default ItemDetail;
