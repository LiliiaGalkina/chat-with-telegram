import style from "./inputfield.module.scss";

const InputField = ({label, type = 'text', value, onChange, placeholder}) => {
    return (
      <label className={style.inputBlock}>
        {label && <span className={style.label}>{label}</span>}
        <input
          type={type}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
				className={style.input}
				placeholder={placeholder}
        />
      </label>
    );
}
 
export default InputField;

