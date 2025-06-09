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
import Swal from 'sweetalert2';

export default function ProductCRUD() {

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  // Obtener productos desde Firestore
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const productsArr = [];
    querySnapshot.forEach((docSnap) => {
      productsArr.push({ id: docSnap.id, ...docSnap.data() });
    });
    setProducts(productsArr);
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Función para mostrar mensaje de éxito
  const showSuccess = (message) => {
    Swal.fire({
      title: '¡Éxito!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#2563eb',
      background: '#fff',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        confirmButton: 'swal-custom-button'
      }
    });
  };

  // Función para confirmar eliminación
  const confirmDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#fff',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        confirmButton: 'swal-custom-button'
      }
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "productos", id));
        showSuccess('Producto eliminado con éxito');
        fetchProducts();
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el producto',
          icon: 'error',
          confirmButtonColor: '#2563eb'
        });
      }
    }
  };

  // Actualizar handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.title && form.description && form.price && form.image && form.category && form.stock) {
      try {
        if (isEditing && form.id) {
          const productRef = doc(db, "productos", form.id);
          await updateDoc(productRef, {
            title: form.title,
            description: form.description,
            price: form.price,
            image: form.image,
            category: form.category,
            stock: form.stock
          });
          showSuccess("Producto actualizado con éxito");
          setIsEditing(false);
        } else {
          await addDoc(collection(db, "productos"), {
            title: form.title,
            description: form.description,
            price: form.price,
            image: form.image,
            category: form.category,
            stock: form.stock
          });
          showSuccess("Producto agregado con éxito");
        }
        setForm({ id: "", title: "", description: "", price: "", image: "", category: "", stock: "" });
        fetchProducts();
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al procesar tu solicitud',
          icon: 'error',
          confirmButtonColor: '#2563eb'
        });
      }
    } else {
      Swal.fire({
        title: 'Atención',
        text: 'Por favor completa todos los campos',
        icon: 'info',
        confirmButtonColor: '#2563eb'
      });
    }
  };

  // Actualizar handleDelete
  const handleDelete = (id) => {
    confirmDelete(id);
  };

  // Manejar edición de productos
  const handleEdit = (productos) => {
    setForm(productos);
    setIsEditing(true);
  };

  return (
    <div className="CrudContainer">
      <h1>Product Management</h1>
      <form onSubmit={handleSubmit} className="FormCrud">
        <div className="form-row">
          <div className="form-group">
            <label>ID</label>
            <input
              type="text"
              name="id"
              placeholder="Product ID"
              value={form.id}
              onChange={handleChange}
              className="InputT"
              disabled
            />
          </div>
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={form.title}
              onChange={handleChange}
              className="InputT"
              required
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Descripción</label>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="InputT"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Precio</label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="InputT"
              required
            />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className="InputT"
              required
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>URL de Imagen</label>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              className="InputT"
              required
            />
          </div>
          <div className="form-group">
            <label>Categoría</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="InputT"
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="Periféricos">Periféricos</option>
              <option value="Audio">Audio</option>
              <option value="Pantallas">Pantallas</option>
              <option value="Mobiliario">Mobiliario</option>
              <option value="Computadores">Computadores</option>
              <option value="Almacenamiento">Almacenamiento</option>
            </select>
          </div>
        </div>

        <button type="submit" className={`Add`}>
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>
      <div className="TableContainer">
        <table className="TablePrin">
          <thead>
            <tr className="TableTr">
              <th>Product ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="TbodyTr">
                <td className="product-id">{product.id}</td>
                <td className="product-title">{product.title}</td>
                <td className="product-description">{product.description}</td>
                <td className="product-price">
                  ${Number(product.price).toLocaleString()}
                </td>
                <td className="product-image">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="ProductImage"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                      e.target.onerror = null;
                    }}
                  />
                </td>
                <td className="product-category">{product.category}</td>
                <td className="product-stock">{product.stock}</td>
                <td className="tdActions">
                  <button onClick={() => handleEdit(product)} className="Edit">
                    <i className="ri-edit-line"></i> Editar
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="Delete">
                    <i className="ri-delete-bin-line"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}