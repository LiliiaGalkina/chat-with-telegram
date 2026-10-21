import style from "./chat.module.scss";

const MessageItem = ({ msg }) => {
  const isMine = msg.sender === "me";

  return (
    <div className={`${style.message} ${isMine ? style.myMsg : style.peerMsg}`}>
      <span>{msg.text}</span>
      {/* Тут можно добавить аватар или имя */}
    </div>
  );
};

export default MessageItem;