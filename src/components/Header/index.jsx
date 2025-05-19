import './Header.css';
//import { useCategory } from '../../Context/CategoryContext';
//import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleLinkClick = () => {
    // Puedes agregar aquí la lógica para marcar como activo el link si lo necesitas
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <a href="#" className="header__logo">Virtual Hero</a>

      <ion-icon
        name="menu-outline"
        className="header__toggle"
        id="nav-toggle"
        onClick={handleToggleMenu}
      ></ion-icon>

      <nav className={`nav${menuOpen ? ' show' : ''}`} id="nav-menu">
        <div className="nav__content bd-grid">
          <ion-icon
            name="close-outline"
            className="nav__close"
            id="nav-close"
            onClick={handleCloseMenu}
          ></ion-icon>
          <div className="nav__perfil">
            <div className="nav__img">
              <img src="LOGO.png" alt="Logo de la Empresa" />
            </div>
            <div>
              <a href="" className="nav__name">Virtual Hero</a>
            </div>
          </div>
          <div className="nav__menu">
            <ul className="nav__list">
              <li className="nav__item"><a href="../Home" className="nav__link active" onClick={handleLinkClick}><i className="ri-home-4-fill"></i>Home</a></li>
              <li className="nav__item"><a href="../Accesorios" className="nav__link" onClick={handleLinkClick}><i className="ri-store-3-fill"></i>Accessories</a></li>
              <li className="nav__item"><a href="../ProductCRUD" className="nav__link" onClick={handleLinkClick}><i className="ri-admin-fill"></i>Admin</a></li>
              <li className="nav__item"><a href="../Services" className="nav__link" onClick={handleLinkClick}><i className="ri-service-fill"></i>Services</a></li>
              <li className="nav__item"><a href="../Contact" className="nav__link" onClick={handleLinkClick}><i className="ri-contacts-fill"></i>Contact</a></li>
            </ul>
          </div>
          <div className="nav__social">
            <a className="nav__social-icon" onClick={handleLoginClick}>
              <button className="ri-user-3-fill"></button>Login
            </a>
            <a className="nav__social-icon" onClick={() => (window.location.href = '/signup')}>
              <button className="ri-user-add-fill"></button>Register
            </a>
          </div>
        </div>

      </nav>

    </header>
  );
};

export default Header;



//const { setSelectedCategory } = useCategory();
//  const navigate = useNavigate();
//  const handleCategoryClick = (category) => {
//    setSelectedCategory(category);
//    navigate('/Accesorios');
//  };
//       <li className="dropdown">
//         <button className="dropbtn">
//          <i className="ri-menu-search-line"></i>Category
//         </button>
//         <div className="dropdown-content">
//          <a onClick={() => handleCategoryClick("Periféricos")}>Periféricos</a>
//          <a onClick={() => handleCategoryClick("Audio")}>Audio</a>
//          <a onClick={() => handleCategoryClick("Pantallas")}>Pantallas</a>
//          <a onClick={() => handleCategoryClick("Mobiliario")}>Mobiliario</a>
//          <a onClick={() => handleCategoryClick("Computadores")}>Computadores</a>
//          <a onClick={() => handleCategoryClick("Almacenamiento")}>Almacenamiento</a>
//        </div>
//      </li>