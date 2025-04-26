import { useRef } from 'react';

const ChatForm = ({chatHistory, setChatHistory, generateBotResponse}) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = '';

        // Actualizar el historial del chat con el mensaje del usuario
        setChatHistory(history =>[...history, {role: 'user', text: userMessage}]);   

        // Retrasa 600 ms antes de mostrar "Pensando..." y generar la respuesta
        setTimeout(() =>{
            
            // Añadir un marcador de posición "Pensando..." para la respuesta del bot
            setChatHistory((history) => [...history, {role: 'model', text: "Thinking..."}]);  

        // Llamar a la función para generar la respuesta del bot
        generateBotResponse([...chatHistory, {role: 'user', text: `Por favor, responda a esta consulta utilizando los detalles proporcionados anteriormente. ${userMessage}`}]);
        }, 600);
    };

    return (
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" placeholder="Message... " className="message-input" required/>
            <button className="material-symbols-outlined">arrow_upward</button>
        </form>
    );
};

export default ChatForm;