import './Header.css';
import { useEffect } from 'react';
import { useCategory } from '../../Context/CategoryContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { setSelectedCategory } = useCategory();
  const navigate = useNavigate();

  useEffect(() => {
    const menu = document.querySelector('#menu-icon');
    const barraNav = document.querySelector('.Barra__Nav');

    if (menu && barraNav) {
      menu.onclick = () => {
        menu.classList.toggle('bx-x');
        barraNav.classList.toggle('open');
      };
    }
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate('/Accesorios');
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  return (
    <header className="Header">
      <img src="LOGO.png" alt="Logo de la Empresa" className="Barra__Img" />
      <ul className="Barra__Nav">
        <li>
          <a href="../Home">
            <i className="ri-home-4-fill"></i> Home
          </a>
        </li>
        <li className="dropdown">
          <button className="dropbtn">
            <i className="ri-category-fill"></i> Categoría
          </button>
          <div className="dropdown-content">
            <a onClick={() => handleCategoryClick("Periféricos")}>Periféricos</a>
            <a onClick={() => handleCategoryClick("Audio")}>Audio</a>
            <a onClick={() => handleCategoryClick("Pantallas")}>Pantallas</a>
            <a onClick={() => handleCategoryClick("Mobiliario")}>Mobiliario</a>
            <a onClick={() => handleCategoryClick("Computadores")}>Computadores</a>
            <a onClick={() => handleCategoryClick("Almacenamiento")}>Almacenamiento</a>
          </div>
        </li>
        <li>
          <a href="../Accesorios">
            <i className="ri-store-3-fill"></i> Accessories
          </a>
        </li>
        <li>
          <a href="/ProductCRUD">
            <i className="ri-admin-fill"></i> Admin
          </a>
        </li>
        <li>
          <a href="../">
            <i className="ri-service-fill"></i> Service
          </a>
        </li>
        <li>
          <a href="../Contact">
            <i className="ri-contacts-fill"></i> Contact
          </a>
        </li>
      </ul>
      <div className="Login">
        <a className="User" onClick={handleLoginClick}>
          <button className="ri-user-3-fill"></button> Inicia Sesión
        </a>
        <a className="Register" onClick={() => (window.location.href = '/signup')}>
          <button className="ri-user-add-fill"></button> Registrarse
        </a>
        <div className="bx bx-menu" id="menu-icon"></div>
      </div>
    </header>
  );
};

export default Header;