import InputField from "../InputField/InputField";
import {useState } from "react";
import style from "./authform.module.scss";

const AuthForm = ({ onSubmit }) => {
  const [instanceId, setInstanceId] = useState("");
  const [token, setToken] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!instanceId || !token) return;
    await onSubmit(instanceId, token);
  };

  return (
    <section className={style.authBlock}>
      <h3 className={style.subtitle}>Введите данные для авторизации</h3>
      <form onSubmit={handleSubmit} className={style.authForm}>
        <InputField
          label="API Instance"
          onChange={(v) => setInstanceId(v)}
          placeholder="Введите ваш Instance ID"
        />
        <InputField
          label="API Token"
          type="password"
          autoComplete="off"
          onChange={(v) => setToken(v)}
          placeholder="Введите ваш Token"
        />
        <button type="submit" className={style.authButton}>
          Авторизоваться
        </button>
      </form>
    </section>
  );
};

export default AuthForm;
