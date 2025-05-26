import './Header.css';
import { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

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
    setMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    console.log("Categoría seleccionada:", category);
    // Aquí podés redirigir si usás useNavigate
    window.location.href = `/Accesorios?cat=${category}`;
    setMenuOpen(false);
    setCategoryDropdownOpen(false);
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
              <a href="#" className="nav__name">Virtual Hero</a>
            </div>
          </div>

          <div className="nav__menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="../Home" className="nav__link active" onClick={handleLinkClick}>
                  <i className="ri-home-4-fill"></i> Home
                </a>
              </li>

              {/* Accessories con Dropdown */}
              <li className="nav__item dropdown">
                <button
                  className="nav__link dropdown-btn"
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                >
                  <i className="ri-store-3-fill"></i> Accessories ▾
                </button>
                {categoryDropdownOpen && (
                  <ul className="dropdown-content">
                    <li><a onClick={() => handleCategoryClick("Todos")}>Todos</a></li>
                    <li><a onClick={() => handleCategoryClick("Periféricos")}>Periféricos</a></li>
                    <li><a onClick={() => handleCategoryClick("Audio")}>Audio</a></li>
                    <li><a onClick={() => handleCategoryClick("Pantallas")}>Pantallas</a></li>
                    <li><a onClick={() => handleCategoryClick("Mobiliario")}>Mobiliario</a></li>
                    <li><a onClick={() => handleCategoryClick("Computadores")}>Computadores</a></li>
                    <li><a onClick={() => handleCategoryClick("Almacenamiento")}>Almacenamiento</a></li>
                  </ul>
                )}
              </li>

              <li className="nav__item">
                <a href="../ProductCRUD" className="nav__link" onClick={handleLinkClick}>
                  <i className="ri-admin-fill"></i> Admin
                </a>
              </li>
              <li className="nav__item">
                <a href="../Services" className="nav__link" onClick={handleLinkClick}>
                  <i className="ri-service-fill"></i> Services
                </a>
              </li>
              <li className="nav__item">
                <a href="../Contact" className="nav__link" onClick={handleLinkClick}>
                  <i className="ri-contacts-fill"></i> Contact
                </a>
              </li>
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