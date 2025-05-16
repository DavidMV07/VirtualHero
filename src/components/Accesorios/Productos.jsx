import React, { useEffect, useState } from "react";
import "./Accesorios.css"; 
import { useCategory } from "../../Context/CategoryContext"; 

const ProductList = () => {
  const { selectedCategory } = useCategory();
  const [products, setProducts] = useState([]);

 
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  // Si hay una categoría seleccionada, filtramos los productos
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="grid-container">
      {filteredProducts.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">
            ${Number(product.price).toLocaleString()} COP
          </p>
          <button className="buy-button">🛒 Comprar ahora</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;