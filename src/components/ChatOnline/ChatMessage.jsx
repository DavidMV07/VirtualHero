// Importa el componente del ícono del chatbot
import Chatboticon from "./ChatbotIcon";

// Componente funcional ChatMessage
// Recibe una prop 'chat', que contiene los datos del mensaje individual
const ChatMessage = ({ chat }) => {
  return (
    // Verifica si la propiedad 'hideInChat' es falsa.
    // Si es verdadera, no se renderiza el mensaje.
    !chat.hideInChat && (

      // Contenedor del mensaje con clases condicionales:
      // - 'bot-message' si el rol es 'model' (respuesta del bot)
      // - 'user-message' si el rol es 'user' (mensaje del usuario)
      // - 'error' si el mensaje tiene una bandera de error
      <div
        className={`message ${chat.role === "model" ? 'bot' : 'user'}-message ${chat.isError ? 'error' : ''}`}
      >
        {/* Si el mensaje es del bot, se muestra el ícono del chatbot */}
        {chat.role === "model" && <Chatboticon />}

        {/* Texto del mensaje renderizado dentro de un párrafo */}
        <p className="message-text">
          {chat.text}
        </p>
      </div>
    )
  );
};

// Exporta el componente para poder utilizarlo en otros archivos
export default ChatMessage;
