import "./Home.css";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      {/* Hero principal */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Bienvenido a <span className="brand">Virtual Hero</span>
          </h1>
          <p>
            Tu destino tecnológico de confianza. Encuentra los mejores productos informáticos y servicios de mantenimiento para potenciar tu experiencia digital.
          </p>
          <div className="hero-buttons">
            <Link to="/Accesorios" className="hero-btn primary">Explorar Productos</Link>
            <Link to="/Services" className="hero-btn secondary">Ver Servicios</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/ai-future.jpg" alt="Tecnología" className="main-hero-image" />
        </div>
      </section>

      {/* Beneficios */}
      <section className="benefits-section">
        <h2>¿Por qué elegirnos?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <i className="ri-shield-check-fill"></i>
            <h3>Garantía Asegurada</h3>
            <p>1 año de garantía en todos nuestros productos</p>
          </div>
          <div className="benefit-card">
            <i className="ri-truck-fill"></i>
            <h3>Envío Rápido</h3>
            <p>Envío gratis en compras mayores a $800.000</p>
          </div>
          <div className="benefit-card">
            <i className="ri-customer-service-2-fill"></i>
            <h3>Soporte 24/7</h3>
            <p>Asistencia técnica y atención al cliente</p>
          </div>
          <div className="benefit-card">
            <i className="ri-secure-payment-fill"></i>
            <h3>Pago Seguro</h3>
            <p>Múltiples métodos de pago seguros</p>
          </div>
        </div>
      </section>

      {/* Categorías destacadas */}
      <section className="categories-section">
        <h2>Categorías Destacadas</h2>
        <div className="categories-grid">
          <Link to="/Accesorios/Periféricos" className="category-card">
            <div className="category-image">
              <img src="/images/webcam.jpg" alt="Periféricos" />
            </div>
            <div className="category-info">
              <span className="category-name">Periféricos</span>
              <p className="category-desc">Teclados, mouse y más</p>
            </div>
          </Link>
          <Link to="/Accesorios/Audio" className="category-card">
            <div className="category-image">
              <img src="/images/headphones.jpg" alt="Audio" />
            </div>
            <div className="category-info">
              <span className="category-name">Audio</span>
              <p className="category-desc">Auriculares y micrófonos</p>
            </div>
          </Link>
          <Link to="/Accesorios/Pantallas" className="category-card">
            <div className="category-image">
              <img src="/images/monitor.jpg" alt="Pantallas" />
            </div>
            <div className="category-info">
              <span className="category-name">Pantallas</span>
              <p className="category-desc">Monitores gaming y 4K</p>
            </div>
          </Link>
          <Link to="/Accesorios/Mobiliario" className="category-card">
            <div className="category-image">
              <img src="/images/chair.jpg" alt="Mobiliario" />
            </div>
            <div className="category-info">
              <span className="category-name">Mobiliario</span>
              <p className="category-desc">Sillas y escritorios gaming</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Servicios Destacados */}
      <section className="featured-services-section">
        <h2>Servicios Profesionales</h2>
        <div className="services-preview">
          <div className="service-preview-card">
            <i className="ri-tools-fill"></i>
            <h3>Mantenimiento Preventivo</h3>
            <p>Mantén tu equipo en óptimas condiciones con nuestro servicio de mantenimiento regular.</p>
            <Link to="/Services" className="service-link">Más información →</Link>
          </div>
          <div className="service-preview-card">
            <i className="ri-computer-fill"></i>
            <h3>Armado de PC</h3>
            <p>Diseñamos y ensamblamos el PC de tus sueños con componentes de alta calidad.</p>
            <Link to="/Services" className="service-link">Más información →</Link>
          </div>
          <div className="service-preview-card">
            <i className="ri-database-2-fill"></i>
            <h3>Respaldo de Datos</h3>
            <p>Protege tu información con nuestros servicios de backup y recuperación.</p>
            <Link to="/Services" className="service-link">Más información →</Link>
          </div>
        </div>
      </section>

      {/* Sección de Contacto Rápido */}
      <section className="quick-contact-section">
        <div className="quick-contact-content">
          <h2>¿Necesitas Ayuda?</h2>
          <p>Estamos aquí para asistirte en todo lo que necesites</p>
          <div className="contact-options">
            <Link to="/Contact" className="contact-btn">
              <i className="ri-message-3-fill"></i>
              Contáctanos
            </Link>
            <a href="tel:+573101234567" className="contact-btn">
              <i className="ri-phone-fill"></i>
              Llamar ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;