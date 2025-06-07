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

  return (
    <div>
      <div>
        <img className="products__image" src={item.image} alt={item.title} />
        <h3 className="products__title">{item.title}</h3>
        <p className="products__description">{item.description}</p>
        <p className="products__category">Categoría: {toCapital(item.category)}</p>
        <p className="products__price">${item.price}</p>
        <ItemCount
          cantidad={cantidad}
          handleSumar={handleSumar}
          handleRestar={handleRestar}
          handleAgregar={() => { agregarAlCarrito(item, cantidad) }}
        />
      </div>
    </div>
  )
}

export default ItemDetail