import "./Home.css";

function Home() {
  const video = document.querySelector('video');
  window.addEventListener('load', () => {
    video.play();
  });
  
  return ( 
    <div className="Home__container">
      <div className="Home__welcome">
        <h1>Bienvenido a Virtual Hero</h1>
        <p>
          Tu tienda de tecnología de confianza, donde encontrarás una amplia gama de productos informáticos y servicios de mantenimiento para satisfacer todas tus necesidades tecnológicas.
        </p>

      </div>
      <div className="Home__V&M">
        <div className="Home__Vision">
          <p>
              Visión:
              <br/>
              Nuestra visión es ser la tienda líder en soluciones tecnológicas, reconocida por ofrecer productos de alta calidad y servicios de mantenimiento confiables, impulsando el crecimiento digital de nuestros clientes a través de la innovación y la excelencia.
              Ser la tienda líder en soluciones tecnológicas, reconocida por ofrecer productos de alta calidad y servicios de mantenimiento confiables, impulsando el crecimiento digital de nuestros clientes a través de la innovación y la excelencia.
          </p>
        </div>
        <div className="Home__Mision">
          <p>
              Misión:
              <br/>
              Nuestra misión es ser el aliado principal de nuestros clientes en el mundo de la tecnología, ofreciendo productos informáticos de calidad, asesorías personalizadas y servicios de mantenimiento confiables. Nos comprometemos a proporcionar soluciones innovadoras y accesibles que optimicen la experiencia digital de nuestros clientes, asegurando un rendimiento óptimo de sus equipos y sistemas. Con un enfoque en el servicio al cliente y la excelencia técnica, trabajamos cada día para crear relaciones duraderas basadas en la confianza y el compromiso con la tecnología.
          </p>
        </div>
      </div>
    
    </div>
  );    
}

export default Home;