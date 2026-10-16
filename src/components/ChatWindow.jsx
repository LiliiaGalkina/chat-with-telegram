import { useState } from "react";
import AuthForm from "./auth/AuthForm";
import MessageList from "./chat/MessageList";
import SendMessageForm from "./chat/SendMessageForm";
import style from "./chatwindow.module.scss";

const ChatWindow = () => {
    const [apiInstance, setApiInstance] = useState("");
    const [apiToken, setApiToken] = useState("");
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    return (
      <div className={style.chatApp}>
        <header className={style.header}>
          <h2 className={style.title}>Чат с telegram</h2>
          <a href="https://green-api.com/max" target="_blank" rel="noreferrer" className={style.apiLink}>
            Документация API
          </a>
        </header>
        <AuthForm
          apiInstance={apiInstance}
          onChangeApiInstance={setApiInstance}
          apiToken={apiToken}
          onChangeApiToken={setApiToken}
        />
        <section className={style.chat}>
          <MessageList messages={messages} />
          <SendMessageForm
            inputValue={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSubmit={(text) => handleSendMessage(text)}
          />
        </section>
      </div>
    );
}
 
export default ChatWindow;