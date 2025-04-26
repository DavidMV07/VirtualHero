import "./Contact.css";

function Contact() {
    return (
        <div className="contact-container">
        <h1 className="contact-title">Contáctanos</h1>
        <form className="contact-form">
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" required />
    
            <label htmlFor="email">Correo electrónico:</label>
            <input type="email" id="email" name="email" required />
    
            <label htmlFor="message">Mensaje:</label>
            <textarea id="message" name="message" required></textarea>
    
            <button type="submit">Enviar</button>
        </form>
        </div>
    );
}

export default Contact;