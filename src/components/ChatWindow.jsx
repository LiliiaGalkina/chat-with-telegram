import { useState } from "react";
import AuthForm from "./auth/AuthForm";
import MessageList from "./chat/MessageList";
import SendMessageForm from "./chat/SendMessageForm";
import style from "./chatwindow.module.scss";
import { checkApiCredentials } from "../utils/api";
import OpenChat from "./chat/OpenChat";

const ChatWindow = () => {
  const [userCredentials, setUserCredentials] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);

  //Обработчик формы авторизации
  const handleAuthSubmit = async (newInstance, newToken) => {
    try {
      await checkApiCredentials(newInstance, newToken);
      localStorage.setItem(
        "userCredentials",
        JSON.stringify({ instanceId: newInstance, token: newToken }),
      );
      // Сохраняем ключи в локальное состояние компонента
      setUserCredentials({
        instanceId: newInstance,
        token: newToken,
      });
    } catch (error) {
      alert(error.message || "Неверные API-ключи");
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    try {
      const creds = userCredentials;
      await sendMessage(creds.instanceId, creds.token, phoneNumber, text);

      setMessages((prev) => [
        ...prev,
        { sender: "me", text, timestamp: Date.now() },
      ]);
      setInputValue("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Ошибка при отправке");
    }
  };

  return (
    <div className={style.chatApp}>
      <header className={style.header}>
        <h2 className={style.title}>
          {userCredentials ? "📱 Чат" : "🔑 Авторизация"}
        </h2>
        <a
          href="https://green-api.com/max"
          target="_blank"
          rel="noreferrer"
          className={style.apiLink}
        >
          Документация API
        </a>
      </header>
      {!userCredentials && <AuthForm onSubmit={handleAuthSubmit} />}
      {userCredentials && !phoneNumber && (
        <OpenChat
          setPhoneNumber={setPhoneNumber}
          onCancel={() => setUserCredentials(null)}
        />
      )}
      {userCredentials && phoneNumber && (
        <>
          <SendMessageForm
            inputValue={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSubmit={(text) => handleSendMessage(text)}
          />
          <MessageList messages={messages} />
        </>
      )}
    </div>
  );
};

export default ChatWindow;
