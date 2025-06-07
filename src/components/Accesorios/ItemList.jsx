import Item from "./Item";
import "./Accesorios.css"


const ItemList = ( {productos, } ) => {

  return (
    <div className="grid-container ">
      {productos && productos.length > 0 && productos.map((prod) => (
        <Item producto={prod} key={prod.id} />
      ))}
    </div>
    
  )
}

export default ItemList