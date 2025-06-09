import React, { useState } from "react";
import { FaTools, FaShieldAlt, FaDatabase, FaNetworkWired, FaBroom, FaUserCog } from "react-icons/fa";
import "./index.css";

const services = [
  {
    icon: <FaTools size={40} />,
    title: "Soporte Técnico",
    description: "Solución de problemas en computadoras, laptops y periféricos.",
    details: {
      descripcion: "Servicio completo de soporte técnico para resolver cualquier problema con tu equipo.",
      incluye: [
        "Diagnóstico completo del sistema",
        "Solución de problemas de hardware y software",
        "Optimización del rendimiento",
        "Eliminación de malware y virus",
        "Actualización de drivers y sistema operativo"
      ],
      precio: "Desde $180.000",
      duracion: "1-3 horas aproximadamente",
      garantia: "30 días en el servicio"
    }
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: "Seguridad Informática",
    description: "Protección de datos, instalación de antivirus y firewalls.",
    details: {
      descripcion: "Protección integral para tu equipo contra amenazas digitales.",
      incluye: [
        "Instalación de antivirus profesional",
        "Configuración de firewall",
        "Análisis de vulnerabilidades",
        "Respaldo de información crítica",
        "Configuración de protección en tiempo real"
      ],
      precio: "Desde $250.000",
      duracion: "2-4 horas aproximadamente",
      garantia: "1 año en licencias de software"
    }
  },
  {
    icon: <FaDatabase size={40} />,
    title: "Backup y Recuperación",
    description: "Respaldo y recuperación de datos perdidos o dañados.",
    details: {
      descripcion: "Servicio profesional de respaldo y recuperación de información.",
      incluye: [
        "Análisis del dispositivo de almacenamiento",
        "Recuperación de archivos eliminados",
        "Respaldo en la nube o dispositivo externo",
        "Recuperación de particiones dañadas",
        "Plan de respaldo automático"
      ],
      precio: "Desde $200.000",
      duracion: "Depende del volumen de datos",
      garantia: "Garantía de confidencialidad"
    }
  },
  {
    icon: <FaBroom size={40} />,
    title: "Mantenimiento",
    description: "Limpieza física y optimización de software.",
    details: {
      descripcion: "Mantenimiento completo para mantener tu equipo en óptimas condiciones.",
      incluye: [
        "Limpieza física de componentes",
        "Cambio de pasta térmica",
        "Limpieza de registros y archivos temporales",
        "Desfragmentación de disco",
        "Optimización del sistema operativo"
      ],
      precio: "Desde $150.000",
      duracion: "2-3 horas aproximadamente",
      garantia: "3 meses en el servicio"
    }
  },
  {
    icon: <FaNetworkWired size={40} />,
    title: "Redes",
    description: "Configuración de WiFi, routers y cableado de red.",
    details: {
      descripcion: "Servicios completos de configuración y optimización de redes.",
      incluye: [
        "Instalación de routers y switches",
        "Configuración de red WiFi",
        "Optimización de señal",
        "Instalación de cableado estructurado",
        "Configuración de seguridad de red"
      ],
      precio: "Desde $300.000",
      duracion: "Depende de la complejidad",
      garantia: "6 meses en instalaciones"
    }
  },
  {
    icon: <FaUserCog size={40} />,
    title: "Asesoría Personalizada",
    description: "Recomendaciones tecnológicas según tu necesidad.",
    details: {
      descripcion: "Asesoramiento experto para todas tus necesidades tecnológicas.",
      incluye: [
        "Evaluación de necesidades",
        "Recomendación de equipos y componentes",
        "Planificación de actualizaciones",
        "Consultoría de software",
        "Capacitación básica"
      ],
      precio: "Desde $100.000",
      duracion: "1 hora por sesión",
      garantia: "Satisfacción garantizada"
    }
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleCloseDetails = () => {
    setSelectedService(null);
  };

  return (
    <section className="services-section">
      <h2 className="services-title">Nuestros Servicios</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="service-card" 
            tabIndex="0" 
            aria-label={service.title}
            role="article"
          >
            <div className="service-icon" aria-hidden="true">{service.icon}</div>
            <h3 className="service-card-title">{service.title}</h3>
            <p className="service-card-desc">{service.description}</p>
            <button 
              className="service-details-btn"
              onClick={() => handleServiceClick(service)}
            >
              Ver más
            </button>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="service-details-modal">
          <div className="modal-content">
            <button className="modal-close" onClick={handleCloseDetails}>&times;</button>
            <div className="modal-header">
              <div className="modal-icon">{selectedService.icon}</div>
              <h3>{selectedService.title}</h3>
            </div>
            <div className="modal-body">
              <p className="modal-description">{selectedService.details.descripcion}</p>
              
              <div className="service-info-grid">
                <div className="info-item">
                  <h4>Precio</h4>
                  <p>{selectedService.details.precio}</p>
                </div>
                <div className="info-item">
                  <h4>Duración</h4>
                  <p>{selectedService.details.duracion}</p>
                </div>
                <div className="info-item">
                  <h4>Garantía</h4>
                  <p>{selectedService.details.garantia}</p>
                </div>
              </div>

              <div className="service-includes">
                <h4>El servicio incluye:</h4>
                <ul>
                  {selectedService.details.incluye.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}