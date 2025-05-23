import "./Reset.css";
import "./App.css";
import { BrowserRouter } from 'react-router-dom';
import Header from "./components/Header"; 
import Main from "./components/Main";
import Footer from "./components/Footer";
import { CategoryProvider } from "./Context/CategoryContext";


function App() {
  return (
    <CategoryProvider>
      
        <div className="Custom">  
          <BrowserRouter>     
              <Header />
              <Main />
              <Footer />
          </BrowserRouter>
        </div>
    </CategoryProvider>
  );
}

export default App;


//{/* Renderiza el Header solo si no estás en la página de login o signup */}
//     {location.pathname !== '/login' && location.pathname !== '/signup' && <Header />}