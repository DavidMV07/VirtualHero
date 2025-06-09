import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      // Crear una referencia a la colección 'mensajes' en Firebase
      const mensajesRef = collection(db, "mensajes");

      // Crear el objeto del mensaje con la fecha
      const mensaje = {
        ...form,
        fecha: new Date().toISOString(),
        estado: "pendiente"
      };

      // Guardar el mensaje en Firebase
      await addDoc(mensajesRef, mensaje);

      // Mostrar mensaje de éxito
      setSuccess("¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.");
      
      // Limpiar el formulario
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setError("Error al enviar el mensaje. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <h1>Contáctanos</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Nombre:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={form.name} 
            onChange={handleChange}
            placeholder="Ingresa tu nombre completo"
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="message">Mensaje:</label>
          <textarea 
            id="message" 
            name="message" 
            value={form.message} 
            onChange={handleChange}
            placeholder="¿En qué podemos ayudarte?"
            required
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar Mensaje"}
        </button>
        
        {success && <div className="contact-success">{success}</div>}
        {error && <div className="contact-error">{error}</div>}
      </form>
    </div>
  );
}

export default Contact;