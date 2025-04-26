import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import Chatboticon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { companyInfo } from "./infocompany";


const Chatbot= () => {
  const [chatHistory, setChatHistory] = useState([{
    hideInChat: true,
    role: 'model',
    text: companyInfo
  }]);
  const [showChatbot, setShowChatbot] = useState([false]);

  const chatBodyRef = useRef();
  
  const generateBotResponse = async (history) =>{

    const updateHistory = (text, isError = false ) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role: 'model', text, isError}]);
    };

    history = history.map(({role,text}) => ({role, parts: [{text}]}));

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({contents: history}),
    }

    try{
      //Realiza la llamada a la api para generar la respuesta del bot
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if(!response.ok)throw new Error(data.error.message || "Algo salió mal!");

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    }catch(error){
      updateHistory(error.message, true);
    }
  };

  useEffect(() =>{
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: "smooth"});
  }, [chatHistory]);

  return <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
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