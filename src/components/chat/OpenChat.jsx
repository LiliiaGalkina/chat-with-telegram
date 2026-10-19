import { useState } from "react";
import InputField from "../InputField/InputField";
import style from "./chat.module.scss";

const OpenChat = ({ setPhoneNumber }) => {
  const [inputValue, setInputValue] = useState("");

  const validatePhone = (value) => /^[\d]{10,15}$/.test(value);

  const handleCreateChat = (e) => {
    e.preventDefault();
    if (!validatePhone(inputValue)) {
      alert("Вы ввели некорректный номер. Пример ввода номера: 79008008080");
      return;
    }
    setPhoneNumber(inputValue.trim());
    setInputValue("");
  };

  return (
    <div className={style.openChat}>
      <h3 className={style.title}>Укажите номер собеседника</h3>
      <p className={style.text}>
        Введите номер в международном формате (например: 7900...).
      </p>

      <form onSubmit={handleCreateChat}>
        <input
          id="phone"
          type="text"
          placeholder="Номер телефона"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
          autoFocus
          className={style.input}
        />
        <button type="submit" className={style.button}>
          Создать чат
        </button>
      </form>
    </div>
  );
};
export default OpenChat;
