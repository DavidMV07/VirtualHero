import { useContext, useState, useEffect } from "react";
import "./Accesorios.css"
import { toCapital } from "../../helpers/toCapital"
import ItemCount from "./ItemCount"
import { CartContext } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ItemDetail = ( {item} ) => {
    const { carrito, agregarAlCarrito } = useContext(CartContext);
    const { user } = useAuth();
    const navigate = useNavigate();

    const [cantidad, setCantidad] = useState(1);

    const handleRestar = () => {
        cantidad > 1 && setCantidad(cantidad - 1)
    }

    const handleSumar = () => {
        cantidad < item.stock && setCantidad(cantidad + 1)
    }

    const handleVolver = () => {
        navigate(-1); // Esto nos lleva a la página anterior
    };

    // Asegurarnos de que el precio sea un número
    const numericPrice = typeof item.price === 'string' ? 
        Number(item.price.replace(/[^0-9.-]+/g, "")) : 
        Number(item.price);

    const handleAgregarAlCarrito = () => {
        if (!user) {
            Swal.fire({
                title: '¡Necesitas una cuenta!',
                text: 'Para agregar productos al carrito, necesitas iniciar sesión o registrarte',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#38bdf8',
                cancelButtonColor: '#4F46E5',
                confirmButtonText: 'Iniciar sesión',
                cancelButtonText: 'Registrarse',
                background: '#fff',
                customClass: {
                    popup: 'rounded-lg shadow-xl border-2 border-gray-100',
                    title: 'text-xl font-bold text-gray-800',
                    content: 'text-gray-600',
                    confirmButton: 'rounded-md text-white font-semibold px-6 py-2 transition-all hover:opacity-90',
                    cancelButton: 'rounded-md text-white font-semibold px-6 py-2 transition-all hover:opacity-90'
                }
            }).then((result) => {
                // Guardar el estado actual en localStorage
                localStorage.setItem('lastProductDetail', JSON.stringify({
                    productId: item.id,
                    cantidad: cantidad
                }));

                if (result.isConfirmed) {
                    // Ir a login
                    navigate('/login');
                } else {
                    // Ir a registro
                    navigate('/signup');
                }
            });
            return;
        }

        agregarAlCarrito({...item, price: numericPrice}, cantidad);
        
        Swal.fire({
            title: '¡Producto agregado!',
            text: `Se agregaron ${cantidad} unidades de ${item.title} al carrito`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#38bdf8',
            cancelButtonColor: '#4F46E5',
            confirmButtonText: 'Ir al carrito',
            cancelButtonText: 'Seguir comprando',
            background: '#fff',
            customClass: {
                popup: 'rounded-lg shadow-xl border-2 border-gray-100',
                title: 'text-xl font-bold text-gray-800',
                content: 'text-gray-600',
                confirmButton: 'rounded-md text-white font-semibold px-6 py-2 transition-all hover:opacity-90',
                cancelButton: 'rounded-md text-white font-semibold px-6 py-2 transition-all hover:opacity-90'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/Carrito');
            }
        });
    };

    // Verificar si hay un producto pendiente después del login/registro
    useEffect(() => {
        if (user) {
            const pendingProduct = localStorage.getItem('lastProductDetail');
            if (pendingProduct) {
                const { productId, cantidad } = JSON.parse(pendingProduct);
                if (productId === item.id) {
                    handleAgregarAlCarrito();
                    localStorage.removeItem('lastProductDetail');
                }
            }
        }
    }, [user]);

    return (
        <div className="item-detail-container">
            <button onClick={handleVolver} className="back-button">
                <i className="ri-arrow-left-line"></i> Volver
            </button>
            <div className="item-detail-content">
                {/* Sección de imagen */}
                <div className="item-detail-image">
                    <img src={item.image} alt={item.title} />
                </div>

                {/* Sección de información y controles */}
                <div className="item-detail-info">
                    <h1 className="item-detail-title">{item.title}</h1>
                    <p className="item-detail-description">{item.description}</p>
                    <p className="item-detail-category">
                        Categoría: {toCapital(item.category)}
                    </p>
                    <p className="item-detail-price">
                        ${numericPrice.toLocaleString()}
                    </p>

                    {/* Componente contador y control de compra */}
                    <ItemCount
                        cantidad={cantidad}
                        handleSumar={handleSumar}
                        handleRestar={handleRestar}
                        handleAgregar={handleAgregarAlCarrito}
                        price={numericPrice}
                    />
                </div>
            </div>
        </div>
    )
}

export default ItemDetail