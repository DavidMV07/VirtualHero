import { useContext, useState } from "react";
import "./Accesorios.css"
import { toCapital } from "../../helpers/toCapital"
import ItemCount from "./ItemCount"
import { CartContext } from "../../Context/CartContext";

const ItemDetail = ( {item} ) => {
    const { carrito, agregarAlCarrito } = useContext(CartContext);
    console.log(carrito);

    const [cantidad, setCantidad] = useState(1);

    const handleRestar = () => {
        cantidad > 1 && setCantidad(cantidad - 1)
    }

    const handleSumar = () => {
        cantidad < item.stock && setCantidad(cantidad + 1)
    }

    // Asegurarnos de que el precio sea un número
    const numericPrice = typeof item.price === 'string' ? 
        Number(item.price.replace(/[^0-9.-]+/g, "")) : 
        Number(item.price);

    return (
        <div className="item-detail-container">
            <div className="item-detail-content">
                {/* Sección de imagen */}
                <div className="item-detail-image">
                    <img src={item.image} alt={item.title} />
                </div>

                {/* Sección de información y controles */}
                <div className="item-detail-info">
                    <h1 className="item-detail-title">{item.title}</h1>
                    <p className="item-detail-description">{item.description}</p>
                    <p className="item-detail-category">
                        Categoría: {toCapital(item.category)}
                    </p>
                    <p className="item-detail-price">
                        ${numericPrice.toLocaleString()}
                    </p>

                    {/* Componente contador y control de compra */}
                    <ItemCount
                        cantidad={cantidad}
                        handleSumar={handleSumar}
                        handleRestar={handleRestar}
                        handleAgregar={() => { 
                            agregarAlCarrito({...item, price: numericPrice}, cantidad) 
                        }}
                        price={numericPrice}
                    />
                </div>
            </div>
        </div>
    )
}

export default ItemDetail