import './Button.sass';

const Button = ({ buttonType, buttonClass, buttonText, buttonDisabled, onClick, testId }) => {
  return (
    <button
      type={buttonType}
      className={buttonClass}
      disabled={buttonDisabled}
      onClick={onClick}
      data-testid={testId}
    >
      {buttonText}
    </button>
  );
};

export default Button;