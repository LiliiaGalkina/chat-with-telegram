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

  return (
    <section className={style.authBlock}>
      <h3 className={style.subtitle}>Введите данные для авторизации</h3>
      {error && <div className={style.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={style.authForm}>
        <InputField
          label="API Instance"
          value={instanceId}
          onChange={(v) => setInstanceId(v)}
        />
        <InputField
          label="API Token"
          type="password"
          value={token}
          onChange={(v) => setToken(v)}
        />
        <button type="submit" className={style.authButton}>
          Авторизоваться
        </button>
      </form>
    </section>
  );
};

export default AuthForm;
