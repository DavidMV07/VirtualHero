import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./Admin.css";

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const messagesRef = collection(db, "mensajes");
            const snapshot = await getDocs(messagesRef);
            const messagesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            // Ordenar mensajes por fecha, más recientes primero
            messagesData.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            
            setMessages(messagesData);
        } catch (error) {
            console.error("Error al cargar mensajes:", error);
            setError("Error al cargar los mensajes");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (messageId, newStatus) => {
        try {
            const messageRef = doc(db, "mensajes", messageId);
            await updateDoc(messageRef, {
                estado: newStatus
            });
            // Actualizar la lista de mensajes
            fetchMessages();
        } catch (error) {
            console.error("Error al actualizar estado:", error);
        }
    };

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <h2>Cargando mensajes...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-error">
                <h2>{error}</h2>
                <button onClick={fetchMessages}>Reintentar</button>
            </div>
        );
    }

    return (
        <div className="messages-container">
            <h2>Mensajes de Contacto</h2>
            
            {messages.length === 0 ? (
                <p className="no-messages">No hay mensajes nuevos</p>
            ) : (
                <div className="messages-grid">
                    {messages.map((message) => (
                        <div 
                            key={message.id} 
                            className={`message-card ${message.estado}`}
                        >
                            <div className="message-header">
                                <h3>{message.name}</h3>
                                <span className="message-date">
                                    {formatDate(message.fecha)}
                                </span>
                            </div>
                            <div className="message-content">
                                <p><strong>Email:</strong> {message.email}</p>
                                <p><strong>Mensaje:</strong></p>
                                <p className="message-text">{message.message}</p>
                            </div>
                            <div className="message-footer">
                                <span className={`status-badge ${message.estado}`}>
                                    {message.estado}
                                </span>
                                <div className="message-actions">
                                    {message.estado === "pendiente" && (
                                        <button 
                                            onClick={() => handleStatusChange(message.id, "respondido")}
                                            className="btn-responder"
                                        >
                                            Marcar como respondido
                                        </button>
                                    )}
                                    {message.estado === "respondido" && (
                                        <button 
                                            onClick={() => handleStatusChange(message.id, "pendiente")}
                                            className="btn-pendiente"
                                        >
                                            Marcar como pendiente
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContactMessages;