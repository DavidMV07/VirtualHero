import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

const ProductosList = () => {

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [titulo] = useState("Productos");
    
    const categoria = useParams().cat;

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchProductos = async () => {
            try {
                console.log("Iniciando conexión con Firebase...");
                console.log("Base de datos:", db);
                
                const productosRef = collection(db, "productos");
                console.log("Referencia a colección creada:", productosRef);
                
                const q = cat ? query(productosRef, where("categoria", "==", cat)) : productosRef;
                console.log("Query construida:", q);
                
                console.log("Obteniendo productos...");
                const resp = await getDocs(q);
                console.log("Respuesta de Firebase:", resp);
                console.log("Productos obtenidos:", resp.docs.length);

                if (resp.empty) {
                    console.log("No se encontraron productos");
                    setProductos([]);
                    return;
                }

                const productosData = resp.docs.map((doc) => {
                    const data = doc.data();
                    console.log("Datos del documento:", data);
                    return { ...data, id: doc.id };
                });
                
                console.log("Datos procesados:", productosData);
                setProductos(productosData);
            } catch (error) {
                console.error("Error detallado:", error);
                console.error("Código de error:", error.code);
                console.error("Mensaje de error:", error.message);
                setError(`Error al cargar los productos: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, [categoria]);

    // Renderizado condicional para estado de carga
    if (loading) {
        return (
            <div className="loading">
                <h2>Cargando productos...</h2>
                <p>Por favor espere mientras se obtienen los productos.</p>
            </div>
        );
    }

    // Renderizado condicional para estado de error
    if (error) {
        return (
            <div className="error">
                <h2>Error al cargar los productos</h2>
                <p>{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="btn-retry"
                >
                    Intentar de nuevo
                </button>
            </div>
        );
    }

    // Renderizado principal del componente
    return (
        <div className="container__Product">
            <h2 className="main-title">Productos</h2>
            {productos.length === 0 ? (
                <div className="no-products">
                    <p>No hay productos disponibles en este momento.</p>
                    <p>Por favor, intenta más tarde o contacta con el administrador.</p>
                </div>
            ) : (
                <ItemList productos={productos} titulo={titulo} />
            )}
        </div>
    );
};

export default ProductosList;