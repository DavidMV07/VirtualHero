// Importamos los hooks necesarios desde React y los estilos del componente
import React, { useEffect, useState } from "react";
import "./Accesorios.css";

// Importamos useSearchParams para obtener los parámetros de búsqueda desde la URL
import { useSearchParams } from "react-router-dom"; 

// Definimos el componente funcional ProductList
const ProductList = () => {
  // Obtenemos los parámetros de búsqueda  de la URL
  const [searchParams] = useSearchParams(); 

  // Obtenemos la categoría seleccionada desde la URL (por ejemplo: ?cat=Accesorios)
  const selectedCategory = searchParams.get("cat"); 

  // Creamos un estado para guardar la lista de productos
  const [products, setProducts] = useState([]);

  // useEffect se ejecuta una vez al cargar el componente para traer los productos del backend
  useEffect(() => {
    fetch("http://localhost:5000/products") // Llamada al servidor backend
      .then((response) => response.json())   // Convertimos la respuesta en JSON
      .then((data) => setProducts(data))     // Guardamos los productos en el estado
      .catch((error) => console.error("Error al obtener productos:", error)); // Capturamos errores
  }, []); // El arreglo vacío indica que esto solo se ejecuta una vez al montar el componente

  // Filtramos los productos según la categoría seleccionada
  const filteredProducts = selectedCategory
    ? selectedCategory === "Todos"
      ? products // Si es "Todos", no filtramos
      : products.filter((product) => product.category === selectedCategory) // Filtramos por categoría
    : products; // Si no hay categoría en la URL, mostramos todos

  // Renderizamos los productos filtrados en una cuadrícula
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
          {}
          <button className="buy-button">🛒 Comprar ahora</button>
          
        </div>
      ))}
    </div>
  );
};

export default ProductList; 
