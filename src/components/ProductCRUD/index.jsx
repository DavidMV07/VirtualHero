import { useState, useEffect } from "react";
import "./index.css";
import { db } from '../../firebase/config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

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

  // Obtener productos desde Firestore
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsArr = [];
    querySnapshot.forEach((docSnap) => {
      productsArr.push({ id: docSnap.id, ...docSnap.data() });
    });
    setProducts(productsArr);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario para agregar o actualizar productos
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name && form.description && form.price && form.image && form.category) {
      if (isEditing && form.id) {
        // Actualizar producto en Firestore
        const productRef = doc(db, "products", form.id);
        await updateDoc(productRef, {
          name: form.name,
          description: form.description,
          price: form.price,
          image: form.image,
          category: form.category
        });
        alert("Producto actualizado con éxito");
        setIsEditing(false);
      } else {
        // Agregar producto a Firestore
        await addDoc(collection(db, "products"), {
          name: form.name,
          description: form.description,
          price: form.price,
          image: form.image,
          category: form.category
        });
        alert("Producto agregado con éxito");
      }
      setForm({ id: "", name: "", description: "", price: "", image: "", category: "" });
      fetchProducts();
    }
  };

  // Manejar eliminación de productos
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    alert("Producto eliminado con éxito");
    fetchProducts();
  };

  // Manejar edición de productos
  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  return (
    <div className="CrudContainer">
      <h1>Product Management</h1>
      <form onSubmit={handleSubmit} className="FormCrud">
        {/* El campo ID solo se usa para edición, no para agregar */}
        <input
          type="text"
          name="id"
          placeholder="Product ID"
          value={form.id}
          onChange={handleChange}
          className="InputT"
          disabled
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
        <button type="submit" className={`Add`}>
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