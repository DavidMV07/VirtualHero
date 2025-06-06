import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("¡Mensaje enviado correctamente!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(data.message || "Error al enviar el mensaje");
      }
    } catch {
      setError("Error de conexión");
    }
  };

  return (
    <div className="contact-container">
      <h1>Contáctanos</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />

        <label htmlFor="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />

        <label htmlFor="message">Mensaje:</label>
        <textarea id="message" name="message" value={form.message} onChange={handleChange} required></textarea>

        <button type="submit">Enviar</button>
        {success && <div className="contact-success">{success}</div>}
        {error && <div className="contact-error">{error}</div>}
      </form>
    </div>
  );
}

export default Contact;