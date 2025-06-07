import "./Reset.css";
import "./App.css";
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Header from "./components/Header"; 
import Carrito from "./components/Accesorios/Carrito";
import Checkout from "./components/Accesorios/Checkout";
import ProductCRUD from "./components/ProductCRUD";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Product from "./components/Accesorios/Productos";
import ItemDetailContainer from "./components/Accesorios/ItemDetailContainer";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="Custom">  
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ProductCRUD" element={<ProductCRUD />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Product/:id" element={<ItemDetailContainer />} />
            <Route path="/Carrito" element={<Carrito />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Accesorios" element={<Product />} />
            <Route path="/Accesorios/:categoria" element={<Product />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;