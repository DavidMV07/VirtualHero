import "./Home.css";
import { Link } from 'react-router-dom';
function Home() {

    const handleCategoryClick = (category) => {
    window.location.href = `/Accesorios?cat=${category}`;
    setMenuOpen(false);
    setCategoryDropdownOpen(false);
  };
  return (
    <div className="home-container">
      {/* Hero principal */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Bienvenido a <span className="brand">Virtual Hero</span>
          </h1>
          <p>
            Tu tienda de tecnología de confianza. Encuentra productos informáticos y servicios de mantenimiento para todas tus necesidades tecnológicas.
          </p>
          <a><Link to="/Accesorios" onClick={() => handleCategoryClick("Periféricos")} className="hero-btn">Explora Accesorios</Link></a>
        </div>
        <div className="hero-image">
          <img src="/images/ai-future.jpg" alt="Tecnología" />
        </div>
      </section>

      {/* Categorías destacadas */}
      <section className="categories-section">
        <h2>Categorías Destacadas</h2>
        <div className="categories-grid">
          <div className="category-card">
            <img src="/images/webcam.jpg" alt="Periféricos" />
            <span>Periféricos</span>
          </div>
          <div className="category-card">
            <img src="/images/headphones.jpg" alt="Audio" />
            <span>Audio</span>
          </div>
          <div className="category-card">
            <img src="/images/monitor.jpg" alt="Pantallas" />
            <span>Pantallas</span>
          </div>
          <div className="category-card">
            <img src="/images/chair.jpg" alt="Mobiliario" />
            <span>Mobiliario</span>
          </div>
        </div>
      </section>

      {/* Visión y Misión */}
      <section className="vision-mission-section">
        <div className="card vision-card">
          <h2>Visión</h2>
          <p>
            Ser la tienda líder en soluciones tecnológicas, reconocida por ofrecer productos de alta calidad y servicios de mantenimiento confiables, impulsando el crecimiento digital de nuestros clientes a través de la innovación y la excelencia.
          </p>
        </div>
        <div className="card mission-card">
          <h2>Misión</h2>
          <p>
            Ser el aliado principal de nuestros clientes en el mundo de la tecnología, ofreciendo productos informáticos de calidad, asesorías personalizadas y servicios confiables. Comprometidos con soluciones innovadoras que optimicen su experiencia digital.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;