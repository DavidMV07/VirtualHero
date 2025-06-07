import React, { useContext } from 'react';
// Importamos el contexto del carrito para acceder a los datos globales del carrito
import { CartContext } from '../../Context/CartContext';
// Importamos Link para la navegación interna con React Router
import { Link } from 'react-router-dom';
import './Carrito.css';

const Carrito = () => {
    // Extraemos las funciones y datos necesarios del contexto del carrito
    const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);

    // Función manejadora para vaciar el carrito
    const handleVaciar = () => {
        vaciarCarrito();
    }


    const formatPrice = (price) => {
        const numericPrice = typeof price === 'string' ? 
            Number(price.replace(/[^0-9.-]+/g, "")) : 
            Number(price);
        return numericPrice.toLocaleString();
    }

    return (
        <div className="carrito-container">
            <h1 className="carrito-titulo">Tu Carrito de Compras</h1>

            {/* Renderizado condicional basado en si el carrito está vacío */}
            {carrito.length === 0 ? (
                // Vista cuando el carrito está vacío
                <div className="carrito-vacio">
                    <h2>El carrito está vacío</h2>
                    <p>¡Agrega algunos productos para comenzar!</p>
                    <Link to="/Accesorios" className="btn-finalizar">
                        Ir a la tienda
                    </Link>
                </div>
            ) : (
                // Vista cuando hay productos en el carrito
                <>
                    {/* Lista de productos en el carrito */}
                    <div className="carrito-items">
                        {carrito.map((prod) => (
                            <div key={prod.id} className="carrito-item">
                                {/* Imagen del producto */}
                                <img 
                                    src={prod.image || '/placeholder.jpg'} 
                                    alt={prod.title} 
                                    className="carrito-item-imagen"
                                />
                                {/* Información del producto */}
                                <div className="carrito-item-info">
                                    <h3 className="carrito-item-titulo">{prod.title}</h3>
                                    <p className="carrito-item-precio">Precio unitario: ${formatPrice(prod.price)}</p>
                                    <p className="carrito-item-precio">Subtotal: ${formatPrice(prod.price * prod.cantidad)}</p>
                                </div>
                                {/* Cantidad del producto */}
                                <p className="carrito-item-cantidad">
                                    Cantidad: {prod.cantidad}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Sección de acciones del carrito */}
                    <div className="carrito-acciones">
                        {/* Total de la compra */}
                        <h2 className="carrito-total">Total: ${formatPrice(precioTotal())}</h2>
                        {/* Botones de acción */}
                        <div className="carrito-botones">
                            <button className="btn-vaciar" onClick={handleVaciar}>
                                Vaciar Carrito
                            </button>
                            <Link to="/checkout" className="btn-finalizar">
                                Finalizar Compra
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Carrito;