import { useState } from "react";
import "./index.css";

export default function ProductCRUD() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productId: "", productName: "", productBrand: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.productId && form.productName && form.productBrand) {
      if (isEditing) {
        setProducts(products.map((product) => (product.productId === form.productId ? form : product)));
        setIsEditing(false);
      } else {
        setProducts([...products, form]);
      }
      setForm({ productId: "", productName: "", productBrand: "" });
    }
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.productId !== id));
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  return (
    <div className="CrudContainer">
      <h1>Product CRUD</h1>
      <form onSubmit={handleSubmit} className="FormCrud">
        <input
          type="text"
          name="productId"
          placeholder="Product ID"
          value={form.productId}
          onChange={handleChange}
          className="InputT"
          required
          disabled={isEditing}
        />
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={form.productName}
          onChange={handleChange}
          className="InputT"
          required
        />
        <input
          type="text"
          name="productBrand"
          placeholder="Product Brand"
          value={form.productBrand}
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
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId} className="TbodyTr">
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.productBrand}</td>
                <td className="tdActions">
                  <button onClick={() => handleEdit(product)} className="Edit">Edit</button>
                  <button onClick={() => handleDelete(product.productId)} className="Delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
