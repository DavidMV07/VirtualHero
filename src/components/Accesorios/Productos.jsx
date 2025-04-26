import React from "react";
import products from "../products";

const ProductList = () => {
  return (
    <div style={styles.gridContainer}>
      {products.map((product) => (
        <div
          key={product.id}
          style={styles.card}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <img src={product.image} alt={product.name} style={styles.image} />
          <h3 style={styles.name}>{product.name}</h3>
          <p style={styles.description}>{product.description}</p>
          <p style={styles.price}>
            ${Number(product.price).toLocaleString()} COP
          </p>
          <button
            style={styles.button}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#218838";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#28a745";
            }}
          >
            🛒 Comprar ahora
          </button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    maxWidth: "300px",
    margin: "auto",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "16px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  description: {
    color: "#555",
    fontSize: "0.9rem",
    marginBottom: "12px",
  },
  price: {
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "12px",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background-color 0.3s ease",
  },
};

export default ProductList;
