import React from "react";
import { FaTools, FaShieldAlt, FaDatabase, FaNetworkWired, FaBroom, FaUserCog } from "react-icons/fa";
import "./index.css";

const services = [
  {
    icon: <FaTools size={40} />,
    title: "Soporte Técnico",
    description: "Solución de problemas en computadoras, laptops y periféricos.",
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: "Seguridad Informática",
    description: "Protección de datos, instalación de antivirus y firewalls.",
  },
  {
    icon: <FaDatabase size={40} />,
    title: "Backup y Recuperación",
    description: "Respaldo y recuperación de datos perdidos o dañados.",
  },
  {
    icon: <FaBroom size={40} />,
    title: "Mantenimiento",
    description: "Limpieza física y optimización de software.",
  },
  {
    icon: <FaNetworkWired size={40} />,
    title: "Redes",
    description: "Configuración de WiFi, routers y cableado de red.",
  },
  {
    icon: <FaUserCog size={40} />,
    title: "Asesoría Personalizada",
    description: "Recomendaciones tecnológicas según tu necesidad.",
  },
];

export default function Services() {
  return (
    <section className="services-section">
      <h2 className="services-title">Nuestros Servicios</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card" tabIndex="0" aria-label={service.title}>
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-card-title">{service.title}</h3>
            <p className="service-card-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}