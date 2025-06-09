import { createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const { user } = useAuth();
    const [carrito, setCarrito] = useState([]);

    // Cargar el carrito cuando cambia el usuario
    useEffect(() => {
        if (user) {
            const carritoGuardado = localStorage.getItem(`carrito_${user.uid}`);
            setCarrito(carritoGuardado ? JSON.parse(carritoGuardado) : []);
        } else {
            // Si no hay usuario, el carrito está vacío
            setCarrito([]);
        }
    }, [user]);

    const agregarAlCarrito = (item, cantidad) => {
        if (!user) return; // No agregar si no hay usuario

        const itemAgregado = { ...item, cantidad };
        const nuevoCarrito = [...carrito];
        const estaEnElCarrito = nuevoCarrito.find((producto) => producto.id === itemAgregado.id);

        if (estaEnElCarrito) {
            estaEnElCarrito.cantidad += cantidad;
        } else {
            nuevoCarrito.push(itemAgregado);
        }
        setCarrito(nuevoCarrito);
    }

    const cantidadEnCarrito = () => {
        return carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    }

    const precioTotal = () => {
        return carrito.reduce((acc, prod) => {
            const precio = typeof prod.price === 'string' ? 
                Number(prod.price.replace(/[^0-9.-]+/g, "")) : 
                Number(prod.price);
            return acc + (precio * prod.cantidad);
        }, 0);
    }

    const vaciarCarrito = () => {
        setCarrito([]);
        if (user) {
            localStorage.removeItem(`carrito_${user.uid}`);
        }
    }

    // Guardar el carrito cuando cambia
    useEffect(() => {
        if (user) {
            localStorage.setItem(`carrito_${user.uid}`, JSON.stringify(carrito));
        }
    }, [carrito, user]);
    
    return (
        <CartContext.Provider value={ {
            carrito,
            agregarAlCarrito,
            cantidadEnCarrito,
            precioTotal,
            vaciarCarrito
        } }>
            {children}
        </CartContext.Provider>
    )
}