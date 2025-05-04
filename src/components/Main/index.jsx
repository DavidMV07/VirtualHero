import { Routes, Route, Navigate } from 'react-router-dom';
import './Main.css';
import ChatOnline from '../ChatOnline';
import Contact from '../Contact';
import ProductCRUD from '../ProductCRUD';
import ProductList from '../Accesorios/Productos';
import Home from '../Home';

function Main() {
  return (
    <main className="Main">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Accesorios" element={<ProductList />} />
          <Route path="/ProductCRUD" element={<ProductCRUD />} />
          <Route path="/Contact" element={<Contact />} />
          {/* Redirige rutas no reconocidas */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ChatOnline />
      </div>
    </main>
  );
}

export default Main;
