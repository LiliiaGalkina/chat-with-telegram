import InputField from "../InputField/InputField";
import style from "./authform.module.scss";

const AuthForm = ({
  apiInstance,
  onChangeApiInstance,
  apiToken,
  onChangeApiToken,
}) => {
  return (
    <section className={style.authBlock}>
      <h3 className={style.subtitle}>Авторизация</h3>
      <form action="#" className={style.authForm}>
        <InputField
          label="API Instance"
          value={apiInstance}
          onChange={onChangeApiInstance}
        />
        <InputField
          label="API Token"
          type="password"
          autoComplete="off"
          value={apiToken}
          onChange={onChangeApiToken}
        />
        <button type="submit" className={style.authButton}>Авторизоваться</button>
      </form>
    </section>
  );
};

export default AuthForm;
