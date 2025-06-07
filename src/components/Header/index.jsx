import './Header.css';
import { useState, useEffect } from 'react';
import CartWidget from '../Accesorios/CartWidget';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, []);

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    window.location.href = '/login';
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    window.location.href = `/Accesorios?cat=${category}`;
    setMenuOpen(false);
    setCategoryDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className='Logo__Section'>
        <img src="/LOGO.png" alt="Logo de la Empresa" className='Logo'/>
        <span className='brand__name'>Virtual Hero</span>
      </div>
      <input type="checkbox" id="menu__toggle" className="menu__toggle" />
      <label htmlFor="menu__toggle" className="Menucheck">&#9776;</label>

      <nav className={`nav__links${menuOpen ? ' show' : ''}`} id="nav-menu">
        <Link to="/" className='nav__item' onClick={handleLinkClick}>
          <i className="ri-home-4-fill"></i> Home
        </Link>
        <div className="dropdown">
          <button className="nav__item dropdown-btn" onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}>
            <i className="ri-store-3-fill"></i> Accessories ▾
          </button>
          {categoryDropdownOpen && (
            <ul className={`dropdown-content${categoryDropdownOpen ? ' show' : ''}`}>
              <li><Link to="/Accesorios" onClick={() => handleCategoryClick("Todos")}>Todos</Link></li>
              <li><Link to="/Accesorios" onClick={() => handleCategoryClick("Periféricos")}>Periféricos</Link></li>
              <li><Link to="/Accesorios" onClick={() => handleCategoryClick("Audio")}>Audio</Link></li>
              <li><Link to="/Accesorios" onClick={() => handleCategoryClick("Pantallas")}>Pantallas</Link></li>
              <li><Link to="/Accesorios" onClick={() => handleCategoryClick("Mobiliario")}>Mobiliario</Link></li>
              <li><Link to="/Accesorios" onClick={() => handleCategoryClick("Computadores")}>Computadores</Link></li>
              <li><Link to="/Accesorios" onClick={() => handleCategoryClick("Almacenamiento")}>Almacenamiento</Link></li>
            </ul>
          )}
        </div>
        <Link to="/ProductCRUD" className="nav__item" onClick={handleLinkClick}>
          <i className="ri-admin-fill"></i> Admin
        </Link>
        <Link to="/Services" className="nav__item" onClick={handleLinkClick}>
          <i className="ri-service-fill"></i> Services
        </Link>
        <Link to="/Contact" className="nav__item" onClick={handleLinkClick}>
          <i className="ri-contacts-fill"></i> Contact
        </Link>
        <div className="nav__item">
          <CartWidget />
        </div>
      </nav>

      <div className="auth-buttons desktop-only">
        {userEmail ? (
          <div className="user-info">
            <span className="user-avatar">{userEmail[0].toUpperCase()}</span>
            <span className="user-email">{userEmail}</span>
            <button className="logout-btn" onClick={handleLogout}>Salir</button>
          </div>
        ) : (
          <>
            <a className='ri-user-3-fill btn User__Login' onClick={handleLoginClick}>
              <span className='Span__Users'>Log in</span>
            </a>
            <a className='ri-user-add-fill btn User__Register' onClick={() => (window.location.href = '/signup')}>
              <span className='Span__Users'>Sign up</span>
            </a>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;