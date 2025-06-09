import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en milisegundos

const ProductosList = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [titulo] = useState("Productos");
    
    const { categoria } = useParams();

    const getCachedProducts = () => {
        const cached = localStorage.getItem('allProducts');
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            const isExpired = Date.now() - timestamp > CACHE_DURATION;
            if (!isExpired) {
                // Si tenemos productos en caché, filtramos por categoría
                if (categoria && categoria !== "Todos") {
                    return data.filter(prod => prod.category === categoria);
                }
                return data;
            }
        }
        return null;
    };

    const setCachedProducts = (data) => {
        localStorage.setItem('allProducts', JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    };

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                console.log("Iniciando búsqueda de productos...");
                console.log("Categoría actual:", categoria);
                
                setLoading(true);
                setError(null);

                const productosRef = collection(db, "productos");
                let q = productosRef;
                
                if (categoria && categoria !== "Todos") {
                    console.log("Aplicando filtro para categoría:", categoria);
                    q = query(productosRef, where("category", "==", categoria));
                }

                console.log("Ejecutando consulta a Firebase...");
                const resp = await getDocs(q);
                console.log("Productos encontrados:", resp.docs.length);

                if (resp.empty) {
                    console.log("No se encontraron productos");
                    setProductos([]);
                    return;
                }

                const productosData = resp.docs.map((doc) => {
                    const data = doc.data();
                    console.log("Producto encontrado:", data.title, "Categoría:", data.category);
                    return { ...data, id: doc.id };
                });

                setProductos(productosData);
            } catch (error) {
                console.error("Error al cargar productos:", error);
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
            <h2 className="main-title">
                {categoria ? `Productos - ${categoria}` : "Todos los Productos"}
            </h2>
            {productos.length === 0 ? (
                <div className="no-products">
                    <p>No hay productos disponibles en esta categoría.</p>
                    <p>Por favor, intenta con otra categoría o contacta con el administrador.</p>
                </div>
            ) : (
                <ItemList productos={productos} titulo={titulo} />
            )}
        </div>
    );
};

export default ProductosList;