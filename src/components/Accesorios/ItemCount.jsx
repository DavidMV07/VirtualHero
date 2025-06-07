import React from 'react'

const ItemCount = ( {cantidad, handleRestar, handleSumar, handleAgregar, price} ) => {
    // Convertir el precio a número y remover cualquier carácter no numérico
    const numericPrice = typeof price === 'string' ? 
        Number(price.replace(/[^0-9.-]+/g, "")) : 
        Number(price);
    
    const total = cantidad * numericPrice;

    return (
        <div className="item-count-container">
            {/* Controles de cantidad */}
            <div className="item-count-controls">
                <button 
                    className="item-count-button" 
                    onClick={handleRestar}
                    aria-label="Disminuir cantidad"
                >
                    -
                </button>
                <span className="item-count-number">{cantidad}</span>
                <button 
                    className="item-count-button" 
                    onClick={handleSumar}
                    aria-label="Aumentar cantidad"
                >
                    +
                </button>
            </div>

            {/* Muestra el total calculado */}
            <p className="item-total">
                Total: ${isNaN(total) ? "0" : total.toLocaleString()}
            </p>

            {/* Botón para agregar al carrito */}
            <button 
                className="add-to-cart-button" 
                onClick={handleAgregar}
                aria-label="Agregar al carrito"
            >
                Agregar al carrito
            </button>
        </div>
    )
}

export default ItemCount