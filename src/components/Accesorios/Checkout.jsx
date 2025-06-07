import React, { useContext, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import './Checkout.css';

const Checkout = () => {
    // Estado para almacenar el ID del pedido una vez procesado
    const [pedidoId, setPedidoId] = useState("");
    
    // Obtenemos las funciones y datos necesarios del contexto del carrito
    const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);
    
    // Configuración del formulario usando react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm();

    const comprar = async (data) => {
        try {
            // Creamos el objeto pedido con toda la información necesaria
            const pedido = {
                cliente: data,
                productos: carrito,
                total: precioTotal(),
                fecha: new Date().toISOString()
            }

            // Guardamos el pedido en Firestore
            const pedidosRef = collection(db, "pedidos");
            const doc = await addDoc(pedidosRef, pedido);
            setPedidoId(doc.id);
            vaciarCarrito();
        } catch (error) {
            console.error("Error al procesar la compra:", error);
        }
    }

    // Si ya se procesó el pedido, mostramos el mensaje de confirmación
    if (pedidoId) {
        return (
            <div className="checkout-container">
                <div className="checkout-exito">
                    <h1 className="exito-titulo">¡Gracias por tu compra!</h1>
                    <p className="exito-mensaje">Tu pedido ha sido procesado con éxito</p>
                    <div className="exito-pedido">
                        Número de pedido: {pedidoId}
                    </div>
                </div>
            </div>
        )
    }

    // Renderizamos el formulario de checkout
    return (
        <div className="checkout-container">
            <h1 className="checkout-titulo">Finalizar Compra</h1>
            
            <div className="checkout-form">
                <form onSubmit={handleSubmit(comprar)}>
                    {/* Campo de nombre */}
                    <div className="form-grupo">
                        <label className="form-label" htmlFor="nombre">Nombre completo</label>
                        <input
                            type="text"
                            id="nombre"
                            className="form-input"
                            placeholder="Ingresa tu nombre completo"
                            {...register("nombre", { required: true })}
                        />
                        {errors.nombre && <span className="error-mensaje">Este campo es requerido</span>}
                    </div>

                    {/* Campo de email con validación */}
                    <div className="form-grupo">
                        <label className="form-label" htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder="correo@ejemplo.com"
                            {...register("email", { 
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                            })}
                        />
                        {errors.email && <span className="error-mensaje">Ingresa un correo válido</span>}
                    </div>

                    {/* Campo de teléfono */}
                    <div className="form-grupo">
                        <label className="form-label" htmlFor="telefono">Teléfono</label>
                        <input
                            type="tel"
                            id="telefono"
                            className="form-input"
                            placeholder="Ingresa tu número de teléfono"
                            {...register("telefono", { required: true })}
                        />
                        {errors.telefono && <span className="error-mensaje">Este campo es requerido</span>}
                    </div>

                    {/* Resumen de la compra */}
                    <div className="checkout-resumen">
                        <h3 className="resumen-titulo">Resumen de la compra</h3>
                        {carrito.map((item) => (
                            <div key={item.id} className="resumen-item">
                                <span>{item.title} x{item.cantidad}</span>
                                <span>${item.price * item.cantidad}</span>
                            </div>
                        ))}
                        <div className="resumen-total">
                            <span>Total</span>
                            <span>${precioTotal()}</span>
                        </div>
                    </div>

                    {/* Botón de confirmación */}
                    <button 
                        type="submit" 
                        className="btn-comprar"
                        disabled={carrito.length === 0}
                    >
                        Confirmar Compra
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Checkout;