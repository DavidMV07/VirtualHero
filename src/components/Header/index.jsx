import './Header.css';
import { useState } from 'react';
import CartWidget from '../Accesorios/CartWidget';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const { user, userRole, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    console.log("Navegando a categoría:", category);
    if (category === "Todos") {
      navigate('/Accesorios');
    } else {
      navigate(`/Accesorios/${category}`);
    }
    setMenuOpen(false);
    setCategoryDropdownOpen(false);
  };

  const getUserDisplayName = () => {
    if (userProfile && userProfile.firstName && userProfile.lastName) {
      return `${userProfile.firstName} ${userProfile.lastName}`;
    }
    return user?.email || '';
  };

  const getInitials = () => {
    if (userProfile && userProfile.firstName && userProfile.lastName) {
      return `${userProfile.firstName[0]}${userProfile.lastName[0]}`.toUpperCase();
    }
    return user?.email[0].toUpperCase() || '';
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
              <li><button className="category-btn" onClick={() => handleCategoryClick("Todos")}>Todos</button></li>
              <li><button className="category-btn" onClick={() => handleCategoryClick("Periféricos")}>Periféricos</button></li>
              <li><button className="category-btn" onClick={() => handleCategoryClick("Audio")}>Audio</button></li>
              <li><button className="category-btn" onClick={() => handleCategoryClick("Pantallas")}>Pantallas</button></li>
              <li><button className="category-btn" onClick={() => handleCategoryClick("Mobiliario")}>Mobiliario</button></li>
              <li><button className="category-btn" onClick={() => handleCategoryClick("Computadores")}>Computadores</button></li>
              <li><button className="category-btn" onClick={() => handleCategoryClick("Almacenamiento")}>Almacenamiento</button></li>
            </ul>
          )}
        </div>
        {userRole === 'admin' && (
          <Link to="/ProductCRUD" className="nav__item" onClick={handleLinkClick}>
            <i className="ri-admin-fill"></i> Admin
          </Link>
        )}
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
        {user ? (
          <div className="user-info">
            <span className="user-avatar">{getInitials()}</span>
            <span className="user-name">{getUserDisplayName()}</span>
            {userRole === 'admin' && <span className="user-role">Admin</span>}
            <button className="logout-btn" onClick={handleLogout}>Salir</button>
          </div>
        ) : (
          <>
            <a className='ri-user-3-fill btn User__Login' onClick={handleLoginClick}>
              <span className='Span__Users'>Log in</span>
            </a>
            <a className='ri-user-add-fill btn User__Register' onClick={() => navigate('/signup')}>
              <span className='Span__Users'>Sign up</span>
            </a>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;