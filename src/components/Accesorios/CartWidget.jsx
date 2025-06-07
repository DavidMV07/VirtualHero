import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';

const CartWidget = () => {
    const context = useContext(CartContext);

    return (
        <Link to="/carrito" className="cart-widget">
            <i className="ri-shopping-cart-fill"></i>
            <span className="cart-count">{context.cantidadEnCarrito()}</span>
        </Link>
    )
}

export default CartWidget