import { Routes, Route } from 'react-router-dom';
import "./Main.css";
import Chatbot from "../ChatOnline";
import Contact from "../Contact";
import ProductCRUD from "../Crud/Index";
import ProductList from "../Accesorios/Productos";
import Home from "../Home";

function Main() {
  return (
      <main className="Main">
        <div className="container">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Accesorios" element={<ProductList />} />
            <Route path="/servicios" element={<ProductCRUD />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
          <Chatbot />
        </div>
      </main>
  );
}

export default Main;
