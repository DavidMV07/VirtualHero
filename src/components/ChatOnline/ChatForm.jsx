// Importa el hook useRef de React para manejar referencias a elementos del DOM
import { useRef } from 'react';

// Componente funcional ChatForm que recibe tres props:
// - chatHistory: historial actual del chat
// - setChatHistory: función para actualizar el historial
// - generateBotResponse: función que genera una respuesta del bot
const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {

    // Crea una referencia para acceder directamente al input de texto
    const inputRef = useRef();

    // Función que se ejecuta al enviar el formulario
    const handleFormSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)

        // Obtiene el valor ingresado por el usuario y elimina espacios extra
        const userMessage = inputRef.current.value.trim();

        // Si el campo está vacío, no hace nada
        if (!userMessage) return;

        // Limpia el campo de entrada después de capturar el mensaje
        inputRef.current.value = '';

        // Agrega el mensaje del usuario al historial del chat
        setChatHistory(history => [
            ...history,
            { role: 'user', text: userMessage }
        ]);

        // Espera 600 milisegundos antes de continuar con la respuesta del bot
        setTimeout(() => {
            // Muestra un mensaje temporal de "Thinking..." mientras se genera la respuesta
            setChatHistory((history) => [
                ...history,
                { role: 'model', text: "Thinking..." }
            ]);

            // Llama a la función de generación de respuesta del bot,
            // incluyendo el nuevo mensaje del usuario como parte del historial
            generateBotResponse([
                ...chatHistory,
                {
                    role: 'user',
                    text: `Por favor, responda a esta consulta utilizando los detalles proporcionados anteriormente. ${userMessage}`
                }
            ]);
        }, 600);
    };

    // Renderiza el formulario de entrada del chat
    return (
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            {/* Campo de entrada de texto, vinculado por referencia */}
            <input
                ref={inputRef}
                type="text"
                placeholder="Message..."
                className="message-input"
                required
            />
            {/* Botón de envío del mensaje */}
            <button className="material-symbols-outlined">arrow_upward</button>
        </form>
    );
};

// Exporta el componente para su uso en otros archivos
export default ChatForm;
