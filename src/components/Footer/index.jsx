import './index.css';

function Footer () {
  return(
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 CodeTech Compañy. Todos los derechos reservados.</p>
        <nav className="footer-nav" aria-label="Enlaces del pie de página">
          <ul>
            <li><a href="../Home">Inicio</a></li>
            <li><a href="#">Acerca de</a></li>
            <li><a href="#">Servicios</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;