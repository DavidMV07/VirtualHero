import Item from "./Item";
import "./Accesorios.css"
import { toCapital } from "../../helpers/toCapital";


const ItemList = ( {productos, titulo} ) => {

  return (
    <div>
        <h2 className="products__title">{toCapital(titulo)}</h2>

        <div className="products__grid">
        {productos && productos.length > 0 && productos.map((prod) => (
            <Item producto={prod} key={prod.id} />
        ))}
        </div>
    </div>
  )
}

export default ItemList