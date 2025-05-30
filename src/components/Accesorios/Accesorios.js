import React, { useState } from "react";
import Cart from "./Cart";
import "./Accesorios.css";

export default function Accesorios() {
  // Suponiendo que tienes un array de productos llamado 'products'
  const [cart, setCart] = useState([]);

  const handleBuy = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    alert("¡Gracias por tu compra!");
    setCart([]);
  };

  return (
    <div>
      <Cart cartItems={cart} onRemove={handleRemove} onCheckout={handleCheckout} />
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img className="product-image" src={product.image} alt={product.name} />
            <div className="product-name">{product.name}</div>
            <div className="product-description">{product.description}</div>
            <div className="product-price">${product.price}</div>
            <button className="buy-button" onClick={() => handleBuy(product)}>
              Comprar ahora
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}