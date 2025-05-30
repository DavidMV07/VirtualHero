import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <section className="welcome-section">
        <h1>Bienvenido a <span>Virtual Hero</span></h1>
        <p>
          Tu tienda de tecnología de confianza. Encuentra productos informáticos y servicios de mantenimiento para todas tus necesidades tecnológicas.
        </p>
      </section>

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
