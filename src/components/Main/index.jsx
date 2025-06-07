import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './Main.css';
import ChatOnline from '../ChatOnline';
import Contact from '../Contact';
import ProductCRUD from '../ProductCRUD';
import ProductosList from '../Accesorios/Productos';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Home from '../Home';
import Services from '../Services';

function Main() {
  const location = useLocation(); // Obtiene la ruta actual

  return (
    <>
      <main className={`Main${location.pathname === '/login' || location.pathname === '/signup' ? 'login' : ''}`}>
        <div className="container__Main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Accesorios" element={<ProductosList />} />
            <Route path="/ProductCRUD" element={<ProductCRUD />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            {/* Redirige rutas no reconocidas */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          {location.pathname !== '/login' && location.pathname !== '/signup' && <ChatOnline />}
        </div>
      </main>
    </>
  );
}

export default Main;
