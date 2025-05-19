import "./Reset.css";
import "./App.css";
import { BrowserRouter } from 'react-router-dom';
import Main from "./components/Main";
import { CategoryProvider } from "./Context/CategoryContext";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="Custom">
      <CategoryProvider>
        <BrowserRouter>
          {/* Renderiza el Header solo si no estás en la página de login o signup */}
          {location.pathname !== '/login' && location.pathname !== '/signup' && <Header />}
          <Main />
          {location.pathname !== '/login' && location.pathname !== '/signup' }
          <Footer />
        </BrowserRouter>
      </CategoryProvider>
      
    </div>
  );
}

export default App;
