import './Header.css';
import { useState } from 'react';
import CartWidget from '../Accesorios/CartWidget';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [dropdownCategoriasAbierto, setDropdownCategoriasAbierto] = useState(false);
  const { user, userRole, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate('/login');
  };

  const handleCerrarSesion = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleClickEnlace = () => {
    setMenuAbierto(false);
  };

  const handleClickCategoria = (categoria) => {
    console.log("Navegando a categoría:", categoria);
    if (categoria === "Todos") {
      navigate('/Accesorios');
    } else {
      navigate(`/Accesorios/${categoria}`);
    }
    setMenuAbierto(false);
    setDropdownCategoriasAbierto(false);
  };

  const obtenerNombreUsuario = () => {
    if (userProfile && userProfile.firstName && userProfile.lastName) {
      return `${userProfile.firstName} ${userProfile.lastName}`;
    }
    return user?.email || '';
  };

  const obtenerIniciales = () => {
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

      <nav className={`nav__links${menuAbierto ? ' show' : ''}`} id="nav-menu">
        <Link to="/" className='nav__item' onClick={handleClickEnlace}>
          <i className="ri-home-4-fill"></i> Inicio
        </Link>
        <div className="dropdown">
          <button className="nav__item dropdown-btn" onClick={() => setDropdownCategoriasAbierto(!dropdownCategoriasAbierto)}>
            <i className="ri-store-3-fill"></i> Accesorios ▾
          </button>
          {dropdownCategoriasAbierto && (
            <ul className={`dropdown-content${dropdownCategoriasAbierto ? ' show' : ''}`}>
              <li><button className="category-btn" onClick={() => handleClickCategoria("Todos")}>Todos</button></li>
              <li><button className="category-btn" onClick={() => handleClickCategoria("Periféricos")}>Periféricos</button></li>
              <li><button className="category-btn" onClick={() => handleClickCategoria("Audio")}>Audio</button></li>
              <li><button className="category-btn" onClick={() => handleClickCategoria("Pantallas")}>Pantallas</button></li>
              <li><button className="category-btn" onClick={() => handleClickCategoria("Mobiliario")}>Mobiliario</button></li>
              <li><button className="category-btn" onClick={() => handleClickCategoria("Computadores")}>Computadores</button></li>
              <li><button className="category-btn" onClick={() => handleClickCategoria("Almacenamiento")}>Almacenamiento</button></li>
            </ul>
          )}
        </div>
        {userRole === 'admin' && (
          <Link to="/ProductCRUD" className="nav__item" onClick={handleClickEnlace}>
            <i className="ri-admin-fill"></i> Administrar
          </Link>
        )}
        <Link to="/Services" className="nav__item" onClick={handleClickEnlace}>
          <i className="ri-service-fill"></i> Servicios
        </Link>
        <Link to="/Contact" className="nav__item" onClick={handleClickEnlace}>
          <i className="ri-contacts-fill"></i> Contacto
        </Link>
        <div className="nav__item">
          <CartWidget />
        </div>
      </nav>

      <div className="auth-buttons desktop-only">
        {user ? (
          <div className="user-info">
            <span className="user-avatar">{obtenerIniciales()}</span>
            <span className="user-name">{obtenerNombreUsuario()}</span>
            {userRole === 'admin' && <span className="user-role">Admin</span>}
            <button className="logout-btn" onClick={handleCerrarSesion}>Salir</button>
          </div>
        ) : (
          <>
            <a className='ri-user-3-fill btn User__Login' onClick={handleClickLogin}>
              <span className='Span__Users'>Iniciar sesión</span>
            </a>
            <a className='ri-user-add-fill btn User__Register' onClick={() => navigate('/signup')}>
              <span className='Span__Users'>Registrarse</span>
            </a>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;