import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';

const CartWidget = () => {
    // Obtenemos el contexto del carrito para acceder a la cantidad de productos
    const context = useContext(CartContext);

    return (
        <Link to="/carrito" className="cart-widget">
            {/* Ícono del carrito de compras */}
            <i className="ri-shopping-cart-fill"></i>
            {/* Contador que muestra la cantidad total de productos */}
            <span className="cart-count">{context.cantidadEnCarrito()}</span>
        </Link>
    )
}

export default CartWidget;