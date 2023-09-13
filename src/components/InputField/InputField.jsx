import './InputField.sass';

const InputField = ({ name, type, placeholder, value, onChange, isControlledInput, errorStyle }) => {
  return (
    <input
      type={type}
      name={name}
      required='required'
      placeholder={placeholder}
      onFocus={(e) => e.target.placeholder = ''}
      onBlur={(e) => e.target.placeholder = placeholder}
      onChange={onChange}
      {...(isControlledInput ? { value } : { defaultValue: value })}
      className={errorStyle}
      data-testid={name}
    />
  );
};

export default InputField;