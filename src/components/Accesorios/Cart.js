import React from "react";

export default function Cart({ cartItems, onRemove, onCheckout }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <div className="cart-title">
        Carrito de compras
        <span className="cart-badge">{cartItems.length}</span>
      </div>
      <ul className="cart-items-list">
        {cartItems.length === 0 && <li>El carrito está vacío</li>}
        {cartItems.map((item, idx) => (
          <li className="cart-item" key={item.id}>
            <span className="cart-item-name">{item.name}</span>
            <span className="cart-item-qty">x{item.qty}</span>
            <button className="cart-remove-btn" onClick={() => onRemove(item.id)} title="Quitar">
              &times;
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-total">Total: ${total.toFixed(2)}</div>
      <button className="cart-checkout-btn" onClick={onCheckout} disabled={cartItems.length === 0}>
        Finalizar compra
      </button>
    </div>
  );
}
