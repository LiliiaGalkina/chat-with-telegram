import { useState } from "react";
import { checkInstanceState } from "../../utils/api";
import InputField from "../InputField/InputField";
import style from "./authform.module.scss";

const AuthForm = ({ onLogin }) => {
  const [instanceId, setInstanceId] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await checkInstanceState(instanceId, token);

    if (result.success) {
      onLogin({ instanceId, token });
    } else {
      setError(result.error);
    }
  };

  const handleChangeId = (e) => {
    setInstanceId(e.target.value);
  }

  const handleChangeToken = (e) => {
    setToken(e.target.value);
  }

  return (
    <section className={style.authBlock}>
      <h3 className={style.subtitle}>Введите данные для авторизации</h3>
      {error && <div className={style.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={style.authForm}>
        <label className={style.inputBlock}>
          <span className={style.label}>InstanceId</span>
          <InputField
            type="text"
            value={instanceId}
            onChange={handleChangeId}
            placeholder="Введите свой instance ID"
          />
        </label>
        <label className={style.inputBlock}>
          <span className={style.label}>Token</span>
          <InputField
            type="password"
            value={token}
            onChange={handleChangeToken}
            placeholder="Введите свой token"
          />
        </label>
        <button type="submit" className={style.authButton}>
          Авторизоваться
        </button>
      </form>
    </section>
  );
};

export default AuthForm;
