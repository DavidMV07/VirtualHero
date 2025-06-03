import { useState, useEffect } from "react";
import "./index.css";

export default function ProductCRUD() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
    category: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  // Obtener productos desde el backend
  const fetchProducts = () => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario para agregar o actualizar productos
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id && form.name && form.description && form.price && form.image && form.category) {
      if (isEditing) {
        // Actualizar producto en el backend
        fetch(`http://localhost:5000/products/${form.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        })
          .then((response) => {
            if (response.ok) {
              alert("Producto actualizado con éxito");
              fetchProducts(); // Actualizar la lista de productos
              setIsEditing(false);
              setForm({ id: "", name: "", description: "", price: "", image: "", category: "" });
            } else {
              alert("Error al actualizar producto");
            }
          })
          .catch((error) => console.error("Error al actualizar producto:", error));
      } else {
        // Agregar producto al backend
        fetch("http://localhost:5000/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        })
          .then((response) => {
            if (response.ok) {
              alert("Producto agregado con éxito");
              fetchProducts(); // Actualizar la lista de productos
              setForm({ id: "", name: "", description: "", price: "", image: "", category: "" });
            } else {
              alert("Error al agregar producto");
            }
          })
          .catch((error) => console.error("Error al agregar producto:", error));
      }
    }
  };

  // Manejar eliminación de productos
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.ok) {
          alert("Producto eliminado con éxito");
          fetchProducts(); // Actualizar la lista de productos
        } else {
          alert("Error al eliminar producto");
        }
      })
      .catch((error) => console.error("Error al eliminar producto:", error));
  };

  // Manejar edición de productos
  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  return (
    <div className="CrudContainer">
      <h1>Product Management </h1>
      <form onSubmit={handleSubmit} className="FormCrud">
        <input
          type="text"
          name="id"
          placeholder="Product ID"
          value={form.id}
          onChange={handleChange}
          className="InputT"
          required
          disabled={isEditing}
        />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="InputT"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="InputT"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="InputT"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="InputT"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="InputT"
          required
        />
        <button type="submit" className={`Add ${isEditing ? '' : ''} `}>
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>
      <div className="TableContainer">
        <table className="TablePrin">
          <thead>
            <tr className="TableTr">
              <th>Product ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="TbodyTr">
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${Number(product.price).toLocaleString()}</td>
                <td>
                  <img src={product.image} alt={product.name} className="ProductImage" />
                </td>
                <td>{product.category}</td>
                <td className="tdActions">
                  <button onClick={() => handleEdit(product)} className="Edit">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="Delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}