import "./Reset.css";
import "./App.css";
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Header from "./components/Header"; 
import Carrito from "./components/Accesorios/Carrito";
import Checkout from "./components/Accesorios/Checkout";
import Admin from "./components/Admin";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Product from "./components/Accesorios/Productos";
import ItemDetailContainer from "./components/Accesorios/ItemDetailContainer";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chatbot from "./components/ChatOnline";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="Custom">  
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ProductCRUD" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/Services" element={<Services />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Product/:id" element={<ItemDetailContainer />} />
            <Route path="/Carrito" element={<Carrito />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Accesorios" element={<Product />} />
            <Route path="/Accesorios/:categoria" element={<Product />} />
          </Routes>
          <Chatbot />
          <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;