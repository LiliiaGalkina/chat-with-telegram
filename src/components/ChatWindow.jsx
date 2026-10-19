import { useState } from "react";
import AuthForm from "./auth/AuthForm";
import MessageList from "./chat/MessageList";
import SendMessageForm from "./chat/SendMessageForm";
import OpenChat from "./chat/OpenChat";
import style from "./chatwindow.module.scss";
import { sendWhatsappMessage } from "../utils/api";

const ChatWindow = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [credentials, setCredentials] = useState(null);

  // 3. Обработчик успеха
  const handleAuthSuccess = (creds) => {
    // Сохраняем данные для отправки сообщений
    setCredentials(creds);
    // Включаем флаг
    setIsAuthenticated(true);
  };

  const handleSendMessage = async (text) => {
    if (!text.trim() || !phoneNumber || !credentials) return;

    setIsSending(true);
    try {
      await sendWhatsappMessage(
        credentials.instanceId,
        credentials.token,
        phoneNumber,
        text,
      );
      const newMessage = { sender: "me", text, timestamp: Date.now() };
      setMessages((prev) => [...prev, newMessage]);
      setInputValue("");
    } catch (err) {
      console.error("Ошибка отправки:", err);
      alert(err.message || "Не удалось отправить сообщение.");
    } finally {
      setIsSending(false);
    }
  };


  return (
    <div className={style.chatApp}>
      <header className={style.header}>
        <h1 className={style.mainTitle}>Чат с WhatsApp</h1>
        <h2 className={style.title}>
          {!isAuthenticated && "🔑 Авторизация"}
          {isAuthenticated && !phoneNumber && "📱 Создаем Чат"}
          {isAuthenticated && phoneNumber && ""}
        </h2>
      </header>

      {/* БЛОК 1: Авторизация */}
      {!isAuthenticated && <AuthForm onLogin={handleAuthSuccess} />}

      {/* БЛОК 2: Ввод номера */}
      {isAuthenticated && !phoneNumber && (
        <OpenChat
          setPhoneNumber={(num) => {
            setPhoneNumber(num);
          }}
        />
      )}

      {/* БЛОК 3: Чат */}
      {isAuthenticated && phoneNumber && (
        <>
          <SendMessageForm
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSubmit={handleSendMessage}
            disabled={isSending}
          />
          <MessageList messages={messages} />
        </>
      )}
    </div>
  );
};

export default ChatWindow;
