import React from "react";
import products from "./products";
import "./Accesorios.css"; 

const ProductList = () => {
  return (
    <div className="grid-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">
            ${Number(product.price).toLocaleString()} COP
          </p>
          <button className="buy-button">
            🛒 Comprar ahora
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
