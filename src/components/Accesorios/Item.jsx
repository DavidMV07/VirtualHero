import React from 'react'
import { Link } from 'react-router-dom'
import "./Accesorios.css"
import { toCapital } from '../../helpers/toCapital'

const Item = ( {producto} ) => {
  return (
    <div className="products__card">
      {/* Imagen del producto */}
      <img 
        className="product__image" 
        src={producto.image} 
        alt={producto.title} 
      />
      
      {/* Información básica del producto */}
      <h4 className="product__title">{producto.title}</h4>
      <p className="product__price">${producto.price}</p>
      <p className="product__category">
        Categoría: {toCapital(producto.category)}
      </p>

      {/* Enlace para ver detalles del producto */}
      <Link 
        className="ver-mas" 
        to={`/Product/${producto.id}`}
      >
        Ver más
      </Link>
    </div>
  )
}

export default Item