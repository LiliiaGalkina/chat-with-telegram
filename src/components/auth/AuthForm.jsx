import InputField from "../InputField/InputField";
import style from "./authform.module.scss";

const AuthForm = ({}) => {
    return (
      <form action="" className={StyleSheet.authForm}>
        <InputField
          label="Instance ID"
          value={apiInstance}
          onChange={setApiInstance}
        />
        <InputField
          label="Secret Key"
          type="password"
          value={apiToken}
          onChange={setApiToken}
        />
      </form>
    );
}
 
export default AuthForm;