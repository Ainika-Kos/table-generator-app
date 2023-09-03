import './Button.sass';

const Button = ({ buttonType, buttonClass, buttonText, buttonDisabled }) => {
  return (
    <button
      type={buttonType}
      className={buttonClass}
      disabled={buttonDisabled}
    >
      {buttonText}
    </button>
  );
};

export default Button;