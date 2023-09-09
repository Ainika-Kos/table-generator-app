import './InputField.sass';

const InputField = ({ name, placeholder, value, onChange}) => {
    return (
        <input
            type='text'
            name={name}
            required='required'
            placeholder={placeholder}
            onFocus={(e) => e.target.placeholder = ''}
            onBlur={(e) => e.target.placeholder = placeholder}
            onChange={onChange}
            value={value}
        />
    );
};

export default InputField;