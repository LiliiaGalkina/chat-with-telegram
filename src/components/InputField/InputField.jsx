import style from "./inputfield.module.scss";

const InputField = ({label, type = 'text', value, onChange}) => {
    return (
      <label className={style.inputBlock}>
        {label && <span className={style.label}>{label}</span>}
        <input
          id={`${type}-${label?.toLowerCase()}`}
          type={type}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={style.input}
        />
      </label>
    );
}
 
export default InputField;

