// Importaciones necesarias desde React y otros archivos locales
import React, { useEffect, useRef, useState } from "react";
import "./chat.css"; // Estilos del chatbot
import Chatboticon from "./ChatbotIcon"; // Ícono del bot
import ChatForm from "./ChatForm"; // Componente del formulario de entrada de mensajes
import ChatMessage from "./ChatMessage"; // Componente para renderizar cada mensaje del chat
import { companyInfo } from "./infocompany"; // Información inicial de la empresa para el chatbot



const Chatbot= () => {
  // Estado para manejar el historial del chat. Inicia con un mensaje oculto (no visible en el chat)
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: 'model',
      text: companyInfo // Mensaje inicial proveniente de la empresa
    }
  ]);

  // Estado para mostrar u ocultar el popup del chatbot
  const [showChatbot, setShowChatbot] = useState(false);

  // Referencia al contenedor del cuerpo del chat para hacer scroll automático
  const chatBodyRef = useRef();
  
  // Función interna para actualizar el historial, eliminando "Thinking..." y mostrando respuesta o error
  const updateHistory = (text, isError = false) => {
    setChatHistory(prev => [
      ...prev.filter(msg => msg.text !== "Thinking..."),
      { role: 'model', text, isError }
    ]);
  };

  // Función asíncrona para generar la respuesta del bot
  const generateBotResponse = async (history) => {
    // Prepara el historial en el formato requerido por la API (role, parts con texto)
    history = history.map(({ role, text }) => ({
      role,
      parts: [{ text }]
    }));

    // Opciones para la solicitud POST a la API
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: history }),
    };

    try {
      // Realiza la solicitud a la API definida en las variables de entorno
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();

      // Manejo de errores
      if (!response.ok)
        throw new Error(data.error.message || "Algo salió mal!");

      // Limpia formato Markdown y actualiza la respuesta en el historial
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(apiResponseText);

    } catch (error) {
      // En caso de error, muestra el mensaje en el historial como error
      updateHistory(error.message, true);
    }
  };

  // Hace scroll automático al final cada vez que cambia el historial del chat
  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [chatHistory]);

  return <div className={`container__Chatbot ${showChatbot ? "show-chatbot" : ""}`}>
    <button onClick={() => setShowChatbot(prev => !prev)} id="chatbot-toggler">
      <span className="material-symbols-outlined">mode_comment</span>
      <span className="material-symbols-outlined">close</span>
    </button>

    <div className="chatbot-popup">

      {/* Chatbot Header */}
      <div className="chat-header">
        <div className="header-info">
          <Chatboticon />
          <h2 className="logo-text">Chatbot</h2>
        </div>
        <button onClick={() => setShowChatbot(prev => !prev) } className="material-symbols-outlined">Keyboard_arrow_down</button>
      </div>

      {/* Chatbot Body */}
      <div ref={chatBodyRef} className="chat-body">
        <div className="message bot-message">
          <Chatboticon />
          <p className="message-text">
            Hola 👋 <br/>¿En qué puedo ayudarle hoy?
          </p>
        </div>

        {chatHistory.map((chat, index) => (
          <ChatMessage key={index} chat={chat} />
        ))}
      </div>

      {/* Chatbot Footer */}
      <div className="chat-footer">
        <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
      </div>
    </div>
  </div>

};

export default Chatbot;