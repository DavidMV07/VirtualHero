import "./Reset.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./components/Main";
import { CategoryProvider } from "./Context/CategoryContext";


function App() {
  return (
    <div className="Custom">
      <CategoryProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </CategoryProvider>
    </div>
  );
}

export default App;
