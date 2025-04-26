import Chatbot from "../ChatOnline";
import ProductCRUD from "../Crud/Index";
import Home from "../Home";

function Main() {
  return (
      <main className="Main">
        <div className="container">
          <Home />
          <Chatbot />
        </div>
      </main>
  );
}

export default Main;
