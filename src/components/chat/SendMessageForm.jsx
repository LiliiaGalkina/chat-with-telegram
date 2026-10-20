import InputField from "./../InputField/InputField";
import style from "./chat.module.scss";

const SendMessageForm = ({ value, onChange, onSubmit, disabled }) => {
  return (
    <form onSubmit={onSubmit} className={style.messageForm}>
      <label className={style.label}>
        <span>Введите сообщение:</span>
        <InputField
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </label>
      <button type="submit" className={style.button}>
        Отправить
      </button>
    </form>
  );
};

export default SendMessageForm;
