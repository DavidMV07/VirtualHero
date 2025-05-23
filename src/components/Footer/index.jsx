import './index.css';

function Footer () {
  return(
<footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4 className="footer-logo">VirtualHero</h4>
          <p>Soluciones en mantenimiento y accesorios para PC.</p>
        </div>
        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="/accesorios">Accesorios</a></li>
            <li><a href="/servicio">Servicio</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <ul>
            <li>📧 virtualhero@email.com</li>
            <li>📞 +57 310 123 4567</li>
            <li>📍 Cali, Colombia</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} VirtualHero. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;

