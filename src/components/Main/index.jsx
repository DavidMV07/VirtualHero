import Chatbot from "../ChatOnline";
import Contact from "../Contact";
import ProductCRUD from "../Crud/Index";
import ProductList from "../Accesorios/Productos";
import Home from "../Home";

function Main() {
  return (
      <main className="Main">
        <div className="container">
          <Home />
          <Contact />
          <ProductCRUD />
          <ProductList /> 
          <Chatbot />
        </div>
      </main>
  );
}

export default Main;
