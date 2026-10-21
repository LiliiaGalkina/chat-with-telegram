import MessageItem from "./MessageItem";
import style from "./chat.module.scss";

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <MessageItem key={index} msg={msg} />
      ))}
    </div>
  );
};

export default MessageList;