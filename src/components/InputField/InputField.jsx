import style from "./inputfield.module.scss";

const InputField = ({type, value, onChange, placeholder}) => {
    return (
      <input
        type={type}
        autoComplete="off"
        value={value}
        onChange={onChange}
        className={style.input}
        placeholder={placeholder}
      />
    );
}
 
export default InputField;