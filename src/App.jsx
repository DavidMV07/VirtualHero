import "./Reset.css";
import "./App.css";
import { BrowserRouter } from 'react-router-dom';
import Header from "./components/Header"; 
import Main from "./components/Main";
import Footer from "./components/Footer";
import { CategoryProvider } from "./Context/CategoryContext";


function App() {
  return (
    <div className="Custom">  
      <CategoryProvider> 
        <BrowserRouter>     
          <Header />
          <Main />
          <Footer />
        </BrowserRouter>
      </CategoryProvider>
    </div>
  );
}

export default App;