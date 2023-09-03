import './Button.sass';

const Button = ({ buttonType, buttonClass, buttonText, buttonDisabled, onClick }) => {
  return (
    <button
      type={buttonType}
      className={buttonClass}
      disabled={buttonDisabled}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;